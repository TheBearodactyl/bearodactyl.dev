import { onUnmounted } from "vue";

export type EffectHandle = { stop: () => void };

function generateRandomColor(): string {
  const letters = "0123456789ABCDEF";
  return (
    "#" +
    Array.from(
      { length: 6 },
      () => letters[Math.floor(Math.random() * 16)]
    ).join("")
  );
}

export function useDomEffects() {
  const activeEffects: EffectHandle[] = [];

  function randomFontForId(
    id: string,
    intervalSec: number,
    fonts: string[]
  ): EffectHandle {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element with id "${id}" not found`);
      return { stop: () => {} };
    }

    const updateFont = () => {
      const font = fonts[Math.floor(Math.random() * fonts.length)];
      element.style.fontFamily = font;
    };

    updateFont();
    const intervalId = setInterval(updateFont, intervalSec * 1000);

    const handle: EffectHandle = {
      stop: () => clearInterval(intervalId),
    };

    activeEffects.push(handle);
    return handle;
  }

  function randomFontForClass(
    cls: string,
    intervalSec: number,
    fonts: string[]
  ): EffectHandle {
    const elements = document.getElementsByClassName(
      cls
    ) as HTMLCollectionOf<HTMLElement>;
    if (!elements.length) {
      console.warn(`No elements with class "${cls}" found`);
      return { stop: () => {} };
    }

    const updateFont = () => {
      const font = fonts[Math.floor(Math.random() * fonts.length)];
      Array.from(elements).forEach((el) => {
        el.style.fontFamily = font;
      });
    };

    updateFont();
    const intervalId = setInterval(updateFont, intervalSec * 1000);

    const handle: EffectHandle = {
      stop: () => clearInterval(intervalId),
    };

    activeEffects.push(handle);
    return handle;
  }

  function colorCycler(id: string, intervalMs = 300): EffectHandle {
    const el = document.getElementById(id);
    if (!el) {
      console.warn(`Element with id "${id}" not found`);
      return { stop: () => {} };
    }

    const updateColors = () => {
      el.style.backgroundColor = generateRandomColor();
      el.style.color = generateRandomColor();
    };

    updateColors();
    const intervalId = setInterval(updateColors, intervalMs);

    const handle: EffectHandle = {
      stop: () => clearInterval(intervalId),
    };

    activeEffects.push(handle);
    return handle;
  }

  function wokeMindVirus(
    id: string,
    speedMs = 10,
    intensity = 5
  ): EffectHandle {
    const img = document.getElementById(id) as HTMLElement | null;
    if (!img) {
      console.warn(`No image with id "${id}" found`);
      return { stop: () => {} };
    }

    const originalFilter = img.style.filter;
    let hue = 0;
    const intervalId = setInterval(() => {
      hue = (hue + 1) % 360;
      img.style.filter = `hue-rotate(${hue * intensity}deg) saturate(1.2)`;
    }, speedMs);

    const handle: EffectHandle = {
      stop: () => {
        clearInterval(intervalId);
        img.style.filter = originalFilter;
      },
    };

    activeEffects.push(handle);
    return handle;
  }

  function cleanupAllEffects() {
    activeEffects.forEach((e) => e.stop());
    activeEffects.length = 0;
  }

  onUnmounted(() => cleanupAllEffects());

  return {
    randomFontForId,
    randomFontForClass,
    colorCycler,
    wokeMindVirus,
    stopAll: cleanupAllEffects,
  };
}
