import { Users, Calendar, Heart, Globe } from "lucide-react";

const STATS = [
    { id: 1, label: "Active Members", value: "120+", icon: Users },
    { id: 2, label: "Projects Completed", value: "500+", icon: Calendar },
    { id: 3, label: "Lives Touched", value: "10k+", icon: Heart },
    { id: 4, label: "Years of Service", value: "12", icon: Globe },
];

export function StatsSection() {
    return (
        <section className="py-16 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {STATS.map((stat) => (
                        <div key={stat.id} className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-white/10 transition-colors">
                            <stat.icon className="h-8 w-8 md:h-12 md:w-12 text-secondary mb-2" />
                            <div className="text-3xl md:text-5xl font-bold tracking-tight">{stat.value}</div>
                            <div className="text-sm md:text-base opacity-90 uppercase tracking-wider font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
