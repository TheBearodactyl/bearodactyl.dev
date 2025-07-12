import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { useDomEffects } from "@/composables/useDomEffects";
import { getItem, setItem } from "#imports";

const CLASSES_TO_TARGET = [
  "epic-tracks-player",
  "dance",
  "player-controls",
  "volume-control",
  "time-display",
  "track-switcher",
  "options-bar",
];

const ELEMENT_IDS_TO_TARGET = [
  "dance-gif",
  "audio-player",
  "play-btn",
  "pause-btn",
  "stop-btn",
  "volume",
  "e",
  "p",
  "i",
  "cspace",
  "t",
  "r",
  "a",
  "c",
  "k",
  "s",
  "spaceone",
  "spacetwo",
  "spacethree",
  "spacefour",
  "volume",
  "volume-label",
  "current-time",
  "duration",
  "prev",
  "next",
  "song-picker",
  "shuffle-toggle",
  "theme-toggle",
];

interface EffectHandle {
  stop: () => void;
}

const EXTENDED_FONTS = [
  "Papyrus",
  "Comic Sans",
  "Brush Script MT",
  "Arial",
  "Arial Black",
  "Arial Narrow",
  "Arial Rounded MT Bold",
  "Avante Garde",
  "Calibri",
  "Candara",
  "Century Gothic",
  "Franklin Gothic Medium",
  "Futura",
  "Geneva",
  "Gill Sans",
  "Helvetica",
  "Impact",
  "Lucida Grande",
  "Optima",
  "Segoe UI",
  "Tahoma",
  "Trebuchet MS",
  "Verdana",
  "Big Caslon",
  "Bodoni MT",
  "Book Antiqua",
  "Calisto MT",
  "Cambria",
  "Didot",
  "Garamond",
  "Georgia",
  "Goudy Old Style",
  "Hoefler Text",
  "Lucida Bright",
  "Palatino",
  "Perpetua",
  "Rockwell",
  "Rockwell Extra Bold",
  "Baskerville",
  "Times New Roman",
  "Consolas",
  "Courier New",
  "Lucida Console",
  "Lucida Sans Typewriter",
  "Monaco",
  "Andale Mono",
  "Copperplate",
];

export function useVisualEffects() {
  const { randomFontForId, randomFontForClass, colorCycler, wokeMindVirus } =
    useDomEffects();

  const shuffle = ref(JSON.parse(getItem("shuffle") || "false"));
  const fontEffects = ref(
    JSON.parse(getItem("font_effects") || "true")
  );
  const colorEffects = ref(
    JSON.parse(getItem("color_effects") || "true")
  );

  const fontEffectHandles = ref<EffectHandle[]>([]);
  const colorEffectHandles = ref<EffectHandle[]>([]);

  const labels = computed(() => ({
    shuffle: shuffle.value ? "On" : "Off",
    fontEffects: fontEffects.value ? "On" : "Off",
    colorEffects: colorEffects.value ? "On" : "Off",
  }));

  const applyFontEffects = () => {
    stopFontEffects();
    fontEffectHandles.value = [
      ...CLASSES_TO_TARGET.map((cls) =>
        randomFontForClass(cls, 0.4, EXTENDED_FONTS)
      ),
      ...ELEMENT_IDS_TO_TARGET.map((id) =>
        randomFontForId(id, 0.5, EXTENDED_FONTS)
      ),
    ];
  };

  const stopFontEffects = () => {
    fontEffectHandles.value.forEach((h) => h.stop());
    fontEffectHandles.value = [];
  };

  const applyColorEffects = () => {
    stopColorEffects();
    colorEffectHandles.value = ELEMENT_IDS_TO_TARGET.map((id) =>
      colorCycler(id, 500)
    );
    wokeMindVirus("dance-gif", 500, 1);
  };

  const stopColorEffects = () => {
    colorEffectHandles.value.forEach((h) => h.stop());
    colorEffectHandles.value = [];
    wokeMindVirus("dance-gif", 0, 0);
  };

  const toggleShuffle = () => {
    shuffle.value = !shuffle.value;
    setItem("shuffle", JSON.stringify(shuffle.value));
  };

  const toggleFontEffects = () => {
    fontEffects.value = !fontEffects.value;
    setItem("font_effects", JSON.stringify(fontEffects.value));
    if (fontEffects.value) applyFontEffects();
    else stopFontEffects();
  };

  const toggleColorEffects = () => {
    colorEffects.value = !colorEffects.value;
    setItem("color_effects", JSON.stringify(colorEffects.value));
    if (colorEffects.value) applyColorEffects();
    else stopColorEffects();
  };

  onMounted(() => {
    if (fontEffects.value) applyFontEffects();
    if (colorEffects.value) applyColorEffects();

    window.addEventListener("storage", syncWithLocalStorage);
  });

  onUnmounted(() => {
    stopFontEffects();
    stopColorEffects();
  });

  const syncWithLocalStorage = (event: StorageEvent) => {
    if (event.key === "shuffle") {
      shuffle.value = JSON.parse(event.newValue || "false");
    }
    if (event.key === "font_effects") {
      const newValue = JSON.parse(event.newValue || "true");
      if (fontEffects.value !== newValue) {
        fontEffects.value = newValue;
        if (fontEffects.value) applyFontEffects();
        else stopFontEffects();
      }
    }
    if (event.key === "color_effects") {
      const newValue = JSON.parse(event.newValue || "true");
      if (colorEffects.value !== newValue) {
        colorEffects.value = newValue;
        if (colorEffects.value) applyColorEffects();
        else stopColorEffects();
      }
    }
  };

  return {
    shuffle,
    fontEffects,
    colorEffects,
    labels,
    toggleShuffle,
    toggleFontEffects,
    toggleColorEffects,
    stopAllEffects: () => {
      stopFontEffects();
      stopColorEffects();
    },
  };
}
