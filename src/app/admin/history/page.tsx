"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Loader2, Trash2 } from "lucide-react";
import { getHistoryMilestones, deleteHistoryMilestone } from "@/actions/history";
import { toast } from "sonner";

export default function AdminHistoryPage() {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, []);

    async function loadHistory() {
        const data = await getHistoryMilestones();
        setHistory(data);
        setLoading(false);
    }

    async function handleDelete(id: number) {
        if (confirm("Delete this milestone?")) {
            const result = await deleteHistoryMilestone(id);
            if (result.success) {
                toast.success("Deleted");
                loadHistory();
            }
        }
    }

    if (loading) return <div className="p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">History Management</h1>
                <Button asChild><Link href="/admin/history/new"><Plus className="mr-2 h-4 w-4" />Add Milestone</Link></Button>
            </div>
            <div className="grid gap-4">
                {history.map(item => (
                    <Card key={item.id} className="flex justify-between items-center p-4">
                        <div>
                            <h3 className="font-bold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.year} - {item.date}</p>
                        </div>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}
