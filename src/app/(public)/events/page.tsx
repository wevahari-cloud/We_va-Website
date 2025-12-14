import { getEvents } from "@/actions/events";
import { PublicEventsList } from "@/components/events/public-events-list";

export default async function EventsPage() {
    const allEvents = await getEvents();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Events</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Join us in our upcoming initiatives or browse through our past projects.
                </p>
            </div>

            <PublicEventsList initialEvents={allEvents} />
        </div>
    );
}
