import type { ApiResponse, Hardware } from "./types";

export function getHardwareArray(response: unknown): Hardware[] {
    if (response && typeof response === "object" && "payload" in response){
        return (response as ApiResponse<Hardware[]>).payload ?? [];
    }
    return [];
}