import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const UPCOMING_EVENTS = [
    {
        id: 1,
        title: "Diwali Donation Drive",
        date: "Oct 28, 2025",
        time: "10:00 AM",
        location: "Western Valley Orphanage",
        category: "Community",
        image: "https://placehold.co/600x400/FFA500/FFF?text=Donation+Drive",
    },
    {
        id: 2,
        title: "Club Trekking Expedition",
        date: "Nov 05, 2025",
        time: "06:00 AM",
        location: "Nilgiris Hills",
        category: "Club Service",
        image: "https://placehold.co/600x400/228B22/FFF?text=Trek+Camp",
    },
];

const PAST_EVENTS = [
    {
        id: 101,
        title: "10th Club Installation",
        date: "July 12, 2024",
        location: "City Hall",
        category: "Club Service",
        image: "https://placehold.co/600x400/003366/FFF?text=Installation",
    },
    {
        id: 102,
        title: "Blood Donation Camp",
        date: "Aug 15, 2024",
        location: "Govt Hospital",
        category: "Community",
        image: "https://placehold.co/600x400/800000/FFF?text=Blood+Donation",
    },
];

function EventCard({ event, isPast = false }: { event: any, isPast?: boolean }) {
    return (
        <Card className="overflow-hidden group">
            <div className="relative h-48 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <Badge className="absolute top-4 right-4 bg-white/90 text-black">{event.category}</Badge>
            </div>
            <CardHeader>
                <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-2">
                    <Calendar className="h-4 w-4" /> {event.date} {event.time && <span>• {event.time}</span>}
                </CardDescription>
                <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {event.location}
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

export default function EventsPage() {
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
                        {UPCOMING_EVENTS.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                    {UPCOMING_EVENTS.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">No upcoming events scheduled. Check back later!</div>
                    )}
                </TabsContent>
                <TabsContent value="past">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {PAST_EVENTS.map(event => (
                            <EventCard key={event.id} event={event} isPast />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
