import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Partner } from 'src/app/shared/models/partner.model';
import { PartnersService } from 'src/app/shared/services/partners.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  partners: Partner[] = [];
  currentLang = 'ro';
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private translate: TranslateService,
    private partnersService: PartnersService) { }

  ngOnInit(): void {
    this.partnersService.listHomePartners(this.translate.currentLang).pipe(takeUntil(this.destroy$)).subscribe(partners => {
      this.partners = partners;
    });
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    });
    this.currentLang = this.translate.currentLang;
  }

}
