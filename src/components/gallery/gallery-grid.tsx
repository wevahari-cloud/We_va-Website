"use client";

import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if needed
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const IMAGES = [
    {
        src: "https://placehold.co/1200x800/003366/FFF?text=Mega+Camp+1",
        thumb: "https://placehold.co/400x300/003366/FFF?text=Mega+Camp+1",
        alt: "Medical Camp 2024",
    },
    {
        src: "https://placehold.co/1200x800/FFA500/FFF?text=Installation+Ceremony",
        thumb: "https://placehold.co/400x300/FFA500/FFF?text=Installation",
        alt: "10th Installation",
    },
    {
        src: "https://placehold.co/1200x800/228B22/FFF?text=Tree+Plantation",
        thumb: "https://placehold.co/400x300/228B22/FFF?text=Tree+Plantation",
        alt: "Green Drive",
    },
    {
        src: "https://placehold.co/1200x800/800000/FFF?text=Orphanage+Visit",
        thumb: "https://placehold.co/400x300/800000/FFF?text=Visit",
        alt: "Smile Project",
    },
    {
        src: "https://placehold.co/1200x800/4B0082/FFF?text=District+Assembly",
        thumb: "https://placehold.co/400x300/4B0082/FFF?text=Assembly",
        alt: "District Event",
    },
    {
        src: "https://placehold.co/1200x800/005C99/FFF?text=Fellowship+Meet",
        thumb: "https://placehold.co/400x300/005C99/FFF?text=Fellowship",
        alt: "Club Fun",
    },
];

export function GalleryGrid() {
    return (
        <div className="w-full">
            <LightGallery
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
                elementClassNames="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
                {IMAGES.map((image, index) => (
                    <a href={image.src} key={index} className="group block overflow-hidden rounded-lg">
                        <img
                            alt={image.alt}
                            src={image.thumb}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 aspect-square"
                        />
                    </a>
                ))}
            </LightGallery>
        </div>
    );
}
