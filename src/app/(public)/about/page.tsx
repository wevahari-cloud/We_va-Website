import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Lightbulb, Heart } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            {/* Hero */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight mb-4">About Us</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Part of Rotary International District 3201. Driven by fellowship, dedicated to service.
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
                        <p className="text-lg text-muted-foreground">
                            To be the leading youth organization in Western Valley, recognized for sustainable community impact, professional excellence, and inclusive leadership development.
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Avenues of Service */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center mb-12">Avenues of Service</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        "Club Service",
                        "Community Service",
                        "Professional Service",
                        "International Service",
                    ].map((avenue, idx) => (
                        <div key={idx} className="flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                            <Heart className="h-10 w-10 text-primary mb-4" />
                            <h3 className="font-bold text-lg">{avenue}</h3>
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
