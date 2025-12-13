import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Activity } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">120+</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Site Visits</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,230</div>
                        <p className="text-xs text-muted-foreground">+20% from last month</p>
                    </CardContent>
                </Card>
            </div>

            <div className="rounded-lg border p-4 shadow-sm bg-white dark:bg-slate-800">
                <h3 className="font-semibold mb-2">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link href="/admin/events/new" className="h-24 rounded border border-dashed hover:border-solid hover:border-primary hover:bg-primary/5 flex flex-col gap-2 items-center justify-center text-muted-foreground hover:text-primary transition-all">
                        <Calendar className="h-6 w-6" />
                        <span className="font-medium">Add Event</span>
                    </Link>
                    <Link href="/admin/team/new" className="h-24 rounded border border-dashed hover:border-solid hover:border-primary hover:bg-primary/5 flex flex-col gap-2 items-center justify-center text-muted-foreground hover:text-primary transition-all">
                        <Users className="h-6 w-6" />
                        <span className="font-medium">Add Team Member</span>
                    </Link>
                    <Link href="/admin/gallery/new" className="h-24 rounded border border-dashed hover:border-solid hover:border-primary hover:bg-primary/5 flex flex-col gap-2 items-center justify-center text-muted-foreground hover:text-primary transition-all">
                        <Activity className="h-6 w-6" />
                        <span className="font-medium">Upload Photo</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
