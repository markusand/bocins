<template>
  <main id="layout" :class="{ dark }">
    <h2>Vue UI components</h2>
    <p class="switcher">
      <Toggler v-model="dark" switch>Dark mode</Toggler>
    </p>
    <Collapser open>
      <template #title>Buttons</template>
      <Buttons />
    </Collapser>
    <Collapser v-model:open="accordion">
      <template #title>Forms</template>
      <Forms />
    </Collapser>
    <Collapser v-model:open="accordion">
      <template #title>Lists</template>
      <Lists />
    </Collapser>
    <Collapser v-model:open="accordion" main>
      <template #title>Modals</template>
      <Modals />
    </Collapser>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Collapser, Toggler } from './components';
import Buttons from './views/Buttons.vue';
import Forms from './views/forms/Forms.vue';
import Lists from './views/Lists.vue';
import Modals from './views/Modals.vue';

const accordion = ref(false);
const dark = ref(false);
</script>

<style lang="scss">
@import "https://fonts.googleapis.com/css2?family=Rubik:wght@300;400&display=swap";

:root {
  font-size: 15px;

  --color-primary: #39f;
  --color-alert: #cd574c;
  --color-text: #20262e;
  --color-bg: #fff;
  --border: 1px solid #8888;
  --input-border: var(--border);
  --border-radius: 4px;
  --input-border-radius: var(--border-radius);
  --modal-border-radius: var(--border-radius);
}

* {
  margin: 0;
  padding: 0;
}

#app {
  color: #20262e; // #596b76
  font: 1rem / 1 Rubik, sans-serif;
  height: 100vh;
  overflow: auto;
  transition: background 0.3s ease;
}

#layout { min-height: 100vh; }

.dark {
  --color-bg: #23242e;

  background: var(--color-bg);
  color: #ddd;
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

p { margin: 1rem 0; }

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

.chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.section {
  margin: 1.5rem 1rem;
}

.b-modal__footer {
  padding: 0.5rem;
  border-top: 1px solid #8882;
  background: #8881;
  text-align: right;
}

.switcher {
  margin: 1rem;
  text-align: right;
}
</style>
