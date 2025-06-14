import { TrailerModal } from "@/components/TrailerModal";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Trailer() {
  const router = useRouter();
  const isPresented = router.canGoBack();

  const { url } = useLocalSearchParams<{ url: string }>();

  return (
    <TrailerModal
      onClose={() => {
        if (isPresented) {
          router.back();
        } else {
          router.dismissAll();
        }
      }}
      trailerUrl={url}
    />
  );
}
