import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  languages = [
    { code: 'en', label: 'English' },
    { code: 'ro', label: 'Romana' },
    { code: 'fr', label: 'Francais' }
  ];
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('ro');
    this.translate.use('ro');
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit() {}

}