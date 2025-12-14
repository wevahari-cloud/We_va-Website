"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, MoreVertical } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/image-upload";
import { addLeader, deleteLeader, updateLeader } from "@/actions/leaders";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function CurrentBoardTab({ initialLeaders }: { initialLeaders: any[] }) {
    const [leaders, setLeaders] = useState(initialLeaders);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingLeader, setEditingLeader] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Form states
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [email, setEmail] = useState("");

    const handleOpenDialog = (leader?: any) => {
        if (leader) {
            setEditingLeader(leader);
            setName(leader.name);
            setRole(leader.role);
            setImageUrl(leader.imageUrl || "");
            setLinkedinUrl(leader.linkedinUrl || "");
            setEmail(leader.email || "");
        } else {
            setEditingLeader(null);
            setName("");
            setRole("");
            setImageUrl("");
            setLinkedinUrl("");
            setEmail("");
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = { name, role, imageUrl, linkedinUrl, email };

            if (editingLeader) {
                const res = await updateLeader(editingLeader.id, data);
                if (res.success) {
                    toast.success("Leader updated successfully");
                    setIsDialogOpen(false);
                    // Optimistic update or refresh handled by Next.js revalidatePath usually, 
                    // but we might want to update local state if we don't reload.
                    // For now, let's assume revalidate works or trigger a router refresh if needed.
                    // But standard way: just close, page will refresh via action usually.
                } else {
                    toast.error("Failed to update leader");
                }
            } else {
                const res = await addLeader(data);
                if (res.success) {
                    toast.success("Leader added successfully");
                    setIsDialogOpen(false);
                } else {
                    toast.error("Failed to add leader");
                }
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this leader?")) return;

        try {
            const res = await deleteLeader(id);
            if (res.success) {
                toast.success("Leader deleted");
            } else {
                toast.error("Failed to delete leader");
            }
        } catch (error) {
            toast.error("Error deleting leader");
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button onClick={() => handleOpenDialog()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Board Member
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {initialLeaders.map((leader) => (
                    <div
                        key={leader.id}
                        className="flex items-start space-x-4 rounded-lg border p-4 bg-card text-card-foreground shadow-sm"
                    >
                        <div className="h-16 w-16 relative rounded-full overflow-hidden bg-muted shrink-0">
                            {leader.imageUrl ? (
                                <img src={leader.imageUrl} alt={leader.name} className="h-full w-full object-cover" />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">No img</div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg truncate">{leader.name}</h3>
                            <p className="text-sm text-muted-foreground truncate">{leader.role}</p>
                            {leader.email && <p className="text-xs text-muted-foreground mt-1 truncate">{leader.email}</p>}
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="-mt-2 -mr-2">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleOpenDialog(leader)}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDelete(leader.id)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ))}

                {initialLeaders.length === 0 && (
                    <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                        <p>No board members added yet.</p>
                    </div>
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingLeader ? "Edit Board Member" : "Add Board Member"}</DialogTitle>
                        <DialogDescription>
                            Add details for the current board official.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="flex justify-center mb-6">
                            <div className="w-32">
                                <ImageUpload
                                    value={imageUrl}
                                    onChange={setImageUrl}
                                    onRemove={() => setImageUrl("")}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="role">Role</Label>
                                <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. President" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="linkedin">LinkedIn URL (Optional)</Label>
                                <Input id="linkedin" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="https://linkedin.com/in/..." />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email (Optional)</Label>
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {editingLeader ? "Save Changes" : "Add Member"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
