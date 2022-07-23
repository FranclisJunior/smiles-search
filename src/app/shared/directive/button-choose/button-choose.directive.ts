import { Directive, OnInit, ElementRef, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

declare var jQuery: any;

@Directive({
    selector: '[appButtonChoose]'
})
export class ButtonChooseDirective implements OnInit {

    constructor(private elementRef: ElementRef,
        @Optional()
        private control: NgControl) { }

    ngOnInit(): void {
        this.initButtons();
        if (this.control) {
            this.control.control.valueChanges.subscribe(value => {
                this.initButtons();
            });
        }
    }

    protected initButtons(): void {
        jQuery(this.elementRef.nativeElement).uniform();
    }

}
