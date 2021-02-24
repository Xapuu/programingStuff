import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { iconsConfig } from '../icons';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  // tslint:disable-next-line:variable-name
  private _svgIconConfigs = new Map<string, string>();
  // tslint:disable-next-line:variable-name
  private _svgs = new Map<string, Observable<any>>();

  constructor(
    private httpClient: HttpClient
  ) { }

  init(): void {
    iconsConfig.forEach(icon => {
      this.addIcon(icon.name, icon.url);
    });
  }

  addIcon(iconName: string, iconPath: string): void {
    this._svgIconConfigs.set(iconName, iconPath);
  }

  getIcon(iconName: string): Observable<string> {
    const configUrl = this._svgIconConfigs.get(iconName) as string;
    const cachedSvg = this._svgs.get(iconName);

    if (cachedSvg) {
      return cachedSvg;
    }

    const req = this.httpClient.get(configUrl, { responseType: 'text' }).pipe(
      share()
    );

    this._svgs.set(iconName, req);
    return req;
  }
}
