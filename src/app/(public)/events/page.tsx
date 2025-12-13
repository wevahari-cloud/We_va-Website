import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getEvents } from "@/actions/events";

function EventCard({ event, isPast = false }: { event: any, isPast?: boolean }) {
    return (
        <Card className="overflow-hidden group">
            <div className="relative h-48 overflow-hidden">
                <img src={event.posterUrl || "https://placehold.co/600x400/003366/FFF?text=Event"} alt={event.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <Badge className="absolute top-4 right-4 bg-white/90 text-black">{event.category || "General"}</Badge>
            </div>
            <CardHeader>
                <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-2">
                    <Calendar className="h-4 w-4" /> {event.date} {event.time && <span>• {event.time}</span>}
                </CardDescription>
                <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {event.venue || "TBA"}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                {isPast ? (
                    <Button variant="outline" className="w-full" asChild>
                        <Link href={`/gallery?event=${event.id}`}>View Photos</Link>
                    </Button>
                ) : (
                    <Button className="w-full" asChild>
                        <Link href="#">Register Now <ExternalLink className="ml-2 h-4 w-4" /></Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}

export default async function EventsPage() {
    const allEvents = await getEvents();

    // Split into upcoming and past based on date
    const today = new Date().toISOString().split('T')[0];
    const upcomingEvents = allEvents.filter((e: any) => e.date >= today);
    const pastEvents = allEvents.filter((e: any) => e.date < today);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Events</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Join us in our upcoming initiatives or browse through our past projects.
                </p>
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
                <div className="flex justify-center mb-8">
                    <TabsList className="grid w-full max-w-md grid-cols-2">
                        <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                        <TabsTrigger value="past">Past Events</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="upcoming">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {upcomingEvents.map((event: any) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                    {upcomingEvents.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">No upcoming events scheduled. Check back later!</div>
                    )}
                </TabsContent>
                <TabsContent value="past">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pastEvents.map((event: any) => (
                            <EventCard key={event.id} event={event} isPast />
                        ))}
                    </div>
                    {pastEvents.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">No past events to display.</div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
