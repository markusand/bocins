<template>
  <div class="carousel">
    <div ref="wrapper" class="carousel__wrapper" @scrollend="updateActive">
      <div v-for="item, i in props.items" :key="i" class="carousel__slide">
        <slot :item />
      </div>
    </div>
    <slot v-if="props.controls" name="controls" :active="active" :goto="goto">
      <ul :class="['controls', `controls--${props.controls}`]">
        <li v-for="item, i in props.items" :key="i">
          <slot
            name="control"
            :item
            :current="i"
            :active="active"
            :goto="() => goto(i)">
            <button
              type="button"
              :class="{ active: isActive(i) }"
              @click.prevent="goto(i)" />
          </slot>
        </li>
      </ul>
    </slot>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref, watch, onUnmounted } from 'vue';
import type { MaybeReadonly } from '/@/types';

export type CarouselProps<T> = {
  items: MaybeReadonly<T[]>;
  controls?: 'top' | 'bottom' | 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  interval?: number;
};

const props = defineProps<CarouselProps<T>>();

defineSlots<{
  default: (props: { item: T }) => void;
  controls: (props: { active: number, goto: (i: number) => void }) => void;
  control: (props: { item: T, current: number, active: number, goto: () => void }) => void;
}>();

const active = defineModel<number>({ default: 0 });

const wrapper = ref<HTMLDivElement>();
const isActive = (i: number) => i === active.value;

const goto = (i: number) => { active.value = i; };

const updateActive = () => {
  const { scrollLeft = 0, offsetWidth = 1 } = wrapper.value || {};
  active.value = Math.floor(scrollLeft / offsetWidth);
};

watch(active, i => {
  const { scrollX, scrollY } = window;
  const index = i % props.items.length;
  wrapper.value?.children[index]?.scrollIntoView({ behavior: 'smooth' });
  window.scroll(scrollX, scrollY);
});

const running = ref<ReturnType<typeof setInterval>>();

watch(() => props.interval, interval => {
  clearInterval(running.value);
  if (!interval) return;
  running.value = setInterval(() => {
    active.value = (active.value + 1) % props.items.length;
  }, interval * 1000);
}, { immediate: true });

onUnmounted(() => clearInterval(running.value));
</script>

<style lang="scss" scoped>
.carousel {
  position: relative;
  
  &__wrapper {
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: auto hidden;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar { display: none;}
  }

  &__slide {
    scroll-snap-align: center;
    flex: 0 0 100%;
    position: relative;
  }

  .controls {
    position: absolute;
    list-style: none;
    padding: 0.75rem 1rem;
    margin: 0;
    display: flex;
    gap: 0.5rem;

    &--top-left { top: 0; }
    &--bottom-left { bottom: 0; }

    &--bottom {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    &--bottom-right {
      bottom: 0;
      right: 0;
    }

    &--top-right {
      top: 0;
      right: 0;
    }

    &--top {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    button {
      all: unset;
      background: var(--control-color, #fff);
      height: var(--control-size, 0.5rem);
      aspect-ratio: 1;
      border-radius: 50%;
      display: block;
      cursor: pointer;
      transition: all 0.3s ease;
      opacity: 0.75;

      &:hover { transform: scale(1.25); }

      &.active {
        transform: scale(1.55);
        opacity: 1;
        cursor: unset;
      }
    }
  }
}
</style>
