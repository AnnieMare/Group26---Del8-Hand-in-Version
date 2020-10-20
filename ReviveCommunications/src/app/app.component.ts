import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbMenuItem, NbSidebarService, NbToastrService, NbDialogService, NbComponentStatus, NbIconConfig, NbThemeService } from '@nebular/theme';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ReviveCommunications';

  private destroy$: Subject<void> = new Subject<void>();
  constructor(
    private sidebarService: NbSidebarService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private themeService: NbThemeService

  ) { }

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },

  ];

  currentTheme = 'cosmic';
  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.themeService.onThemeChange()
    .pipe(
      map(({ name }) => name),
      takeUntil(this.destroy$),
    )
    .subscribe(themeName => this.currentTheme = themeName);
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onChange(){
  this.themeService.onThemeChange()
  .subscribe((theme: any) => {
    console.log(`Theme changed to ${theme.name}`);
  });}

}
