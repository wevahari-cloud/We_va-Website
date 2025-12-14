import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { getPublicGalleryImages } from "@/actions/gallery";

export default async function GalleryPage() {
    const images = await getPublicGalleryImages();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Gallery</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Capturing moments of service, fellowship, and impact.
                </p>
            </div>
            <GalleryGrid images={images} />
        </div>
    );
}
