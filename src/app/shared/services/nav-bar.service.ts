import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  public matDrawer: MatDrawer | undefined;
  constructor() {}

  public toggleMatDrawer(): void {
    this.matDrawer?.toggle();
  }
}
