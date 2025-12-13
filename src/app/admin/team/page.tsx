"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Loader2, Trash2 } from "lucide-react";
import { getTeamMembers, deleteTeamMember } from "@/actions/team";
import { toast } from "sonner";

export default function AdminTeamPage() {
    const [team, setTeam] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTeam();
    }, []);

    async function loadTeam() {
        const data = await getTeamMembers();
        setTeam(data);
        setLoading(false);
    }

    async function handleDelete(id: number) {
        if (confirm("Delete this member?")) {
            const result = await deleteTeamMember(id);
            if (result.success) {
                toast.success("Deleted");
                loadTeam();
            }
        }
    }

    if (loading) return <div className="p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Team Management</h1>
                <Button asChild><Link href="/admin/team/new"><Plus className="mr-2 h-4 w-4" />Add Member</Link></Button>
            </div>
            <div className="grid gap-4">
                {team.map(member => (
                    <Card key={member.id} className="flex justify-between items-center p-4">
                        <div>
                            <h3 className="font-bold">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(member.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}
