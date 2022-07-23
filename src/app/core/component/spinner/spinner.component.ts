import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {

    @Input()
    loading;

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.makeStrategySpinner();
    }

    ngOnDestroy(): void {
        this.loading = false;
    }

    makeStrategySpinner(): void {
        if (!this.loading) {
            this.initObserverLoadingModule();
        }
    }

    protected initObserverLoadingModule(): void {
        this.router.events.subscribe(
            event => {
                this.strategyModule(event);
            },
            () => {
                this.loading = false;
            }
        );
    }

    protected strategyModule(event: any): void {
        if (event instanceof NavigationStart) {
            this.loading = true;
        } else if (
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
        ) {
            this.loading = false;
        }
    }

}
