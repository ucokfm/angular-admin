import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MatDrawer } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  drawerMode = 'side';
  drawerOpened = true;
  title = 'Angular Admin';
  watcher: Subscription;

  @ViewChild('drawer')
  drawer: MatDrawer;

  constructor(private media: ObservableMedia, private router: Router) {
    this.watcher = media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.drawerMode = 'over';
        this.drawerOpened = false;
      } else if (change.mqAlias === 'sm') {
        this.drawerMode = 'side';
        this.drawerOpened = false;
      } else if (change.mqAlias === 'md') {
        this.drawerMode = 'side';
        this.drawerOpened = true;
      } else if (change.mqAlias === 'lg') {
        this.drawerMode = 'side';
        this.drawerOpened = true;
      }
    });
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  onSelectMenu(path: string) {
    if (this.drawerMode === 'over') {
      this.drawer.toggle();
    }
    this.router.navigate([path]);
  }
}
