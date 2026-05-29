import type { Preview } from "@storybook/vue3-vite";
import { getCurrentInstance } from 'vue';
import { config } from '../src/config';

let _storyCount = 0;

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (_story: any) => ({
    setup() {
      // Give each story's Vue app a unique idPrefix so useId() doesn't
      // collide when multiple stories share the same page (docs view).
      const app = getCurrentInstance()?.appContext.app;
      if (app) app.config.idPrefix = `s${_storyCount++}`;
      // Always reset icon config to default before rendering any story.
      config.iconPath = 'https://raw.githubusercontent.com/lucide-icons/lucide/refs/heads/main/icons';
    },
    template: '<story />',
  }),
];

export default preview;
