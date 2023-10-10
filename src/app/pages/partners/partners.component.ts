import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { Partner } from 'src/app/shared/models/partner.model';
import { PartnersService } from 'src/app/shared/services/partners.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {
  partners: Partner[] = [];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private partnersService: PartnersService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.partnersService.listPartners(this.translate.currentLang).pipe(takeUntil(this.destroy$)).subscribe(partners => {
      this.partners = partners;
    });
  }

}
