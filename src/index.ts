import { PLATFORM_NAME } from "./settings";
import { SonosAnnouncerPlatform } from "./platform";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export = (homebridge: any) => {
  homebridge.registerPlatform(PLATFORM_NAME, SonosAnnouncerPlatform);
};
