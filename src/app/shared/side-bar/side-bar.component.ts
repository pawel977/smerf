import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NavBarService } from '../services/nav-bar.service';
import { BehaviorSubject } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements AfterViewInit {
  @ViewChild('drawer', { static: false }) public drawer!: MatDrawer;
  public categoryList = [
    {
      title: 'polej',
      link: '/we-polej',
    },
  ];
  constructor(private navBarService: NavBarService) {}
  public ngAfterViewInit(): void {
    this.initReferenceToSideNav();
  }
  private initReferenceToSideNav(): void {
    this.navBarService.matDrawer = this.drawer;
  }
}
