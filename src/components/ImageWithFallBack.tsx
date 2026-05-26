import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { PLACEHOLDER_IMAGE_URL } from "@/app/constants";

type ImageWithFallbackProps = Omit<ImageProps, "src"> & {
    src: string;
};

export default function ImageWithFallback({ src, alt, ...rest }: ImageWithFallbackProps) {
    const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER_IMAGE_URL);

    return (
        <Image
            src={imgSrc}
            alt={alt}
            onError={() => setImgSrc(PLACEHOLDER_IMAGE_URL)}
            width={50}
            height={50}
            unoptimized
            {...rest}
        />
    );
}
