import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';

@Component({
    selector: 'app-delete-confirmation',
    templateUrl: './delete-confirmation.component.html',
    styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit, OnDestroy {

    // tslint:disable-next-line:no-input-rename
    @Input('target')
    id: string;

    @Output()
    protected ok: EventEmitter<boolean> = new EventEmitter<boolean>();

    protected isSubscribed = false;

    constructor() { }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this.ok.unsubscribe();
    }

    onOK() {
        this.ok.emit(true);
    }

    subscribe(callback: Function): void {
        if (!this.isSubscribed) {
            this.isSubscribed = !this.isSubscribed;
            this.ok.subscribe(callback);
        }
    }

}
