"use client";

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

    const galleryItems = images.map(img => ({
        ...img,
        src: img.imageUrl,
        thumb: img.imageUrl,
        subHtml: img.title || ""
    }));

    return (
        <LightGallery
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
            elementClassNames="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
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
    );
}
