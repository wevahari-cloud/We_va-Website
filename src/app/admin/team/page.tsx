"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TeamAdminPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Determine order, maybe by createdAt or a 'order' field if we had one
        const q = query(collection(db, "team"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setItems(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this member?")) return;
        try {
            await deleteDoc(doc(db, "team", id));
            toast.success("Deleted successfully");
        } catch (error) {
            toast.error("Error deleting item");
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Team Management</h1>
                <Button asChild>
                    <Link href="/admin/team/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Member
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-white dark:bg-slate-900">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Avatar</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                    No team members found. Add your board!
                                </TableCell>
                            </TableRow>
                        ) : (
                            items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={item.imageUrl} />
                                            <AvatarFallback>{item.name?.[0]}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.role}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                                            <Trash className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
