"use client";

import { useState, useEffect } from "react";
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
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    title: z.string().min(2, "Title is required"),
    date: z.string().min(1, "Date is required"),
    time: z.string().optional(),
    venue: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    description: z.string().optional(),
    posterUrl: z.string().min(1, "Poster image is required"),
});

export default function EditEventPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        async function fetchEvent() {
            try {
                const docRef = doc(db, "events", params.id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    form.reset({
                        title: data.title,
                        date: data.date,
                        time: data.time || "",
                        venue: data.venue,
                        category: data.category,
                        description: data.description || "",
                        posterUrl: data.posterUrl,
                    });
                } else {
                    toast.error("Event not found");
                    router.push("/admin/events");
                }
            } catch (error) {
                toast.error("Error fetching event");
            } finally {
                setLoading(false);
            }
        }
        fetchEvent();
    }, [params.id, form, router]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const docRef = doc(db, "events", params.id);
            await updateDoc(docRef, values);
            toast.success("Event updated successfully");
            router.push("/admin/events");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Edit Event</h1>
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
                                        <Input disabled={loading} placeholder="Title" {...field} />
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
                                    <Textarea disabled={loading} placeholder="Description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={loading} type="submit" className="w-full">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Update Event
                    </Button>
                </form>
            </Form>
        </div>
    );
}
