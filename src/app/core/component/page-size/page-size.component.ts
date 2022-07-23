import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
    selector: 'app-page-size',
    templateUrl: './page-size.component.html',
    styleUrls: ['./page-size.component.scss']
})
export class PageSizeComponent implements OnInit {

    @Output()
    pageSizeChanged = new EventEmitter<any>();

    @Input()
    values: number[] = [10, 25, 50, 100];

    constructor() { }

    ngOnInit(): void { }

    setPageSize(value: number) {
        this.pageSizeChanged.emit(value);
    }

}
