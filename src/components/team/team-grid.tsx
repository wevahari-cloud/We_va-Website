import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PAST_PRESIDENTS = [
    { year: "2024-25", name: "Rtr. Sarah Wilson", theme: "Create Hope" },
    { year: "2023-24", name: "Rtr. Mike Johnson", theme: "Imagine Rotary" },
    { year: "2022-23", name: "Rtr. Emily Davis", theme: "Serve to Change Lives" },
];

export function TeamGrid({ members }: { members: any[] }) {
    return (
        <div className="space-y-16">
            {/* Current Board */}
            <section>
                <h2 className="text-2xl font-bold mb-8 text-center">Board of Officials</h2>

                {members.length === 0 ? (
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
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </section>

            {/* Past Presidents */}
            <section>
                <h2 className="text-2xl font-bold mb-8 text-center">Past Presidents</h2>
                <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
                    {PAST_PRESIDENTS.map((pres) => (
                        <AccordionItem key={pres.year} value={pres.year}>
                            <AccordionTrigger className="text-lg">
                                <span>{pres.year} - {pres.name}</span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-muted-foreground italic">{pres.theme}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </div>
    );
}
