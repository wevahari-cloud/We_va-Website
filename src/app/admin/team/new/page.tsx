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
import { ImageUpload } from "@/components/admin/image-upload";
import { addTeamMember } from "@/actions/team";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    role: z.string().min(2, "Role is required"),
    bio: z.string().min(1, "Bio is required"),
    imageUrl: z.string().optional(),
});

export default function NewTeamMemberPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            role: "",
            bio: "",
            imageUrl: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const result = await addTeamMember(values);
            if (result.success) {
                toast.success("Member added successfully");
                router.push("/admin/team");
                router.refresh();
            } else {
                toast.error(result.error || "Failed to add member");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Add Team Member</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Profile Photo</FormLabel>
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
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Rtr. John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role / Position</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="President 2025-26" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bio / Quote</FormLabel>
                                <FormControl>
                                    <Textarea disabled={loading} placeholder="Short bio..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={loading} type="submit" className="w-full">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Save Member
                    </Button>
                </form>
            </Form>
        </div>
    );
}
