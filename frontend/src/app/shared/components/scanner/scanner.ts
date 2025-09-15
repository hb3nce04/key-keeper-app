import {Component, inject, output} from '@angular/core';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {BarcodeFormat} from '@zxing/library';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-scanner',
  imports: [ZXingScannerModule],
  templateUrl: 'scanner.html',
})
export class Scanner {
  protected readonly BarcodeFormat = BarcodeFormat;

  private message: NzMessageService = inject(NzMessageService);
  readValue = output<string>();

  hasDevices = false;
  availableDevices: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | undefined;

  onPermission(hasPermission: boolean) {
    if (!hasPermission) {
      this.message.error("QR-kód olvasó kamera engedélye megtagadva!")
    }
  }

  onDeviceSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const deviceId = target.value;
    const device = this.availableDevices.find(d => d.deviceId === deviceId);
    if (device) this.selectedDevice = device;
  }

  onHasDevices(hasDevices: boolean) {
    this.hasDevices = hasDevices;
  }

  onError(error: any) {
    console.error(error);
  }

  onDevicesFound(devices: MediaDeviceInfo[]) {
    this.availableDevices = devices;
    if (devices.length > 0) {
      this.selectedDevice = devices[0] || devices[1];
      this.hasDevices = true;
    } else {
      this.hasDevices = false;
    }
  }

  onCodeResult(result: string) {
    this.readValue.emit(result);
  }
}
