import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data
const UPCOMING_EVENTS = [
    {
        id: 1,
        title: "Diwali Donation Drive",
        date: "Oct 28, 2025",
        location: "Western Valley Orphanage",
        category: "Community",
        image: "https://placehold.co/600x400/FFA500/FFF?text=Donation+Drive",
    },
    {
        id: 2,
        title: "Club Trekking Expedition",
        date: "Nov 05, 2025",
        location: "Nilgiris Hills",
        category: "Club Service",
        image: "https://placehold.co/600x400/228B22/FFF?text=Trek+Camp",
    },
    {
        id: 3,
        title: "Youth Leadership Summit",
        date: "Nov 12, 2025",
        location: "City Convention Center",
        category: "Professional",
        image: "https://placehold.co/600x400/005C99/FFF?text=Leadership+Summit",
    },
];

export function EventsPreviewSection() {
    return (
        <section className="py-20 bg-white dark:bg-background">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">Upcoming Events</h2>
                        <p className="text-muted-foreground">Don't miss out on the action. Mark your calendars!</p>
                    </div>
                    <Button variant="outline" asChild className="hidden md:flex">
                        <Link href="/events">View All Events</Link>
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {UPCOMING_EVENTS.map((event) => (
                        <Card key={event.id} className="overflow-hidden border group">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <Badge className="absolute top-4 right-4 bg-white/90 text-black hover:bg-white">{event.category}</Badge>
                            </div>
                            <CardHeader>
                                <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                                <CardDescription className="flex items-center gap-2 mt-2">
                                    <Calendar className="h-4 w-4" /> {event.date}
                                </CardDescription>
                                <CardDescription className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" /> {event.location}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button className="w-full" asChild>
                                    <Link href={`/events?id=${event.id}`}>Register Now</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Button variant="outline" asChild>
                        <Link href="/events">View All Events</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
