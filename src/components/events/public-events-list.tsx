"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, X, Calendar as CalendarIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

function EventCard({ event, isPast = false }: { event: any, isPast?: boolean }) {
    const href = isPast ? `/gallery?event=${event.id}` : "#";

    return (
        <Link href={href} className="block h-full">
            <Card className="overflow-hidden group h-full flex flex-col hover:shadow-md transition-shadow">
                <div className="relative h-32 overflow-hidden shrink-0">
                    <img
                        src={event.posterUrl || "https://placehold.co/600x400/003366/FFF?text=Event"}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 right-4 bg-white/90 text-black shadow-sm hover:bg-white/100">
                        {event.category || "General"}
                    </Badge>
                </div>
                <CardHeader className="flex-1 p-2">
                    <CardTitle className="line-clamp-2 leading-tight mb-0.5 text-sm group-hover:text-primary transition-colors">
                        {event.title}
                    </CardTitle>
                    <div className="flex items-center text-muted-foreground text-[10px]">
                        <Calendar className="h-3 w-3 mr-1" />
                        {event.date}
                    </div>
                </CardHeader>
            </Card>
        </Link>
    )
}

interface PublicEventsListProps {
    initialEvents: any[];
}

export function PublicEventsList({ initialEvents }: PublicEventsListProps) {
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    const categories = [
        "Club Service",
        "Community Service",
        "Professional Service",
        "International Service",
        "DPP",
        "District Events",
        "District Initiatives",
        "Participation",
        "Meetings"
    ];

    const filteredEvents = initialEvents.filter(event => {
        // Category Filter
        if (categoryFilter !== "all" && event.category !== categoryFilter) {
            return false;
        }

        // Date Range Filter
        if (dateRange?.from) {
            const eventDate = new Date(event.date);
            const fromDate = dateRange.from;
            const toDate = dateRange.to || dateRange.from;

            // Reset hours for accurate comparison
            eventDate.setHours(0, 0, 0, 0);
            fromDate.setHours(0, 0, 0, 0);
            toDate.setHours(23, 59, 59, 999);

            if (eventDate < fromDate || eventDate > toDate) {
                return false;
            }
        }

        return true;
    });

    // Split into upcoming and past based on date
    const today = new Date().toISOString().split('T')[0];
    const upcomingEvents = filteredEvents.filter((e: any) => e.date >= today);
    const pastEvents = filteredEvents.filter((e: any) => e.date < today);

    return (
        <div className="space-y-8">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-end md:items-center justify-center bg-muted/30 p-4 rounded-lg max-w-4xl mx-auto">
                <div className="w-full md:w-[200px]">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map(cat => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full md:w-auto">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                    "w-full md:w-[240px] justify-start text-left font-normal",
                                    !dateRange && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange?.from ? (
                                    dateRange.to ? (
                                        <>
                                            {format(dateRange.from, "LLL dd, y")} -{" "}
                                            {format(dateRange.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(dateRange.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date range</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                                initialFocus
                                mode="range"
                                defaultMonth={dateRange?.from}
                                selected={dateRange}
                                onSelect={setDateRange}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {(categoryFilter !== "all" || dateRange) && (
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setCategoryFilter("all");
                            setDateRange(undefined);
                        }}
                        className="h-10 px-2 lg:px-3"
                    >
                        Reset Filters
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>

            <Tabs defaultValue="past" className="w-full">
                <div className="flex justify-center mb-8">
                    <TabsList className="grid w-full max-w-md grid-cols-2">
                        <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                        <TabsTrigger value="past">Past Events</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="upcoming" className="animate-in fade-in-50 duration-500">
                    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {upcomingEvents.map((event: any) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                    {upcomingEvents.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-lg">
                            <p className="text-lg">No upcoming events found.</p>
                            <p className="text-sm">Try adjusting your filters.</p>
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="past" className="animate-in fade-in-50 duration-500">
                    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {pastEvents.map((event: any) => (
                            <EventCard key={event.id} event={event} isPast />
                        ))}
                    </div>
                    {pastEvents.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-lg">
                            <p className="text-lg">No past events found.</p>
                            <p className="text-sm">Try adjusting your filters.</p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
