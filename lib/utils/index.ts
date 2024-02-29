import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getImageNameFromKey(key: string) {
    const imagePath = key?.split("/")
    const imageName = imagePath[imagePath.length - 1]
    return imageName
}



