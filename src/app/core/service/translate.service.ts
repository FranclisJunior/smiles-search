import { Injectable, OnInit } from '@angular/core';

import { TranslateService as NgxTranslateService } from '@ngx-translate/core';

@Injectable()
export class TranslateService implements OnInit {

  constructor(private translate: NgxTranslateService) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.setLang();
  }

  public setLang(lang: any = null): void {
    lang = lang ? lang : localStorage.getItem('lang');
    if (!lang) {
      lang = this.translate.getBrowserCultureLang().toLowerCase();
    }
    lang = ['en', 'pt-br'].includes(lang) ? lang : 'en';
    this.translate.use(lang);
    this.saveLang(lang);
  }

  public getLang() {
    const lang = localStorage.getItem('lang');
    if (lang) {
      return lang;
    }
    return this.translate.getBrowserLang();
  }

  protected saveLang(lang: any): void {
    localStorage.setItem('lang', String(lang));
  }

}
