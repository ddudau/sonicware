import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import packageJson from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public version: string = packageJson.version;
  languages = [
    { code: 'en', label: 'English' },
    { code: 'ro', label: 'Română' },
    { code: 'fr', label: 'Francais' }
  ];
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    this.translate.use('en');
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit() { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    if (window.pageYOffset > 30) {
      let element = document.getElementById('navbar');
      if (element) {
        element.classList.add('sticky');
      }
    } else {
      let element = document.getElementById('navbar');
      if (element) {
        element.classList.remove('sticky');
      }
    }
  }
}