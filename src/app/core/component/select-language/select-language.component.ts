import { Component, OnInit } from '@angular/core';

import { TranslateService } from '../../service/translate.service';

@Component({
    selector: 'app-select-language',
    templateUrl: './select-language.component.html',
    styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {

    protected readonly COUNTRIES_DOMAIN = {
        'pt-br': {
            img: 'assets/images/language/brazil.png',
            key: 'pt-br'
        },
        en: {
            img: 'assets/images/language/english.png',
            key: 'en'
        }
    };

    constructor(private translateService: TranslateService) { }

    ngOnInit(): void { }

    changeLanguage(lang: string): void {
        this.translateService.setLang(lang);
    }

    get language() {
        return this.COUNTRIES_DOMAIN[this.translateService.getLang()];
    }

}
