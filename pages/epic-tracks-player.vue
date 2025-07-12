<template>
    <div class="epic-tracks-player">
        <EpicTracksHeader />

        <div class="epic-track-name-display">Now Playing: {{ nowPlayingText }}</div>

        <Danceline :gif-src="danceGifSrc" />

        <audio ref="audioPlayer" loop @timeupdate="updateTime" @ended="handleEnded">
            <source :src="currentSrc" :type="currentMime" />
            Your browser does not support the audio element.
        </audio>

        <PlayerControls @prev="handlePrev" @play="handlePlay" @pause="handlePause" @stop="handleStop"
            @next="handleNext" />

        <div class="volume-control">
            <label for="volume">Volume:</label>
            <input type="range" id="volume" v-model.number="volume" min="0" max="1" step="0.01" />
        </div>

        <OptionsBar @shuffle="toggleShuffle" @font-effects="toggleFontEffects" @color-effects="toggleColorEffects"
            @all-effects="" />

        <div class="time-display">
            <span>{{ formattedTime.current }}</span> / <span>{{ formattedTime.total }}</span>
        </div>

        <select v-model="currentTrack" @change="handleSongChange" class="track-selector">
            <option v-for="(song, index) in getActivePlaylist" :key="index" :value="song">
                {{ getFileName(song) }}
            </option>
            <option v-if="getActivePlaylist().length === 0" disabled>No tracks available</option>
        </select>

        <div id="custom-song-drop" class="drop-area" @drop.prevent="handleDrop" @dragover.prevent>
            Drag and Drop any audio files here!
        </div>

        <div class="bottom">
            <div id="death-to-america"
                style="cursor: pointer; display: block; size: 100%; scale: 100%; position: relative; padding-bottom: 75px;"
                @click="playSound" @contextmenu.prevent="stopSound">
                <img src="/images/deathtoamerica.gif" id="gif-button" />
            </div>
            <audio ref="dtaAudio"
                src="https://www.myinstants.com/media/sounds/my-mommy-said-no-more-skibidi-toilet.mp3"></audio>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import PlayerControls from '~/components/PlayerControls.vue';
import OptionsBar from '~/components/OptionsBar.vue';
import Danceline from '~/components/Danceline.vue';
import { EpicTracksHeader } from '#components';

const nowPlaying = ref('Now Playing: `void`');
const dtaAudio = ref<HTMLAudioElement | null>(null);
const currentSrc = ref('/audio/music/epic_music001.mp3');
const currentMime = ref('audio/mp3');
const currentIndex = ref(0);
const shuffledSongs = ref<string[]>([])

const {
    shuffle,
    fontEffects,
    colorEffects,
    toggleShuffle,
    toggleFontEffects,
    toggleColorEffects,
} = useVisualEffects();


const {
    selectedSong
} = useTrackManagement(shuffle)

const {
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
    handlePrev
} = useAudioPlayer(
    currentSrc,
    currentMime,
    selectedSong,
    shuffledSongs,
    shuffle,
    currentIndex
)

const currentTrack = computed({
    get: () => allSongs.value[currentIndex.value],
    set: (newTrack) => {
        const index = allSongs.value.indexOf(newTrack)
        if (index !== -1) {
            currentIndex.value = index
        }
    }
});

const handleSongChange = () => {
    if (isPlaying.value) {
        if (currentSrc.value !== currentTrack.value) {
            currentSrc.value = currentTrack.value
            audioPlayer.value?.load()
            audioPlayer.value?.play()
        }
    } else {
        currentSrc.value = currentTrack.value
        audioPlayer.value?.load()
    }
}

const customSongs = useLocalStorage<string[]>('custom_songs', []);
const danceGifSrc = ref('/images/brocollie.png');

const getActivePlaylist = () => shuffle.value ? shuffledSongs.value : allSongs.value;

const nowPlayingText = computed(() => {
    if (isPlaying.value) {
        return getFileName(selectedSong.value)
    } else {
        return "Paused"
    }
});

watch(volume, (val) => {
    if (audioPlayer.value) audioPlayer.value.volume = val;
});

watch(currentTrack, (newTrack) => {
    currentSrc.value = newTrack
    currentMime.value = newTrack.endsWith('.mp3') ? 'audio/mpeg' : 'audio/flac'
    nowPlaying.value = `🎶 Now Playing: ${getFileName(newTrack)}`

    if (audioPlayer.value) {
        audioPlayer.value.load()
        if (isPlaying.value) {
            audioPlayer.value.play().catch(err => {
                console.warn('Playback failed:', err)
                isPlaying.value = false
            })
        }
    }
})

onMounted(() => {
    allSongs.value.push(...customSongs.value);
    if (audioPlayer.value) audioPlayer.value.volume = volume.value;
});

function handleDrop(event: DragEvent) {
    const file = event.dataTransfer?.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    allSongs.value.push(url);
    customSongs.value.push(url);
    selectedSong.value = url;
    handlePlay();
}

function playSound() {
    if (!dtaAudio.value) return;
    dtaAudio.value.currentTime = 0;
    dtaAudio.value.play();
}

function stopSound() {
    if (!dtaAudio.value) return;
    dtaAudio.value.pause();
    dtaAudio.value.currentTime = 0;
}

function getFileName(path: string): string {
    return decodeURIComponent(path ?? 'Unknown');
}

watch(fontEffects, (val) => {
    toggleFontEffects()
})

watch(colorEffects, (val) => {
    toggleColorEffects()
})

watch(selectedSong, async (val) => {
    if (!audioPlayer.value || !val) return

    const playlist = getActivePlaylist()
    currentIndex.value = playlist.indexOf(val)

    currentSrc.value = val
    currentMime.value = val.endsWith('.mp3') ? 'audio/mpeg' : 'audio/flac'
    nowPlaying.value = `🎶 Now Playing: ${getFileName(val)}`

    audioPlayer.value.pause()
    audioPlayer.value.load()

    await nextTick()

    if (isPlaying.value) {
        try {
            await audioPlayer.value.play()
        } catch (err) {
            console.warn('Autoplay failed:', err)
        }
    }
})

watch(shuffle, (enabled) => {
    if (enabled) {
        shuffledSongs.value = [...allSongs.value].sort(() => Math.random() - 0.5)
        const newIndex = shuffledSongs.value.indexOf(selectedSong.value)
        currentIndex.value = newIndex >= 0 ? newIndex : 0
    } else {
        const newIndex = allSongs.value.indexOf(selectedSong.value)
        currentIndex.value = newIndex >= 0 ? newIndex : 0
    }

})
</script>

<style>
@import url("~/assets/css/main.css");
</style>