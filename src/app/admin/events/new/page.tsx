"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/image-upload";
import { addEvent } from "@/actions/events";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    title: z.string().min(2, "Title is required"),
    date: z.string().min(1, "Date is required"), // YYYY-MM-DD
    time: z.string().optional(),
    venue: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    description: z.string().optional(),
    posterUrl: z.string().min(1, "Poster image is required"),
});

export default function NewEventPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            date: "",
            time: "",
            venue: "",
            category: "",
            description: "",
            posterUrl: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            const result = await addEvent(values);
            if (!result.success) {
                throw new Error(result.error || "Failed to add event");
            }

            toast.success("Event created successfully");
            router.push("/admin/events");
            router.refresh();
        } catch (error: any) {
            console.error(error);
            if (error.message === "Request timed out") {
                toast.error("Request timed out. Check connection.");
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Create Event</h1>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="posterUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Event Poster</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                        aspectRatio={3 / 4}
                                        aspectRatioLabel="3:4 Portrait (Event Poster)"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Event Title</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="e.g. Installation Ceremony" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Club Service">Club Service</SelectItem>
                                            <SelectItem value="Community Service">Community Service</SelectItem>
                                            <SelectItem value="Professional Service">Professional Service</SelectItem>
                                            <SelectItem value="International Service">International Service</SelectItem>
                                            <SelectItem value="DPP">DPP</SelectItem>
                                            <SelectItem value="District Events">District Events</SelectItem>
                                            <SelectItem value="District Initiatives">District Initiatives</SelectItem>
                                            <SelectItem value="Meetings">Meetings</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Time (Optional)</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} type="time" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="venue"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Venue (Optional)</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Location" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea disabled={loading} placeholder="Event details..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={loading} type="submit" className="w-full">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Create Event
                    </Button>
                </form>
            </Form>
        </div>
    );
}
