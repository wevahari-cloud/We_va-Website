"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Linkedin, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

const PAST_PRESIDENTS = [
    { year: "2024-25", name: "Rtr. Sarah Wilson", theme: "Create Hope" },
    { year: "2023-24", name: "Rtr. Mike Johnson", theme: "Imagine Rotary" },
    { year: "2022-23", name: "Rtr. Emily Davis", theme: "Serve to Change Lives" },
];

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { Loader2 } from "lucide-react";

export function TeamGrid() {
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTeam() {
            try {
                const q = query(collection(db, "team"));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setMembers(data);
            } catch (error) {
                console.error("Error fetching team:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTeam();
    }, []);

    return (
        <div className="space-y-16">
            {/* Current Board */}
            <section>
                <h2 className="text-2xl font-bold mb-8 text-center">Board of Officials</h2>

                {loading ? (
                    <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>
                ) : members.length === 0 ? (
                    <div className="text-center text-muted-foreground">Board members to be announced.</div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {members.map((member) => (
                            <Card key={member.id} className="text-center hover:shadow-lg transition-shadow">
                                <CardHeader className="flex flex-col items-center">
                                    <Avatar className="h-32 w-32 mb-4 border-4 border-primary/10">
                                        <AvatarImage src={member.imageUrl} alt={member.name} />
                                        <AvatarFallback>{member.name?.[0]}</AvatarFallback>
                                    </Avatar>
                                    <CardTitle>{member.name}</CardTitle>
                                    <CardDescription className="font-semibold text-primary">{member.role}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                                    {/* Socials can be added back if included in schema */}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </section>

            {/* Past Leaders */}
            <section className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center">Past Leadership</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="presidents">
                        <AccordionTrigger>Past Presidents</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 pt-4">
                                {PAST_PRESIDENTS.map((pp, idx) => (
                                    <div key={idx} className="flex justify-between items-center border-b pb-2 last:border-0">
                                        <div>
                                            <span className="font-semibold block">{pp.name}</span>
                                            <span className="text-xs text-muted-foreground">Theme: {pp.theme}</span>
                                        </div>
                                        <span className="text-sm font-medium bg-secondary/20 px-2 py-1 rounded text-secondary-foreground">{pp.year}</span>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="secretaries">
                        <AccordionTrigger>Past Secretaries</AccordionTrigger>
                        <AccordionContent>
                            <p className="text-muted-foreground text-center py-4">Data being updated...</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>
        </div>
    );
}
