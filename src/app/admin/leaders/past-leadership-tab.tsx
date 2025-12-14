"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/image-upload";
import {
    addPastYear,
    updatePastYear,
    addPastLeader,
    deletePastLeader,
    updatePastLeader
} from "@/actions/leaders";
import { toast } from "sonner";

export function PastLeadershipTab({ initialYears }: { initialYears: any[] }) {
    const [years, setYears] = useState(initialYears);

    // Year Modal State
    const [isYearDialogOpen, setIsYearDialogOpen] = useState(false);
    const [editingYear, setEditingYear] = useState<any>(null);
    const [yearName, setYearName] = useState("");
    const [themeTitle, setThemeTitle] = useState("");
    const [themeLogo, setThemeLogo] = useState("");

    // Leader Modal State
    const [isLeaderDialogOpen, setIsLeaderDialogOpen] = useState(false);
    const [editingLeader, setEditingLeader] = useState<any>(null);
    const [selectedYearId, setSelectedYearId] = useState<number | null>(null);
    const [leaderName, setLeaderName] = useState("");
    const [leaderRole, setLeaderRole] = useState("");
    const [leaderImage, setLeaderImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // --- Year Handlers ---
    const handleOpenYearDialog = (year?: any) => {
        if (year) {
            setEditingYear(year);
            setYearName(year.name);
            setThemeTitle(year.themeTitle || "");
            setThemeLogo(year.themeLogoUrl || "");
        } else {
            setEditingYear(null);
            setYearName("");
            setThemeTitle("");
            setThemeLogo("");
        }
        setIsYearDialogOpen(true);
    };

    const handleYearSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = { name: yearName, themeTitle, themeLogoUrl: themeLogo };
            if (editingYear) {
                const res = await updatePastYear(editingYear.id, data);
                if (res.success) toast.success("Year updated");
                else toast.error("Failed to update year");
            } else {
                const res = await addPastYear(data);
                if (res.success) toast.success("Year added");
                else toast.error("Failed to add year");
            }
            if (!editingYear) setIsYearDialogOpen(false); // only close on add, keep edit open? nah close both
            setIsYearDialogOpen(false);
        } catch {
            toast.error("Error saving year");
        } finally {
            setIsLoading(false);
        }
    };

    // --- Leader Handlers ---
    const handleOpenLeaderDialog = (yearId: number, leader?: any) => {
        setSelectedYearId(yearId);
        if (leader) {
            setEditingLeader(leader);
            setLeaderName(leader.name);
            setLeaderRole(leader.role);
            setLeaderImage(leader.imageUrl || "");
        } else {
            setEditingLeader(null);
            setLeaderName("");
            setLeaderRole("");
            setLeaderImage("");
        }
        setIsLeaderDialogOpen(true);
    };

    const handleLeaderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedYearId && !editingLeader) return;
        setIsLoading(true);

        try {
            const data = {
                name: leaderName,
                role: leaderRole,
                imageUrl: leaderImage,
                yearId: selectedYearId!
            };

            if (editingLeader) {
                const res = await updatePastLeader(editingLeader.id, data);
                if (res.success) toast.success("Leader updated");
                else toast.error("Failed to update leader");
            } else {
                const res = await addPastLeader(data);
                if (res.success) toast.success("Leader added");
                else toast.error("Failed to add leader");
            }
            setIsLeaderDialogOpen(false);
        } catch {
            toast.error("Error saving leader");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteLeader = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        try {
            const res = await deletePastLeader(id);
            if (res.success) toast.success("Leader deleted");
            else toast.error("Failed to delete");
        } catch {
            toast.error("Error deleting");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button onClick={() => handleOpenYearDialog()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Rota Year
                </Button>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
                {initialYears.map((year) => (
                    <AccordionItem key={year.id} value={`year-${year.id}`} className="border rounded-lg px-4 bg-card/50">
                        <AccordionTrigger className="hover:no-underline py-4">
                            <div className="flex items-center space-x-4 w-full text-left">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold">{year.name}</h3>
                                    {year.themeTitle && (
                                        <p className="text-sm text-muted-foreground">{year.themeTitle}</p>
                                    )}
                                </div>
                                <div className="flex items-center space-x-2 mr-4" onClick={(e) => e.stopPropagation()}>
                                    <Button size="sm" variant="ghost" onClick={() => handleOpenYearDialog(year)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b pb-2">
                                    <h4 className="font-medium text-sm text-muted-foreground">Leadership Team</h4>
                                    <Button size="sm" variant="outline" onClick={() => handleOpenLeaderDialog(year.id)}>
                                        <Plus className="mr-2 h-3 w-3" />
                                        Add Leader
                                    </Button>
                                </div>

                                {year.themeLogoUrl && (
                                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-md mb-4 max-w-fit">
                                        <img src={year.themeLogoUrl} alt="Theme Logo" className="w-8 h-8 object-contain" />
                                        <span className="text-xs text-muted-foreground">Year Logo</span>
                                    </div>
                                )}

                                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                                    {year.leaders?.map((leader: any) => (
                                        <div key={leader.id} className="flex items-center space-x-3 p-3 border rounded bg-background shadow-sm">
                                            <div className="h-10 w-10 rounded-full overflow-hidden bg-muted shrink-0">
                                                {leader.imageUrl && <img src={leader.imageUrl} className="w-full h-full object-cover" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm truncate">{leader.name}</p>
                                                <p className="text-xs text-muted-foreground truncate">{leader.role}</p>
                                            </div>
                                            <div className="flex space-x-1">
                                                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleOpenLeaderDialog(year.id, leader)}>
                                                    <Pencil className="h-3 w-3" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => handleDeleteLeader(leader.id)}>
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    {(!year.leaders || year.leaders.length === 0) && (
                                        <p className="text-sm text-muted-foreground col-span-full italic">No leaders added yet.</p>
                                    )}
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            {/* Year Dialog */}
            <Dialog open={isYearDialogOpen} onOpenChange={setIsYearDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingYear ? "Edit Rota Year" : "Add Rota Year"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleYearSubmit} className="space-y-4 py-4">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="yearName">Year Name (e.g. 2023-24)</Label>
                                <Input id="yearName" value={yearName} onChange={(e) => setYearName(e.target.value)} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="themeTitle">Theme Title (e.g. Create Hope)</Label>
                                <Input id="themeTitle" value={themeTitle} onChange={(e) => setThemeTitle(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Theme Logo</Label>
                                <div className="w-32 mx-auto">
                                    <ImageUpload value={themeLogo} onChange={setThemeLogo} />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={isLoading}>{editingYear ? "Save" : "Add"}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Leader Dialog */}
            <Dialog open={isLeaderDialogOpen} onOpenChange={setIsLeaderDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingLeader ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleLeaderSubmit} className="space-y-4 py-4">
                        <div className="flex justify-center mb-4">
                            <div className="w-24">
                                <ImageUpload value={leaderImage} onChange={setLeaderImage} />
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label>Name</Label>
                                <Input value={leaderName} onChange={(e) => setLeaderName(e.target.value)} required />
                            </div>
                            <div className="grid gap-2">
                                <Label>Role</Label>
                                <Input value={leaderRole} onChange={(e) => setLeaderRole(e.target.value)} placeholder="President / Secretary" required />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={isLoading}>{editingLeader ? "Save" : "Add"}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
