"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Loader2, Trash2, Calendar as CalendarIcon, X } from "lucide-react";
import { getEvents, deleteEvent } from "@/actions/events";
import { toast } from "sonner";
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
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

export default function AdminEventsPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

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

    const filteredEvents = events.filter(event => {
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

    if (loading) return <div className="p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl font-bold">Events Management</h1>
                <Button asChild><Link href="/admin/events/new"><Plus className="mr-2 h-4 w-4" />Add Event</Link></Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-end md:items-center bg-muted/30 p-4 rounded-lg">
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
                            <Calendar
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
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>

            <div className="grid gap-3">
                {filteredEvents.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No events found matching your filters.</div>
                ) : filteredEvents.map(event => (
                    <Card key={event.id} className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                            {/* Title (Left) */}
                            <div className="md:col-span-4">
                                <h3 className="font-semibold text-lg leading-tight truncate" title={event.title}>
                                    {event.title}
                                </h3>
                            </div>

                            {/* Category (Center) */}
                            <div className="md:col-span-3">
                                <Badge variant="secondary" className="whitespace-nowrap">
                                    {event.category}
                                </Badge>
                            </div>

                            {/* Date (Center-Right) */}
                            <div className="md:col-span-3 text-muted-foreground text-sm flex items-center">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {event.date}
                            </div>

                            {/* Actions (Right) */}
                            <div className="md:col-span-2 flex items-center justify-end gap-2">
                                <Link href={`/admin/events/${event.id}`}>
                                    <Button variant="outline" size="sm" className="h-8">
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleDelete(event.id)}
                                    title="Delete Event"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
