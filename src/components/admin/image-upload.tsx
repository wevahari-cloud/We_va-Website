"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash, Crop, X } from "lucide-react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop";
import { getCroppedImg, readFile } from "@/lib/crop-utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { uploadImage } from "@/actions/upload";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string;
    aspectRatio?: number; // e.g., 16/9 for landscape, 1 for square, 3/4 for portrait
    aspectRatioLabel?: string; // e.g., "16:9 Landscape", "1:1 Square"
}

export function ImageUpload({
    disabled,
    onChange,
    onRemove,
    value,
    aspectRatio,
    aspectRatioLabel = "Free Crop"
}: ImageUploadProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Handle global paste events for images
    useEffect(() => {
        const handlePaste = async (e: ClipboardEvent) => {
            // If the dialog is already open or uploading, we might want to ignore? 
            // Or maybe replace the current image? Let's assume replace if not uploading.
            if (uploading || disabled) return;

            if (e.clipboardData && e.clipboardData.items) {
                const items = e.clipboardData.items;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf("image") !== -1) {
                        // Found an image in clipboard
                        e.preventDefault();
                        const file = items[i].getAsFile();
                        if (file) {
                            setSelectedFile(file);
                            const imageDataUrl = await readFile(file);
                            setImageSrc(imageDataUrl);
                            setIsDialogOpen(true);
                        }
                        return; // Only process the first image found
                    }
                }
            }
        };

        // Only add listener if not disabled? or general. 
        // Adding globally means it works anywhere on the page which satisfies "snip and ... page should accept"
        document.addEventListener("paste", handlePaste);
        return () => {
            document.removeEventListener("paste", handlePaste);
        };
    }, [uploading, disabled]); // Re-bind if uploading/disabled state changes

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedFile(file);
            const imageDataUrl = await readFile(file);
            setImageSrc(imageDataUrl);
            setIsDialogOpen(true);
        }
    };

    const handleUpload = async (blob: Blob) => {
        try {
            setUploading(true);

            // Create FormData
            const formData = new FormData();
            formData.append('file', blob, 'image.jpg');

            // Use server action for upload
            const { success, url, error } = await uploadImage(formData);

            if (!success || !url) {
                throw new Error(error || 'Upload failed');
            }

            onChange(url);

            // Reset state
            setImageSrc(null);
            setSelectedFile(null);
            setIsDialogOpen(false);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
        } catch (error) {
            console.error('Error uploading image:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
            alert(`Upload failed: ${errorMessage}`);
        } finally {
            setUploading(false);
        }
    }

    const handleCropConfirm = async () => {
        if (!imageSrc || !croppedAreaPixels) return;
        const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
        await handleUpload(croppedBlob);
    };

    const handleUploadOriginal = async () => {
        if (!selectedFile) return;
        await handleUpload(selectedFile);
    };

    const handleCancel = () => {
        setImageSrc(null);
        setSelectedFile(null);
        setIsDialogOpen(false);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
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

            <div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={disabled}
                    className="hidden"
                    id="image-upload-input"
                />
                <label htmlFor="image-upload-input">
                    <Button disabled={disabled} variant="secondary" type="button" asChild>
                        <span>
                            <ImagePlus className="h-4 w-4 mr-2" />
                            Upload Image
                        </span>
                    </Button>
                </label>
            </div>

            {/* Crop Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Crop Image</DialogTitle>
                        {aspectRatioLabel && (
                            <p className="text-sm text-muted-foreground mt-2">
                                Aspect Ratio: <span className="font-semibold">{aspectRatioLabel}</span>
                            </p>
                        )}
                    </DialogHeader>

                    <div className="relative w-full h-[400px] bg-gray-100 dark:bg-gray-800">
                        {imageSrc && (
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={aspectRatio} // Use dynamic aspect ratio
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        )}
                    </div>

                    <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-4">
                            <label className="text-sm font-medium min-w-[60px]">Zoom</label>
                            <Slider
                                value={[zoom]}
                                onValueChange={(value) => setZoom(value[0])}
                                min={1}
                                max={3}
                                step={0.1}
                                className="flex-1"
                            />
                        </div>
                    </div>

                    <DialogFooter className="sm:justify-between">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleUploadOriginal}
                            disabled={uploading}
                        >
                            Upload Original (No Crop)
                        </Button>

                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                                disabled={uploading}
                            >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                onClick={handleCropConfirm}
                                disabled={uploading}
                            >
                                <Crop className="h-4 w-4 mr-2" />
                                {uploading ? 'Uploading...' : 'Crop & Upload'}
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
