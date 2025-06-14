import { IMAGE_BASE_URL } from "@/lib/constants";

export function resolveTmdbImage(path: string) {
  return path
    ? `${IMAGE_BASE_URL}${path}`
    : "https://via.placeholder.com/150x225?text=No+Image";
}
