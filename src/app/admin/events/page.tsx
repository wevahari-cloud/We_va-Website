"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Loader2, Trash2 } from "lucide-react";
import { getEvents, deleteEvent } from "@/actions/events";
import { toast } from "sonner";

export default function AdminEventsPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEvents();
    }, []);

    async function loadEvents() {
        const data = await getEvents();
        setEvents(data);
        setLoading(false);
    }

    async function handleDelete(id: number) {
        if (confirm("Delete this event?")) {
            const result = await deleteEvent(id);
            if (result.success) {
                toast.success("Deleted");
                loadEvents();
            }
        }
    }

    if (loading) return <div className="p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Events Management</h1>
                <Button asChild><Link href="/admin/events/new"><Plus className="mr-2 h-4 w-4" />Add Event</Link></Button>
            </div>
            <div className="grid gap-4">
                {events.map(event => (
                    <Card key={event.id} className="flex justify-between items-center p-4">
                        <div>
                            <h3 className="font-bold">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">{event.date} - {event.venue}</p>
                        </div>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(event.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}
