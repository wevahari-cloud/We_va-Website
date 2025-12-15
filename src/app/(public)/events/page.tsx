import { Suspense } from "react";
import { getEvents } from "@/actions/events";
import { PublicEventsList } from "@/components/events/public-events-list";

export default async function EventsPage() {
    const allEvents = await getEvents();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Events</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Join us in our upcoming initiatives or browse through our past projects.
                </p>
            </div>

            <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading events...</div>}>
                <PublicEventsList initialEvents={allEvents} />
            </Suspense>
        </div>
    );
}
