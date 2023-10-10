import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Partner } from "../models/partner.model";

@Injectable()
export class PartnersService {
  pertnersURL = `${environment.apiBase}partners`;

  constructor(private http: HttpClient) {}
  
  createPartner(partner: Partner) {
    return this.http.post<Partner>(this.pertnersURL, partner);
  }

  listPartners(lang: string) {
    return this.http.get<Partner[]>(`${ this.pertnersURL }?lang=${ lang }`);
  }

  listHomePartners(lang: string) {
    return this.http.get<Partner[]>(`${this.pertnersURL}/home?lang=${ lang }`);
  }
}