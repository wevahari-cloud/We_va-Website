"use client";

import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string;
}

export function ImageUpload({
    disabled,
    onChange,
    onRemove,
    value
}: ImageUploadProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value && (
                    <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove(value)} variant="destructive" size="icon">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <img className="object-cover w-full h-full" alt="Image" src={value} />
                    </div>
                )}
            </div>
            <CldUploadButton
                onSuccess={onUpload}
                options={{ maxFiles: 1 }}
                uploadPreset="western_valley" // NOTE: User needs to create this unsigned preset in Cloudinary
            >
                <Button disabled={disabled} variant="secondary" type="button">
                    <ImagePlus className="h-4 w-4 mr-2" />
                    Upload Image
                </Button>
            </CldUploadButton>
        </div>
    );
}
