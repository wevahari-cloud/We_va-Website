import { TeamGrid } from "@/components/team/team-grid";
import { getTeamMembers } from "@/actions/team";

export default async function TeamPage() {
    const members = await getTeamMembers();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Our Leaders</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Meet the dedicated team working behind the scenes to drive our projects and community initiatives forward.
                </p>
            </div>
            <TeamGrid members={members} />
        </div>
    );
}
