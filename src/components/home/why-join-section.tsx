import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, HeartHandshake, Smile } from "lucide-react";
import { getBenefits } from "@/actions/why-join";

const ICON_MAP: Record<string, any> = {
    "Briefcase": Briefcase,
    "HeartHandshake": HeartHandshake,
    "Smile": Smile
};

export async function WhyJoinSection() {
    const benefits = await getBenefits();

    // Fallback if DB is empty (though admin page seeds it)
    const displayItems = benefits.length > 0 ? benefits : [];

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
                    {displayItems.map((item, index) => {
                        const Icon = item.icon ? ICON_MAP[item.icon] : null;

                        return (
                            <Card
                                key={item.id}
                                className={`border-none shadow-md hover:shadow-xl transition-shadow bg-white dark:bg-slate-800 overflow-hidden relative group h-full flex flex-col`}
                                style={
                                    item.imageUrl
                                        ? {
                                            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${item.imageUrl})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }
                                        : {}
                                }
                            >
                                <CardHeader className="flex flex-col items-center text-center pb-2 relative z-10">
                                    {Icon && !item.imageUrl && (
                                        <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-primary">
                                            <Icon className="h-8 w-8" />
                                        </div>
                                    )}
                                    {/* For image backgrounds, maybe show icon in white? User didn't specify, but let's just center the content */}
                                    {item.imageUrl && Icon && (
                                        <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 text-white">
                                            <Icon className="h-8 w-8" />
                                        </div>
                                    )}
                                    <CardTitle className={`text-xl font-bold ${item.imageUrl ? "text-white" : ""}`}>{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent className={`text-center flex-1 ${item.imageUrl ? "text-slate-100" : "text-slate-600 dark:text-slate-400"}`}>
                                    <CardDescription className={`text-base ${item.imageUrl ? "text-slate-200" : ""}`}>
                                        {item.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
