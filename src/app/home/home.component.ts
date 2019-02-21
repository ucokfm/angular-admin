import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDrawer } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  drawerMode = 'side';
  drawerOpened = true;
  title = 'Credit Scoring';
  watcher: Subscription;

  @ViewChild('drawer')
  drawer: MatDrawer;

  constructor(private mediaObserver: MediaObserver, private router: Router) {
    this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
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
