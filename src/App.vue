<template>
  <h2>Vue UI components</h2>
  <Collapser open>
    <template #title>Buttons</template>
    <Buttons />
  </Collapser>
  <Collapser v-model:accordion="accordion">
    <template #title>Forms</template>
    <Forms />
  </Collapser>
  <Collapser v-model:accordion="accordion">
    <template #title>Lists</template>
    <Lists />
  </Collapser>
  <Collapser v-model:accordion="accordion" main>
    <template #title>Modals</template>
    <Modals />
  </Collapser>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Collapser } from './components';
import Buttons from './views/Buttons.vue';
import Forms from './views/forms/Forms.vue';
import Lists from './views/Lists.vue';
import Modals from './views/Modals.vue';

const accordion = ref('buttons');
</script>

<style lang="scss">
@import "https://fonts.googleapis.com/css2?family=Rubik:wght@300;400&display=swap";

:root {
  font-size: 15px;

  --color-primary: #39f;
  --color-alert: #cd574c;
  --color-text: #20262e;
  --color-border: #d0d0d0;
  --border-radius: 4px;
  --input-border: 1px solid var(--color-border);
  --input-border-radius: var(--border-radius);
  --dropzone-background: #8881;
  --modal-border-radius: var(--border-radius);
}

#app {
  color: #20262e; // #596b76
  font: 1rem / 1 Rubik, sans-serif;
}

.calendar {
  line-height: 1;
  padding: 0.25rem;

  &__header {
    margin: 0.5rem 0.75rem 0.75rem;
  }

  &__weekday {
    opacity: 0.4;
    margin: 0 0 0.25rem;
    text-transform: uppercase;
    font-size: 0.5rem;
  }

  &__day {
    padding: 0.35rem;

    &--today { color: var(--color-primary); }
    &--outsider { color: #aaa; }

    &--selected {
      background: var(--color-primary);
      color: #fff;
      border-radius: 4px;
    }

    &--disabled {
      background: #d0d0d3;
      opacity: 0.25;
    }
  }
}

h3 {
  font-size: 1rem;
  font-weight: bold;
  margin: 0.5rem 0;

  em {
    all: unset;
    display: block;
    opacity: 0.5;
    font-size: 0.875em;
    line-height: 1;
    margin-top: 0.25em;
    font-weight: normal;
  }
}

.columns { display: flex; }

fieldset { all: unset; }

.label {
  all: unset;
  display: inline-block;
  margin: 0.5rem;
  vertical-align: top;
  box-sizing: border-box;

  legend,
  em {
    all: unset;
    display: flex;
    font-size: 0.85rem;
    margin: 0.125rem 0.25rem;
    opacity: 0.75;

    .right { margin-left: auto; }
  }

  &.block { display: block; }
}

.stack {
  display: inline-flex;
  flex-direction: column;
}

.chip {
  font-size: 0.75em;
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  background: #0002;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 0 0 auto;
}

.chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.section {
  margin: 1.5rem 1rem;
}

.modal {
  background: #fff;
  color: var(--color-text);
  max-width: 90%;
  max-height: 80%;
  box-shadow: 0 2px 12px 0 #0002;

  &__close {
    all: unset;
    padding: 0.125rem;
    margin: 0.25rem 0.5rem;
    font-size: 1.25rem;
    cursor: pointer;
    opacity: 0.5;

    &:hover { opacity: 1; }
  }

  &__footer {
    padding: 0.5rem;
    border-top: 1px solid var(--color-border);
    background: #f8f8f8;
    text-align: right;
  }
}
</style>
