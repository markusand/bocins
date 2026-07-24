/// <reference types="vite/client" />
/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom/vitest" />

interface NavigatorUAData {
  platform: string;
}

interface Navigator {
  userAgentData?: NavigatorUAData;
}
