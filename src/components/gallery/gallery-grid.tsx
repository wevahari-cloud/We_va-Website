"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if needed
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

export function GalleryGrid({ images }: { images: any[] }) {
    if (images.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <p>No photos yet. Check back soon!</p>
            </div>
        );
    }

    const searchParams = useSearchParams();
    const eventId = searchParams.get("event");

    const filteredImages = eventId
        ? images.filter(img => img.eventId === parseInt(eventId))
        : images;

    if (filteredImages.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <p>No photos found for this selection.</p>
                {eventId && (
                    <Button variant="link" onClick={() => window.location.href = "/gallery"}>
                        View all photos
                    </Button>
                )}
            </div>
        );
    }

    const galleryItems = filteredImages.map(img => ({
        ...img,
        src: img.imageUrl,
        thumb: img.imageUrl,
        subHtml: img.title || ""
    }));

    return (
        <div>
            {eventId && (
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="outline" onClick={() => window.location.href = "/events"}>
                        ← Back to Events
                    </Button>
                    <div className="text-muted-foreground">
                        Showing photos for selected event
                    </div>
                </div>
            )}

            <LightGallery
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
                elementClassNames="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2"
            >
                {galleryItems.map((image) => (
                    <a
                        key={image.id}
                        href={image.src}
                        data-sub-html={image.subHtml}
                        className="block aspect-square overflow-hidden rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        <img
                            src={image.thumb}
                            alt={image.subHtml}
                            className="w-full h-full object-cover"
                        />
                    </a>
                ))}
            </LightGallery>
        </div>
    );
}
