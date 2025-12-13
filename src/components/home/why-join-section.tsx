import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, HeartHandshake, Smile } from "lucide-react";

const BENEFITS = [
    {
        title: "Professional Development",
        description: "Enhance your leadership skills, public speaking, and project management capabilities through hands-on experiences.",
        icon: Briefcase,
    },
    {
        title: "Community Service",
        description: "Make a tangible difference in society through impactful projects focusing on health, education, and environment.",
        icon: HeartHandshake,
    },
    {
        title: "Fellowship & Fun",
        description: "Build lifelong friendships with like-minded individuals and enjoy exciting social events and trips.",
        icon: Smile,
    },
];

export function WhyJoinSection() {
    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">Why Join Rotaract?</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Become part of a global movement that empowers youth to create positive change while growing personally and professionally.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {BENEFITS.map((item, index) => (
                        <Card key={index} className="border-none shadow-md hover:shadow-xl transition-shadow bg-white dark:bg-slate-800">
                            <CardHeader className="flex flex-col items-center text-center pb-2">
                                <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-primary">
                                    <item.icon className="h-8 w-8" />
                                </div>
                                <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-slate-600 dark:text-slate-400">
                                <CardDescription className="text-base">{item.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
