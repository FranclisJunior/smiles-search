import { Directive, OnInit, ElementRef, Input } from '@angular/core';

import { TranslateService} from '@ngx-translate/core';

declare var jQuery: any;

@Directive({
    selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit {

    @Input() tooltipValue: string;

    @Input() tooltipPlacement = 'top';

    constructor(private elementRef: ElementRef,
                private translateService: TranslateService) { }

    ngOnInit(): void {
        this.makeTooltipPlacement();
        this.initTooltip();
        this.translateService.onLangChange.subscribe(result => {
            this.initTooltip(true);
        });
    }

    protected initTooltip(isUpdate: boolean = false): void {
        jQuery(this.elementRef.nativeElement).click((evt) => {
            jQuery('.tooltip:last').remove();
        });
        const title = this.translateService.instant(this.tooltipValue);
        this.elementRef.nativeElement.setAttribute('title', title);
        if (isUpdate) {
            jQuery(this.elementRef.nativeElement).tooltip('dispose');
            jQuery(this.elementRef.nativeElement).tooltip();
            return;
        }
        jQuery(this.elementRef.nativeElement).tooltip();
    }

    protected makeTooltipPlacement(): void {
        this.elementRef.nativeElement.setAttribute('data-placement', this.tooltipPlacement);
    }

}
