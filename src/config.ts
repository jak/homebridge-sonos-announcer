export interface Config {
  switches: SwitchConfig[];
}

export interface SwitchConfig {
  switchName: string;
  deviceNames: string[];
  trackUri: string;
  timeout: number;
  volume: number;
  delayMs: number;
}
