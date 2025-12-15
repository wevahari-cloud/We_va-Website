"use client";

import { useEffect, useState } from "react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "@/components/admin/image-upload";
import { getHomeContent, updateHomeContent } from "@/actions/home";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

// Schema for Home Page Data
const homeSchema = z.object({
    // Hero Section
    heroTitle: z.string().min(1, "Hero Title is required"),
    heroSubtitle: z.string().min(1, "Hero Subtitle is required"),
    heroButtonText: z.string().min(1, "Button Text is required"),
    heroButtonLink: z.string().min(1, "Button Link is required"),
    heroImages: z.array(z.string()).min(1, "At least one hero image is required"),

    // Stats Section
    statsMembers: z.string(),
    statsProjects: z.string(),
    statsLives: z.string(),
    statsYears: z.string(),

    // President's Message
    presidentName: z.string(),
    presidentRole: z.string(),
    presidentMessage: z.string(),
    presidentImage: z.string(),
});

export default function AdminHomePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const form = useForm<z.infer<typeof homeSchema>>({
        resolver: zodResolver(homeSchema),
        defaultValues: {
            heroTitle: "",
            heroSubtitle: "",
            heroButtonText: "Join Us",
            heroButtonLink: "https://chat.whatsapp.com/FPW5uTF6sI1FGJodn7PPE1",
            heroImages: [],
            statsMembers: "100+",
            statsProjects: "50+",
            statsLives: "1000+",
            statsYears: "10+",
            presidentName: "",
            presidentRole: "President 2025-26",
            presidentMessage: "",
            presidentImage: "",
        },
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getHomeContent();
                if (data) {
                    form.reset(data as any);
                }
            } catch (error) {
                console.error("Error fetching home content:", error);
                toast.error("Failed to load content");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [form]);

    const onSubmit = async (values: z.infer<typeof homeSchema>) => {
        try {
            setSaving(true);
            const result = await updateHomeContent(values);
            if (result.success) {
                toast.success("Home page content updated!");
            } else {
                toast.error(result.error || "Failed to save changes");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to save changes");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Manage Home Page</h1>
                <Button onClick={form.handleSubmit(onSubmit)} disabled={saving}>
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
            </div>

            <Form {...form}>
                <form className="space-y-8">
                    <Tabs defaultValue="hero" className="w-full">
                        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto">
                            <TabsTrigger value="hero">Hero Section</TabsTrigger>
                            <TabsTrigger value="stats">Stats</TabsTrigger>
                            <TabsTrigger value="president">President's Message</TabsTrigger>
                        </TabsList>

                        <TabsContent value="hero">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Hero Section</CardTitle>
                                    <CardDescription>Manage the main banner content.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="heroTitle"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Main Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Service Above Self" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="heroSubtitle"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subtitle</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Join us in making a difference..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="heroButtonText"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Button Text</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="heroButtonLink"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Button Link</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Simple single image implementation for now, or array logic later */}
                                    <FormField
                                        control={form.control}
                                        name="heroImages"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Hero Background Images</FormLabel>
                                                <div className="text-xs text-muted-foreground mb-2">Upload images for the slideshow.</div>
                                                <FormControl>
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                        {field.value.map((url, i) => (
                                                            <div key={i} className="relative aspect-video">
                                                                <img src={url} alt="hero" className="object-cover w-full h-full rounded-md" />
                                                                <Button
                                                                    variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6"
                                                                    onClick={() => {
                                                                        const newImages = [...field.value];
                                                                        newImages.splice(i, 1);
                                                                        field.onChange(newImages);
                                                                    }}
                                                                >
                                                                    X
                                                                </Button>
                                                            </div>
                                                        ))}
                                                        <ImageUpload
                                                            value=""
                                                            onChange={(url) => {
                                                                if (url) field.onChange([...field.value, url]);
                                                            }}
                                                            onRemove={() => { }}
                                                            disabled={saving}
                                                            aspectRatio={16 / 9}
                                                            aspectRatioLabel="16:9 Landscape (Recommended for Hero)"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="stats">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Key Statistics</CardTitle>
                                    <CardDescription>Update the numbers shown on the website.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="statsMembers"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Active Members</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="statsProjects"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Projects Completed</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="statsLives"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Lives Touched</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="statsYears"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Years of Service</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="president">
                            <Card>
                                <CardHeader>
                                    <CardTitle>President's Message</CardTitle>
                                    <CardDescription>Featured message on the home page.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="presidentImage"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>President's Photo</FormLabel>
                                                <FormControl>
                                                    <ImageUpload
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        onRemove={() => field.onChange("")}
                                                        disabled={saving}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="presidentName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="presidentRole"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Role/Title</FormLabel>
                                                <FormControl><Input {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="presidentMessage"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Message</FormLabel>
                                                <FormControl>
                                                    <Textarea rows={6} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </form>
            </Form>
        </div>
    );
}
