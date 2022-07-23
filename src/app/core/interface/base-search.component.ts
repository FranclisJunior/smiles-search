import { EventEmitter, OnInit, Output, ViewChild, ElementRef, Input, Directive } from '@angular/core';

import { fromEvent } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';




/**
 * The 'BaseViewComponent' provides the common API to search models.
 */
@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class BaseSearchComponent implements OnInit {

    /**
     * Debounce time default 1 second
     */
    @Input() debounceTime = 1000;

    /**
     * Emits the event of key pressed to start a search.
     *
     * @type {}
     */
    @Output() keySearch = new EventEmitter<any>();

    /**
     * Current value of the search text.
     */
    public currentSearch: string;

    /**
     * Element ref current search
     */
    @ViewChild('searchRef', { static: true }) searchRef: ElementRef;

    /**
     * On Init of the component.
     */
    ngOnInit() {
        this.setupDebounce();
    }

    /**
     * Executes after the search text change.
     */
    onKeySearch(): void {
        this.keySearch.emit({ filter: [], search: this.currentSearch });
    }

    /**
     * Initial debounce setting
     *
     */
    setupDebounce(): void {
        fromEvent(this.searchRef.nativeElement, 'keyup')
            .map((evt: any) => evt.target.value)
            .debounceTime(this.debounceTime)
            .distinctUntilChanged()
            .subscribe((text: string) => this.onKeySearch());
    }

}
