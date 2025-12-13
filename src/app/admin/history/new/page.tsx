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
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Loader2, Instagram } from "lucide-react";

const formSchema = z.object({
    year: z.string().min(4, "Year is required (e.g. 2023)"),
    title: z.string().min(2, "Title is required"),
    date: z.string().min(1, "Date is required"),
    description: z.string().optional(),
    instagramUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export default function NewHistoryPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            year: "",
            title: "",
            date: "",
            description: "",
            instagramUrl: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            // Timeout promise
            const timeout = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Request timed out")), 15000)
            );

            await Promise.race([
                addDoc(collection(db, "history"), {
                    ...values,
                    createdAt: new Date(),
                }),
                timeout
            ]);

            toast.success("Milestone created successfully");
            router.push("/admin/history");
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
                <h1 className="text-3xl font-bold">Add History Milestone</h1>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name="instagramUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Instagram Post Link</FormLabel>
                                <div className="text-xs text-muted-foreground mb-2">Paste the full URL of the post (e.g. https://www.instagram.com/p/CoXt...)</div>
                                <FormControl>
                                    <div className="relative">
                                        <Instagram className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input className="pl-10" disabled={loading} placeholder="https://instagram.com/p/..." {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="year"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Year</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="2023" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Specific Date</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="e.g. Mega Medical Camp" {...field} />
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
                                    <Textarea disabled={loading} placeholder="Additional details..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={loading} type="submit" className="w-full">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Add to Timeline
                    </Button>
                </form>
            </Form>
        </div>
    );
}
