"use client";

import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if needed
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { Loader2 } from "lucide-react";

export function GalleryGrid() {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGallery() {
            try {
                const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    src: doc.data().imageUrl,
                    thumb: doc.data().imageUrl,
                    subHtml: doc.data().caption || ""
                }));
                console.log("Gallery data:", data); // Debug
                setImages(data);
            } catch (error) {
                console.error("Error fetching gallery:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchGallery();
    }, []);

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;

    if (images.length === 0) return <div className="text-center text-muted-foreground p-12">Gallery is empty. Upload photos from Admin!</div>;

    return (
        <div className="w-full">
            <LightGallery
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
                elementClassNames="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
                {images.map((image, index) => (
                    <a href={image.src} key={index} className="group block overflow-hidden rounded-lg relative cursor-pointer" data-sub-html={image.subHtml}>
                        <img
                            alt={image.subHtml}
                            src={image.thumb}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 aspect-square"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </a>
                ))}
            </LightGallery>
        </div>
    );
}
