import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLeaders, getPastYearsWithLeaders } from "@/actions/leaders";
import { CurrentBoardTab } from "./current-board-tab";
import { PastLeadershipTab } from "./past-leadership-tab";

export default async function LeadersPage() {
    // Fetch data server-side
    const leaders = await getLeaders();
    const pastYears = await getPastYearsWithLeaders();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Leaders Management</h1>
            </div>

            <Tabs defaultValue="current" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="current">Current Board</TabsTrigger>
                    <TabsTrigger value="past">Past Leadership</TabsTrigger>
                </TabsList>

                <TabsContent value="current">
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Board of Officials</CardTitle>
                            <CardDescription>
                                Manage the current team members. Drag to reorder.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CurrentBoardTab initialLeaders={leaders} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="past">
                    <Card>
                        <CardHeader>
                            <CardTitle>Past Leadership (Archived)</CardTitle>
                            <CardDescription>
                                Manage teams from previous years.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PastLeadershipTab initialYears={pastYears} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
