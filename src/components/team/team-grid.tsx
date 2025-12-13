import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Linkedin, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

const TEAM_MEMBERS = [
    {
        id: 1,
        name: "Rtr. John Doe",
        role: "President 2025-26",
        bio: "Passionate about community service and youth empowerment.",
        image: "https://placehold.co/400x400/005C99/FFF?text=President",
        socials: { linkedin: "#", instagram: "#" },
    },
    {
        id: 2,
        name: "Rtr. Jane Smith",
        role: "Secretary",
        bio: "Ensuring smooth operations and effective communication.",
        image: "https://placehold.co/400x400/FFD700/000?text=Secretary",
        socials: { linkedin: "#", instagram: "#" },
    },
    {
        id: 3,
        name: "Rtr. Alex Brown",
        role: "Treasurer",
        bio: "Managing club finances with transparency and integrity.",
        image: "https://placehold.co/400x400/228B22/FFF?text=Treasurer",
        socials: { linkedin: "#", instagram: "#" },
    },
];

const PAST_PRESIDENTS = [
    { year: "2024-25", name: "Rtr. Sarah Wilson", theme: "Create Hope" },
    { year: "2023-24", name: "Rtr. Mike Johnson", theme: "Imagine Rotary" },
    { year: "2022-23", name: "Rtr. Emily Davis", theme: "Serve to Change Lives" },
];

export function TeamGrid() {
    return (
        <div className="space-y-16">
            {/* Current Board */}
            <section>
                <h2 className="text-2xl font-bold mb-8 text-center">Board of Officials 2025-26</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {TEAM_MEMBERS.map((member) => (
                        <Card key={member.id} className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-col items-center">
                                <Avatar className="h-32 w-32 mb-4 border-4 border-primary/10">
                                    <AvatarImage src={member.image} alt={member.name} />
                                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                                </Avatar>
                                <CardTitle>{member.name}</CardTitle>
                                <CardDescription className="font-semibold text-primary">{member.role}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                                <div className="flex justify-center space-x-4">
                                    <Link href={member.socials.linkedin} className="text-muted-foreground hover:text-blue-700">
                                        <Linkedin className="h-5 w-5" />
                                    </Link>
                                    <Link href={member.socials.instagram} className="text-muted-foreground hover:text-pink-600">
                                        <Instagram className="h-5 w-5" />
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
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
