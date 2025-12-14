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
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { MultiImageUpload } from "@/components/admin/multi-image-upload";

const formSchema = z.object({
    title: z.string().min(2, "Title is required"),
    date: z.string().min(1, "Date is required"),
    time: z.string().optional(),
    venue: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    description: z.string().optional(),
    posterUrl: z.string().min(1, "Poster image is required"),
    images: z.array(z.string()).optional(),
});

interface EditEventFormProps {
    initialData: any;
    eventId: number;
}

export function EditEventForm({ initialData, eventId }: EditEventFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Prepare initial images logic
    const savedImages = (initialData.images as string[]) || [];
    const posterUrl = initialData.posterUrl || "";
    // Merge poster and images for the UI
    const allImages = posterUrl ? [posterUrl, ...savedImages.filter(img => img !== posterUrl)] : savedImages;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData.title,
            date: initialData.date,
            time: initialData.time || "",
            venue: initialData.venue || "",
            category: initialData.category || "",
            description: initialData.description || "",
            posterUrl: posterUrl,
            images: allImages,
        },
    });

    // Debug: Check what data is arriving
    console.log("EditEventForm rendered with initialData:", initialData);

    useEffect(() => {
        if (initialData) {
            const currentSavedImages = (initialData.images as string[]) || [];
            const currentPosterUrl = initialData.posterUrl || "";
            const currentAllImages = currentPosterUrl ? [currentPosterUrl, ...currentSavedImages.filter(img => img !== currentPosterUrl)] : currentSavedImages;

            console.log("Resetting form with:", initialData.title);
            form.reset({
                title: initialData.title,
                date: initialData.date,
                time: initialData.time || "",
                venue: initialData.venue || "",
                category: initialData.category || "",
                description: initialData.description || "",
                posterUrl: currentPosterUrl,
                images: currentAllImages,
            });
        }
    }, [initialData, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const { updateEvent } = await import("@/actions/events");

            // Filter posterUrl out of images to avoid duplication in DB/Gallery
            const submissionData = {
                ...values,
                images: values.images?.filter(url => url !== values.posterUrl)
            };

            const result = await updateEvent(eventId, submissionData);

            if (result.success) {
                toast.success("Event updated successfully");
                router.push("/admin/events");
                router.refresh();
            } else {
                throw new Error("Update failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Edit Event</h1>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Event Images (Max 6)</FormLabel>
                                <div className="text-sm text-muted-foreground mb-4">
                                    Upload images and click the Star icon to set the Main Poster.
                                </div>
                                <FormControl>
                                    <MultiImageUpload
                                        value={field.value || []}
                                        disabled={loading}
                                        onChange={(urls) => {
                                            field.onChange(urls);
                                            const currentPoster = form.getValues("posterUrl");
                                            if (urls.length > 0 && (!currentPoster || !urls.includes(currentPoster))) {
                                                form.setValue("posterUrl", urls[0]);
                                            }
                                            if (urls.length === 0) {
                                                form.setValue("posterUrl", "");
                                            }
                                        }}
                                        onRemove={(url) => {
                                            const newUrls = field.value?.filter((val) => val !== url) || [];
                                            field.onChange(newUrls);
                                            const currentPoster = form.getValues("posterUrl");
                                            if (currentPoster === url) {
                                                form.setValue("posterUrl", newUrls.length > 0 ? newUrls[0] : "");
                                            }
                                        }}
                                        mainImage={form.watch("posterUrl")}
                                        onSetMain={(url) => form.setValue("posterUrl", url)}
                                        maxFiles={6}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="posterUrl"
                        render={() => (
                            <FormItem className="hidden">
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
