"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash, X } from "lucide-react";
import { ImageUpload } from "@/components/admin/image-upload";

interface MultiImageUploadProps {
    disabled?: boolean;
    onChange: (value: string[]) => void;
    onRemove: (value: string) => void;
    value: string[];
    maxFiles?: number;
}

export function MultiImageUpload({
    disabled,
    onChange,
    onRemove,
    value = [], // Default to empty array if undefined
    maxFiles = 5
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
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <img className="object-cover w-full h-full" alt="Image" src={url} />
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
