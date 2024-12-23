<template>
  <div :style="computedStyles">
    {{ text }}
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: 'Default Text',
  },
  fontSize: {
    type: String,
    default: '16px',
  },
  color: {
    type: String,
    default: '#000',
  },
  fontWeight: {
    type: String,
    default: 'normal',
  },
  textAlign: {
    type: String,
    default: 'left',
  },
  margin: {
    type: String,
    default: '0',
  },
  padding: {
    type: String,
    default: '0',
  },
});

// Computed styles
const computedStyles = computed(() => ({
  fontSize: props.fontSize,
  color: props.color,
  fontWeight: props.fontWeight,
  textAlign: props.textAlign,
  margin: props.margin,
  padding: props.padding,
}));
</script>