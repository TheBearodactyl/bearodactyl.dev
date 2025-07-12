import { ref, computed, watch, type Ref } from "vue";
import { useLocalStorage } from "@vueuse/core";

export function useAudioPlayer(
  currentSrc: Ref<string>,
  currentMime: Ref<string>,
  selectedSong: Ref<string>,
  shuffledSongs: Ref<string[]>,
  shuffle: Ref<boolean>,
  currentIndex: Ref<number>
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

  const audioPlayer = ref<HTMLAudioElement | null>(null);
  const volume = useLocalStorage("epic-tracks-volume", 0.75);
  const isPlaying = ref(false);

  const formattedTime = ref({
    current: "0:00",
    total: "0:00",
  });

  const activePlaylist = computed(() => {
    return shuffle.value ? shuffledSongs.value : allSongs.value;
  });

  watch(volume, (newVolume) => {
    if (audioPlayer.value) {
      audioPlayer.value.volume = newVolume;
    }
  });

  async function loadAndPlay() {
    if (!audioPlayer.value) return;

    try {
      await nextTick();
      await audioPlayer.value.play();
      isPlaying.value = true;
    } catch (err) {
      console.warn("Playback failed: ", err);
      isPlaying.value = false;
    }
  }

  function handlePlay() {
    if (!audioPlayer.value) return;
    if (!audioPlayer.value.paused) return;

    loadAndPlay();
  }

  function handlePause() {
    isPlaying.value = false;
    audioPlayer.value?.pause();
  }

  function handleStop() {
    isPlaying.value = false;
    audioPlayer.value?.pause();
    if (audioPlayer.value) {
      audioPlayer.value.currentTime = 0;
    }
  }

  function updateTime() {
    if (!audioPlayer.value) return;
    const player = audioPlayer.value;
    formattedTime.value.current = formatTime(player.currentTime);
    formattedTime.value.total = isNaN(player.duration)
      ? "0:00"
      : formatTime(player.duration);
  }

  function handleEnded() {
    handleNext();
  }

  async function handleNext() {
    const wasPlaying = isPlaying.value;
    const nextIndex = (currentIndex.value + 1) % activePlaylist.value.length;
    currentIndex.value = nextIndex;
    selectedSong.value = activePlaylist.value[nextIndex];

    if (wasPlaying) {
      await nextTick();
      loadAndPlay();
    }
  }

  async function handlePrev() {
    const wasPlaying = isPlaying.value;
    const prevIndex =
      (currentIndex.value - 1 + activePlaylist.value.length) %
      activePlaylist.value.length;
    currentIndex.value = prevIndex;
    selectedSong.value = activePlaylist.value[prevIndex];

    if (wasPlaying) {
      await nextTick();
      loadAndPlay();
    }
  }

  /**
   * Format a length into a human-friendly format
   *
   * @param {number} time - The length in seconds
   * @returns {string} - The formatted time
   */
  function formatTime(time: number): string {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  }

  watch(selectedSong, async (newSong, oldSong) => {
    if (!audioPlayer.value || !newSong || newSong === oldSong) return;

    currentIndex.value = activePlaylist.value.indexOf(newSong);
    currentSrc.value = newSong;
    currentMime.value = newSong.endsWith(".mp3") ? "audio/mpeg" : "audio/flac";

    audioPlayer.value.pause();
    audioPlayer.value.load();

    if (isPlaying.value) {
      await nextTick();
      loadAndPlay();
    }
  });

  return {
    audioPlayer,
    volume,
    isPlaying,
    formattedTime,
    allSongs,
    handlePlay,
    handlePause,
    handleStop,
    updateTime,
    handleEnded,
    handleNext,
    handlePrev,
  };
}
