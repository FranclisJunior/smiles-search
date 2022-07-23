import { OnInit, ViewChild, RendererFactory2, Directive } from '@angular/core';

// import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { BaseModelComponent } from './base-model.component';
// import { DeleteConfirmationComponent } from '../component/delete-confirmation/delete-confirmation.component';

import { AppInjector } from '../../app.injector';
import { PropertyType } from '../domain/property-type.domain';
import { Comparison } from '../domain/comparison.domain';
import { TranslateService } from '../service/translate.service';
import { DeleteConfirmationComponent } from '../component/delete-confirmation/delete-confirmation.component';

/**
 * The 'BaseListComponent' provides the common API for all list components.
 *
 * Service, operations, searches, navigations are all available.
 *
 * All list components MUST extend this class.
 *
 * @extends BaseModelComponent
 *
 * @property {DeleteConfirmationComponent}  deleteConfirmation  - component to confirm the remove operation.
 * @property {any}                          items               - items to list.
 * @property {any}                          removeId            - controls the ID to be removed.
 */
@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class BaseListComponent extends BaseModelComponent implements OnInit {

    /**
     * Component to confirm the remove operation.
     *
     * Could exist or not. Depends if the template has the <app-delete-confirmation> tag.
     */
    @ViewChild(DeleteConfirmationComponent, { static: true })
    deleteConfirmation: DeleteConfirmationComponent;

    /**
     * Items to list.
     *
     * @type {Array}
     */
    public items: any = [];

    /**
     * ID to be removed.
     *
     * @type {any}
     */
    protected removeId: any;

    /**
     * Total pages of items.
     *
     * @type {number}
     */
    public totalPages = 1;

    /**
     * Current page of pagination.
     *
     * @type {number}
     */
    public currentPage = 1;

    /**
     * Current column of ordering.
     *
     * @type {String}
     */
    protected currentColumn: String;

    /**
     * Current sort of ordering.
     *
     * @type {String}
     */
    protected currentSort: String;

    /**
     * Current text of search.
     *
     * @type {String}
     */
    public currentSearch: String;

    /**
     * Current number of paginate.
     *
     * @type {number}
     */
    protected currentPageSize: Number = 10;

    /**
     * Current object of filter.
     *
     * @type {String}
     */
    protected currentFilter: Array<any> = [];

    /**
     * Current object of filter.
     *
     * @type {boolean}
     */
    public loading = true;

    /**
     * Page size options.
     */
    protected pageSizeOptions: number[];

    /**
     * Properties to be included on text search.
     *
     * @type {any[]}
     */
    public searchProperties: any[] = [];

    /**
     * Constructor.
     */
    constructor() {
        super();
    }

    /**
     * On Init of the component.
     *
     * List all items by default.
     */
    ngOnInit(): void {
        super.ngOnInit();

        this.initSearch();

        this.listItems();
    }
    /**
     * Initializes the search.
     */
    initSearch(): void {
        this.advancedSearch();
    }

    /**
     * If the component will use a advanced search, it must override this method to
     * include the properties to be use in the advanced search.
     *
     * It should call "addSearch" method only.
     */
    protected advancedSearch(): void { }

    /**
     * Adds a property into the advanced search.
     *
     * @param {string} name
     * @param {string} label
     * @param {PropertyType} type
     * @param {Comparison} comparison
     */
    protected addSearch(name: string, label: string, type: PropertyType, comparison: Comparison) {
        this.searchProperties.push({name, label, type, comparison});
    }

    /**
     * Gets all items and fills the list.
     */
    listItems(): void {
        this.loading = true;
        this.service
            .search(
                this.getServiceURL(),
                this.getPaginationParams(),
                this.currentFilter
            )
            .subscribe(result => {
                    this.totalPages = result.totalPages;
                    this.items = result.items;
                    this.postResult();
                    this.loading = false;
                },
                error => {
                    this.notification.error(error.error.message);
                    this.loading = false;
                });
    }

    /**
     * Executes after the result of list items.
     */
    protected postResult(): void {

    }

    /**
     * Goes to the add component.
     */
    add(): void {
        this.goToAdd();
    }

    /**
     * Goes to the edit component.
     *
     * @param {any} id
     */
    edit(id): void {
        this.goToEdit(id);
    }

    /**
     * Goes to the view component.
     *
     * @param {any} id
     */
    view(id): void {
        this.goToView(id);
    }

    /**
     * Sets the removable ID and checks if the operation has
     * a confirmation or not.
     *
     * If NOT: call the service to delete the item.
     *
     * @param {any} id
     */
    remove(id): void {
        this.removeId = id;
        if (!this.deleteConfirmation) {
            this.delete();
          } else {
            this.deleteConfirmation.subscribe(ok => {
              this.delete();
            });
          }
    }

    /**
     * Calls the service to delete the item.
     *
     * Notifies by 'toast' at the end: Success or Error.
     *
     * Finally, refreshes the list of items.
     */
    delete(): void {
        this.service.remove(this.getServiceURL(), this.removeId).subscribe(
            result => {
                this.postDelete();
                this.notification.deleteSuccess();
            },
            error => {
                this.notification.error(
                    error.error ? error.error.message : error.message
                );
            },
            () => {
                /* Finally */
                this.listItems();
            }
        );
    }

    /**
     * Goes to the add component.
     *
     * @param {any} id
     */
    goToAdd(): void {
        this.navigate([this.getRouterURL(), 'create']);
    }

    /**
     * Goes to the edit component.
     *
     * @param {any} id
     */
    goToEdit(id = null): void {
        this.navigate([this.getRouterURL(), 'edit', id ? id : '']);
    }

    /**
     * Goes to the view component.
     *
     * @param {any} id
     */
    goToView(id): void {
        this.navigate([this.getRouterURL(), 'view', id]);
    }

    /**
     * Executes post successful delete.
     */
    protected postDelete(): void {}

    /**
     * When the page of pagination changes, executes
     * this method.
     *
     * @param { number } page
     */
    onChangePaginator(page: number) {
        this.currentPage = page;
        this.listItems();
    }

    /**
     * When key search field, executes
     * this method.
     */
    onSearch(event): void {
        this.currentFilter = event.filter;
        this.currentSearch = event.search;
        this.listItems();
    }

    /**
     * When the ordering changes, executes
     * this method.
     *
     * @param {active: String, direction: String} ordering
     */
    onChangeSort(ordering: { column: string; sort: string }): void {
        this.currentColumn = ordering.column;
        this.currentSort = ordering.sort;
        this.listItems();
    }

    /**
     * Set the size of the page.
     *
     * @param {size: number}
     */
    public setPageSize(size: Number) {
        this.currentPageSize = size;
        this.listItems();
    }

    /**
     * Gets the parameters for pagination.
     *
     * @returns {Object}
     */
    protected getPaginationParams() {
        return {
            currentPage: this.currentPage,
            pageSize: this.currentPageSize,
            sort: {
                order: this.currentSort,
                column: this.currentColumn
            },
            search: this.currentSearch
                ? this.currentSearch.trim()
                : this.currentSearch
        };
    }

    /**
     * Check if the list is empty
     *
     * @returns {boolean}
     */
    get listIsEmpty(): boolean {
        return this.items.length <= 0;
    }
}
