// composables/useTrackManagement.ts
import { ref, computed, watch } from "vue";
import { useLocalStorage } from "@vueuse/core";

export function useTrackManagement(
    shuffle: Ref<boolean>
) {
  const allSongs: Ref<string[]> = ref<string[]>([
    "/audio/music/epic_music006.mp3",
    "/audio/music/epic_music012.mp3",
    "/audio/music/epic_music016.mp3",
    "/audio/music/epic_music017.mp3",
    "/audio/music/epic_music022.mp3",
    "/audio/music/epic_music027.mp3",
    "/audio/music/epic_music030.mp3",
    "/audio/music/epic_music031.mp3",
    "/audio/music/epic_music033.mp3",
    "/audio/music/epic_music038.mp3",
    "/audio/music/epic_music040.mp3",
    "/audio/music/epic_music041.mp3",
    "/audio/music/epic_music043.mp3",
    "/audio/music/epic_music045.mp3",
    "/audio/music/epic_music060.mp3",
    "/audio/music/epic_music061.mp3",
    "/audio/music/epic_music066.mp3",
  ]);

  const customSongs = useLocalStorage<string[]>("custom_songs", []);
  const selectedSong = ref("");
  const shuffledSongs = ref<string[]>([]);

  const initializeTracks = () => {
    allSongs.value = [...allSongs.value, ...customSongs.value];
    if (allSongs.value.length > 0 && !selectedSong.value) {
      selectedSong.value = allSongs.value[0];
    }
    updateShuffledSongs();
  };

  const updateShuffledSongs = () => {
    shuffledSongs.value = [...allSongs.value].sort(() => Math.random() - 0.5);
  };

  const getActivePlaylist = computed(() => {
    return shuffle.value ? shuffledSongs.value : allSongs.value;
  });

  const getFileName = (path: string): string => {
    return decodeURIComponent(path.split("/").pop() || "Unknown");
  };

  const handleDrop = (event: DragEvent) => {
    const file = event.dataTransfer?.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    customSongs.value = [...customSongs.value, url];
    allSongs.value = [...allSongs.value, url];
    selectedSong.value = url;
    updateShuffledSongs();
  };

  initializeTracks();

  // Watch for changes in custom songs
  watch(customSongs, () => {
    initializeTracks();
  });

  return {
    allSongs,
    customSongs,
    selectedSong,
    getActivePlaylist,
    getFileName,
    handleDrop,
    updateShuffledSongs,
  };
}
