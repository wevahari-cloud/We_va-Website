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

export function EventsPreviewSection({ events = [] }: { events?: any[] }) {
    const hasEvents = events && events.length > 0;

    return (
        <section className="py-20 bg-white dark:bg-background">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">Upcoming Events</h2>
                        <p className="text-muted-foreground">Don't miss out on the action. Mark your calendars!</p>
                    </div>
                    {hasEvents && (
                        <Button variant="outline" asChild className="hidden md:flex">
                            <Link href="/events?view=upcoming">View All Events</Link>
                        </Button>
                    )}
                </div>

                {hasEvents ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {events.map((event) => (
                            <Card key={event.id} className="overflow-hidden border group h-full flex flex-col">
                                <div className="relative h-32 overflow-hidden shrink-0">
                                    <img
                                        src={event.posterUrl || "https://placehold.co/600x400/003366/FFF?text=Event"}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <Badge className="absolute top-2 right-2 bg-white/90 text-black text-xs hover:bg-white">{event.category || "General"}</Badge>
                                </div>
                                <CardHeader className="p-3">
                                    <CardTitle className="line-clamp-1 text-sm">{event.title}</CardTitle>
                                    <CardDescription className="flex items-center gap-1 mt-1 text-xs">
                                        <Calendar className="h-3 w-3" /> {event.date}
                                    </CardDescription>
                                    <CardDescription className="flex items-center gap-1 text-xs">
                                        <MapPin className="h-3 w-3" /> {event.venue || event.location || "TBA"}
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="p-3 mt-auto">
                                    <Button className="w-full text-xs h-8" asChild>
                                        <Link href={`/gallery?event=${event.id}`}>View Details</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                        <h3 className="text-xl font-semibold mb-2">No Upcoming Events</h3>
                        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                            There are currently no upcoming events scheduled. But don't worry, you can get to know about our impactful past activities by exploring our history.
                        </p>
                        <Button asChild size="lg">
                            <Link href="/events?view=past">View Past Events</Link>
                        </Button>
                    </div>
                )}

                {hasEvents && (
                    <div className="mt-8 text-center md:hidden">
                        <Button variant="outline" asChild>
                            <Link href="/events?view=upcoming">View All Events</Link>
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
