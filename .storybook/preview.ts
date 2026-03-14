import type { Preview } from "@storybook/vue3-vite";
import { config } from '../src/config';

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

// Reset config before each story to avoid conflicts
export const decorators = [
  (story: any) => {
    // Always reset to default before rendering any story
    config.iconPath = '/icons';
    return story();
  },
];

export default preview;
