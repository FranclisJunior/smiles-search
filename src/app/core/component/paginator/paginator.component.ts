import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

export const FIRST_PAGE = 1;

/**
 * The Paginantion component for navigates in the application.
 *
 * Provides the data by pages.
 */
@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

    @Output()
    pageChanged = new EventEmitter<any>();

    /**
     * Total pages available.
     *
     */
    private _totalPages = 1;

    readonly firstPage: number = 1;

    /**
     * Maximum number of pages to show.
     *
     */
    maxPages = 5;

    /**
     * The current page of the component.
     *
     */
    currentPage = 1;

    /**
     * Last page of pagination.
     *
     */
    last = 1;

    /**
     * Array to control the pages to be showed.
     *
     */
    pages = [];

    constructor() { }

    ngOnInit(): void {
        this.updatePages();
    }

    /**
   * Sets the total of pages available.
   *
   * @param value of total pages.
   */
    @Input()
    set totalPages(value) {
        this._totalPages = value;

        this.updatePages();
    }

    /**
     * Updates all attributes based on the total pages and current page.
     */
    updatePages(): void {
        this.last = this.totalPages;

        const fitAll = this.totalPages <= this.maxPages;

        let firstIndex = fitAll ? 1 : this.currentPage - 2;
        let lastIndex = fitAll ? this.totalPages : this.currentPage + 2;

        if (firstIndex < this.firstPage) {
            firstIndex = this.firstPage;
            lastIndex = lastIndex + (lastIndex - this.firstPage);
        } else if (lastIndex > this.totalPages) {
            firstIndex = firstIndex - (lastIndex - this.totalPages);
            lastIndex = this.totalPages;
        }

        let index = firstIndex;
        this.pages = [];

        for (let i = 0; i < this.maxPages; i++) {
            if (index <= lastIndex) {
                this.pages[i] = index++;
            }
        }
    }

    /**
     * Changes the page and emits the "onPageChange" event.
     *
     * @param page current
     */
    changePage(page) {
        if (page !== this.currentPage) {
            this.currentPage = page;
            this.updatePages();

            this.pageChanged.emit(page);
        }
    }

    /**
     * Goes to the first page.
     */
    changeToFirstPage() {
        this.changePage(this.firstPage);
    }

    /**
     * Goes to the last page.
     */
    changeToLastPage() {
        this.changePage(this.last);
    }

    /**
   * Gets the total of pages available.
   *
   * @returns total of pages
   */
    get totalPages() {
        return this._totalPages;
    }

}
