import { Service, PlatformAccessory, CharacteristicValue } from "homebridge";
import { SonosAnnouncerPlatform } from "./platform";
import { SwitchConfig } from "./config";
import { SonosDevice } from "@svrooij/sonos/lib";

export class SonosAnnouncerSwitch {
  private service: Service;
  private switchOn = false;

  constructor(
    private readonly platform: SonosAnnouncerPlatform,
    private readonly accessory: PlatformAccessory<{
      switch: SwitchConfig;
    }>,
    private readonly sonosDevice: SonosDevice
  ) {
    // set accessory information
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.accessory
      .getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(
        this.platform.Characteristic.Manufacturer,
        "Sonos Announcer"
      )
      .setCharacteristic(
        this.platform.Characteristic.Model,
        `${this.accessory.context.switch.switchName} (${sonosDevice.Name})`
      );

    this.service =
      this.accessory.getService(this.platform.Service.Switch) ||
      this.accessory.addService(this.platform.Service.Switch);

    this.service.setCharacteristic(
      this.platform.Characteristic.Name,
      accessory.context.switch.switchName
    );

    this.service
      .getCharacteristic(this.platform.Characteristic.On)
      .onSet(this.setOn.bind(this)) // SET - bind to the `setOn` method below
      .onGet(this.getOn.bind(this)); // GET - bind to the `getOn` method below
  }

  async setOn(value: CharacteristicValue) {
    this.switchOn = value as boolean;

    this.platform.log.debug(`setOn`, {
      ...this.accessory.context.switch,
      switchOn: this.switchOn,
    });

    this.platform.log.info(
      "Switch state was set to: " + (this.switchOn ? "ON" : "OFF")
    );

    if (this.switchOn) {
      await this.sonosDevice.PlayNotification({
        trackUri: this.accessory.context.switch.trackUri,
        timeout: this.accessory.context.switch.timeout,
        volume: this.accessory.context.switch.volume,
        delayMs: this.accessory.context.switch.delayMs,
        notificationFired: (played: boolean) => {
          this.platform.log.info(
            `${this.accessory.context.switch.switchName} completed.`
          );
          this.platform.log.debug(`played? ${played}`);
          this.setOn(false);
        },
      });
    }
  }
  async getOn(): Promise<CharacteristicValue> {
    this.platform.log.debug(`getOn`, {
      ...this.accessory.context.switch,
      switchOn: this.switchOn,
    });
    return this.switchOn;
  }
}
