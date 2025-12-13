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
import { ImageUpload } from "@/components/admin/image-upload";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    caption: z.string().optional(),
    imageUrl: z.string().min(1, "Image is required"),
});

export default function NewGalleryPhotoPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            caption: "",
            imageUrl: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            await addDoc(collection(db, "gallery"), {
                ...values,
                createdAt: new Date(),
            });
            toast.success("Photo uploaded successfully");
            router.push("/admin/gallery");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Upload Photo</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Photo</FormLabel>
                                <div className="text-sm text-muted-foreground mb-4">
                                    Upload high quality images from your events.
                                </div>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value || ""}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="caption"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Caption (Optional)</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="e.g. Installation Ceremony 2024" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={loading} type="submit" className="w-full">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Upload
                    </Button>
                </form>
            </Form>
        </div>
    );
}
