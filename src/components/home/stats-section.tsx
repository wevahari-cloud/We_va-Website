import { Users, Calendar, Heart, Globe } from "lucide-react";

export function StatsSection({ data }: { data: any }) {
    const statsMembers = data?.statsMembers || "120+";
    const statsProjects = data?.statsProjects || "500+";
    const statsLives = data?.statsLives || "10k+";
    const statsYears = data?.statsYears || "12";

    const STATS = [
        { id: 1, label: "Active Members", value: statsMembers, icon: Users },
        { id: 2, label: "Projects Completed", value: statsProjects, icon: Calendar },
        { id: 3, label: "Lives Touched", value: statsLives, icon: Heart },
        { id: 4, label: "Years of Service", value: statsYears, icon: Globe },
    ];

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
