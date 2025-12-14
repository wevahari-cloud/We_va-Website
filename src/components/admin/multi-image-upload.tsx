"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash, X } from "lucide-react";
import { ImageUpload } from "@/components/admin/image-upload";

import { Star } from "lucide-react";

interface MultiImageUploadProps {
    disabled?: boolean;
    onChange: (value: string[]) => void;
    onRemove: (value: string) => void;
    value: string[];
    mainImage?: string;
    onSetMain?: (value: string) => void;
    maxFiles?: number;
}

export function MultiImageUpload({
    disabled,
    onChange,
    onRemove,
    value = [],
    mainImage,
    onSetMain,
    maxFiles = 6
}: MultiImageUploadProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onAdd = (url: string) => {
        onChange([...value, url]);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4 flex-wrap">
                {value.map((url) => (
                    <div key={url} className={`relative w-[200px] h-[200px] rounded-md overflow-hidden border-2 ${mainImage === url ? "border-primary" : "border-transparent"}`}>
                        <div className="z-10 absolute top-2 right-2 flex gap-2">
                            {onSetMain && (
                                <Button
                                    type="button"
                                    onClick={() => onSetMain(url)}
                                    variant={mainImage === url ? "default" : "secondary"}
                                    size="icon"
                                    className="h-8 w-8"
                                    title="Set as Main Poster"
                                >
                                    <Star className={`h-4 w-4 ${mainImage === url ? "fill-current" : ""}`} />
                                </Button>
                            )}
                            <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon" className="h-8 w-8">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <img className="object-cover w-full h-full" alt="Image" src={url} />
                        {mainImage === url && (
                            <div className="absolute bottom-0 left-0 right-0 bg-primary/80 text-primary-foreground text-xs font-bold text-center py-1">
                                Main Poster
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {value.length < maxFiles && (
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground">Add images ({value.length}/{maxFiles})</p>
                    {/* We reuse the single ImageUpload but reset it after adding? 
                         Actually, ImageUpload component takes `value`. 
                         We can make a wrapper that just exposes the upload button behavior 
                         or modify ImageUpload to support standalone mode.
                         
                         Easier approach: Render a dummy ImageUpload that, when changes, triggers onAdd and resets itself?
                         Or better: Just use ImageUpload as a trigger.
                     */}

                    <div className="w-[200px]">
                        <ImageUpload
                            value=""
                            disabled={disabled || value.length >= maxFiles}
                            onChange={(url) => onAdd(url)}
                            onRemove={() => { }}
                            aspectRatioLabel="Free Crop or Original"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
