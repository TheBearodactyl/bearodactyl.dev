import { ref, onMounted, onUnmounted } from "vue";
import { getGithubRelease, shuffleArray } from "#imports";

interface Book {
  id: string | number;
  title: string;
  author: string;
  genres: string[];
  tags: string[];
  rating: number;
  status: string;
  description: string;
  myThoughts: string;
  links?: { title: string; url: string }[];
  coverImage?: string;
  explicit: boolean;
}

const IMAGE_CACHE_NAME = "book-cover-cache";

async function cacheCoverImage(
  url: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  try {
    const cache = await caches.open(IMAGE_CACHE_NAME);
    const cachedResponse = await cache.match(url);

    if (cachedResponse) {
      onProgress?.(100);
      const blob = await cachedResponse.blob();
      return URL.createObjectURL(blob);
    }

    onProgress?.(25);
    const response = await fetch(url, { mode: "cors" });

    if (response.ok) {
      onProgress?.(75);
      await cache.put(url, response.clone());
      onProgress?.(100);
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } else {
      console.warn(`Failed to fetch cover image: ${url}`);
      onProgress?.(100);
      return url;
    }
  } catch (e) {
    console.error(`Error caching image ${url}`, e);
    onProgress?.(100);
    return url;
  }
}

export function useData() {
  const books: Ref<Book[]> = ref([]);
  const isLoading: Ref<boolean> = ref(true);
  const fetchError: Ref<string | null> = ref(null);
  const downloadProgress: Ref<number> = ref(0);
  const isContentVisible: Ref<boolean> = ref(false);

  async function loadBooksWithProgress() {
    try {
      isLoading.value = true;
      downloadProgress.value = 0;

      downloadProgress.value = 5;

      const file_contents = await getGithubRelease(
        "thebearodactyl",
        "bearodactyl.dev",
        "books.json"
      );
      var data = JSON.parse(await file_contents.text());

      downloadProgress.value = 20;

      const booksWithImages = data.filter((book: Book) => book.coverImage);
      const totalImages = booksWithImages.length;

      if (totalImages > 0) {
        let processedImages = 0;
        for (const book of data) {
          if (book.coverImage) {
            const imageStartProgress =
              20 + Math.round((processedImages / totalImages) * 80);
            const imageEndProgress =
              20 + Math.round(((processedImages + 1) / totalImages) * 80);

            book.coverImage = await cacheCoverImage(
              book.coverImage,
              (imageProgress) => {
                const currentProgress =
                  imageStartProgress +
                  Math.round(
                    (imageProgress / 100) *
                      (imageEndProgress - imageStartProgress)
                  );
                downloadProgress.value = currentProgress;
              }
            );
            processedImages++;
          }
        }
      } else {
        downloadProgress.value = 100;
      }

      const woah = shuffleArray<Book>(data);
      books.value = woah;
      downloadProgress.value = 100;
    } catch (err: any) {
      fetchError.value = err?.message ?? String(err);
      console.error("Error loading books:", err);
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => {
    loadBooksWithProgress();
  });

  return {
    books,
    isLoading,
    fetchError,
    downloadProgress,
    isContentVisible,
    loadBooksWithProgress,
  };
}
