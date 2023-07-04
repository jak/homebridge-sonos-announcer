export interface Config {
  switches: SwitchConfig[];
}

export interface SwitchConfig {
  switchName: string;
  deviceName: string;
  trackUri: string;
  timeout: number;
  volume: number;
  delayMs: number;
}
