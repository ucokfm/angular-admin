import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

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

  constructor(private media: ObservableMedia) {
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
}
