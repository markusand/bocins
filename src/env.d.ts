/// <reference types="vite/client" />

interface NavigatorUAData {
  platform: string;
}

interface Navigator {
  userAgentData?: NavigatorUAData;
}
