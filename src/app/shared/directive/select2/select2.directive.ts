import { Directive, OnInit, Input, ElementRef, Optional, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgControl } from '@angular/forms';

declare var jQuery: any;

enum EventType {
    Change = 'change',
    Blur = 'blur'
}

@Directive({
    selector: '[appSelect2]'
})
export class Select2Directive implements OnInit {

    @Input()
    search = false;

    @Input()
    multiple: boolean;

    @HostListener('ngModelChange') onChange($event) {
        this.updateSelect2();
    }

    constructor(private translateService: TranslateService,
                private elementRef: ElementRef,
                @Optional()
                private control: NgControl) { }

    ngOnInit(): void {
        this.translateService.onLangChange.subscribe(lang => {
            this.updateSelect2();
        });

        this.updateSelect2();
        if (this.control) {
            this.control.control.valueChanges.subscribe(value => {
                this.updateSelect2();
            });
        }
    }

    protected updateSelect2() {
        this.translateService.get('system.select-item').subscribe((result: string) => {
            !this.multiple ? this.updateSingleSelect(result) : this.updateMultiSelect(result);
        });
    }

    protected updateSingleSelect(placeholder: string): void {
        jQuery(this.elementRef.nativeElement).select2({
            minimumResultsForSearch: !this.search ? -1 : Infinity,
            placeholder: placeholder
        });

        jQuery(this.elementRef.nativeElement).on('select2:select', (evt) => {
            this.emitEvent(EventType.Change);
        });

        jQuery(this.elementRef.nativeElement).on('select2:close', (evt) => {
            this.emitEvent(EventType.Blur);
        });
    }

    protected updateMultiSelect(placeholder: string): void {
        setTimeout(() => {
            jQuery(this.elementRef.nativeElement).multiselect({
                onChange: (option, checked, select) => {
                    this.emitEvent(EventType.Change);
                },
                onDropdownHide: (event) => {
                    this.emitEvent(EventType.Blur);
                }
            });
            jQuery(this.elementRef.nativeElement).multiselect('refresh');
        }, 1);
    }

    protected emitEvent(eventType: EventType, target: any = this.elementRef.nativeElement): void {
        const newEvent = document.createEvent('HTMLEvents');
        newEvent.initEvent(eventType, false, true);
        target.dispatchEvent(newEvent);
    }

}
