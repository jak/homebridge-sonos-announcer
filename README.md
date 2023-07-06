[![GitHub last commit](https://img.shields.io/github/last-commit/jak/homebridge-sonos-announcer.svg)](https://github.com/jak/homebridge-sonos-announcer)
[![npm](https://img.shields.io/npm/v/@jakspalding/homebridge-sonos-announcer?label=npm%20package)](https://github.com/jak/homebridge-sonos-announcer)
[![npm](https://img.shields.io/npm/dt/@jakspalding/homebridge-sonos-announcer.svg)](https://www.npmjs.com/package/@jakspalding/homebridge-sonos-announcer)

# Homebridge Sonos Announcer

Play announcements across your Sonos speakers via Homekit.

Play any sound file on demand. The intended use is for information updates such as "Door is open" to be triggered via a Home automation.

## Features

- Set the desired volume
- Use any audio file URI supported by Sonos
- Switch will turn itself off once the audio has finished playing
- Play across multiple Sonos speakers
- Create multiple Switches with different settings

## Requirements

- [Homebridge](https://github.com/nfarina/homebridge) HomeKit support for the impatient
- Sonos speakers

## Instructions

### Installation

This plugin can easily be installed from Homebridge UI or `sudo npm install -g @jakspalding/homebridge-sonos-announcer`

### Config

This is a platform plugin and you should be able to edit the configuration via the UI.

#### Example config

```json
{
  "platforms": [
    {
      "platform": "SonosAnnouncer",
      "switches": [
        {
          "deviceNames": ["Living Room", "Kitchen Speaker"],
          "switchName": "Announce Living room door open ",
          "trackUri": "http://path/to/living-room-door-open.mp3",
          "timeout": 10,
          "volume": 45,
          "delayMs": 100
        }
      ]
    }
  ]
}
```
