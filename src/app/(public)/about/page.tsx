import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Lightbulb, Heart } from "lucide-react";

import { getAvenues, seedAvenues } from "@/actions/avenues";

export default async function AboutPage() {
    let avenues = await getAvenues();
    if (avenues.length === 0) {
        await seedAvenues();
        avenues = await getAvenues();
    }
    return (
        <div className="container mx-auto px-4 py-12">
            {/* Hero */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight mb-4">About Us</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Part of Rotary International District 3206. Driven by fellowship, dedicated to service.
                    <br />
                    "Family of Rotary Club of Coimbatore Town"
                </p>
            </div>

            {/* Mission/Vision */}
            <div className="grid md:grid-cols-2 gap-8 mb-20">
                <Card className="bg-primary text-primary-foreground border-none">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Target className="h-8 w-8 text-secondary" />
                        <CardTitle className="text-2xl">Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg opacity-90">
                            To provide an opportunity for young men and women to enhance the knowledge and skills that will assist them in personal development, to address the physical and social needs of their communities, and to promote better relations between all people worldwide through a framework of friendship and service.
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-100 dark:bg-slate-800 border-none">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Lightbulb className="h-8 w-8 text-yellow-500" />
                        <CardTitle className="text-2xl">Our Vision</CardTitle>
                    </CardHeader>
                    <CardContent>
                        To create a family and lead the young generation to strive for the society.

                    </CardContent>
                </Card>
            </div>

            {/* Avenues of Service */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center mb-12">Avenues of Service</h2>
                <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                    {avenues.map((avenue, idx) => (
                        <div
                            key={avenue.id || idx}
                            className={`flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center w-full md:w-[calc(25%-1.5rem)] min-w-[250px] relative overflow-hidden group`}
                            style={
                                avenue.imageUrl
                                    ? {
                                        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${avenue.imageUrl})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }
                                    : {}
                            }
                        >
                            <Heart className={`h-10 w-10 mb-4 ${avenue.imageUrl ? "text-white" : "text-primary"}`} />
                            <h3 className={`font-bold text-lg ${avenue.imageUrl ? "text-white" : ""}`}>{avenue.title}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ */}
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is Rotaract?</AccordionTrigger>
                        <AccordionContent>
                            Rotaract brings together people ages 18 and older to exchange ideas with leaders in the community, develop leadership and professional skills, and have fun through service.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Who can join?</AccordionTrigger>
                        <AccordionContent>
                            Anyone aged 18-30 (and beyond in some cases) who is interested in community service and professional development can join. You don't need to be related to a Rotarian.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How often do we meet?</AccordionTrigger>
                        <AccordionContent>
                            We typically meet twice a month for general body meetings, plus additional project activities on weekends.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
