import { FracturedImages } from "@/lib/types";
import axios from "axios";

export async function getData(): Promise<FracturedImages> {
    try {
        const res = await axios.get(`/api/view-album`)
        return res.data
    } catch (error: any) {
        throw new Error(error)
    }
}