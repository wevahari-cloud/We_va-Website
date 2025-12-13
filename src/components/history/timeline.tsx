"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

// Fallback data
const FALLBACK_DATA = [
    {
        id: "demo1",
        year: "2024",
        title: "Welcome to Western Valley",
        date: "2024-07-01",
        description: "Welcome to our new website! Check back soon for our history.",
    }
];

export function Timeline({ items: propItems }: { items?: any[] }) {
    const items = propItems && propItems.length > 0 ? propItems : FALLBACK_DATA;

    return (
        <div className="space-y-12">
            {items.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                            <div className="flex items-center justify-between">
                                <Badge variant="secondary" className="text-lg px-4 py-1">
                                    {item.year}
                                </Badge>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-sm">{new Date(item.date).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <CardTitle className="text-2xl mt-4">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <CardDescription className="text-base leading-relaxed mb-4">
                                {item.description}
                            </CardDescription>
                            {item.imageUrl && (
                                <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800">
                                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
