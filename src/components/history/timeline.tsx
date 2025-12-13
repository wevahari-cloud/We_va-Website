"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
// Fallback data
const FALLBACK_DATA = [
    {
        id: "demo1",
        year: "2024",
        title: "Welcome to Western Valley",
        date: "2024-07-01",
        description: "Welcome to our new website! Check back soon for our history.",
        instagramUrl: "", // Example placeholder
    }
];

export function Timeline() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHistory() {
            try {
                const q = query(collection(db, "history"), orderBy("date", "desc"));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                if (data.length > 0) {
                    setItems(data);
                } else {
                    setItems(FALLBACK_DATA);
                }
            } catch (error) {
                console.error("Error fetching history:", error);
                setItems(FALLBACK_DATA);
            } finally {
                setLoading(false);
            }
        }
        fetchHistory();
    }, []);

    if (loading) return <div className="text-center py-12">Loading history...</div>;

    return (
        <div className="relative container mx-auto px-4 py-8">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-1/2" />

            <div className="space-y-12">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                            }`}
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-1/2 mt-6 z-10" />

                        {/* Content Card */}
                        <div className="ml-12 md:ml-0 md:w-1/2 px-4">
                            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800">
                                    {item.imageUrl ? (
                                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Media</div>
                                    )}
                                </div>

                                <div className="relative">
                                    <Badge className="absolute top-(-20) left-4 z-20">{item.year}</Badge>
                                </div>

                                <CardHeader>
                                    <CardTitle>{item.title}</CardTitle>
                                    <CardDescription className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" /> {item.date}
                                    </CardDescription>
                                </CardHeader>
                                {item.description && (
                                    <CardContent>
                                        <p className="text-muted-foreground whitespace-pre-wrap">{item.description}</p>
                                    </CardContent>
                                )}
                            </Card>
                        </div>

                        {/* Empty space for alternate side */}
                        <div className="hidden md:block md:w-1/2" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
