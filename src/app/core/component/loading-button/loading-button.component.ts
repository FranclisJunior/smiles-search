import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-loading-button',
    templateUrl: './loading-button.component.html',
    styleUrls: ['./loading-button.component.scss']
})
export class LoadingButtonComponent implements OnInit {

    @Input() loading = false;
    @Input() form: FormGroup;
    @Input() type = 'submit';
    @Input() class: string;

    readonly defaultClass: string = 'btn btn-primary';

    constructor() { }

    ngOnInit(): void {
        this.makeClass();
    }

    get isFormValid(): boolean {
        return this.form && this.form.valid;
    }

    get isLoading(): boolean {
        return this.loading;
    }

    protected makeClass(): void {
        this.class = !this.class ? this.defaultClass : `${this.class} ${this.defaultClass}`;
    }

}
