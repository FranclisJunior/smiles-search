import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

    breadcrumbs: any[];

    currentBreadcrumb: any;

    header: any;

    cache: any = {};

    constructor(private activateRoute: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.initBreadcrumbs();
    }

    protected buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Array<any> = []): Array<any> {
        if (!route.firstChild) {
            if (breadcrumbs.length !== 0) {
                breadcrumbs[breadcrumbs.length - 1].last = true;
            }
            return breadcrumbs;
        } else if (!route.firstChild.snapshot.data.breadcrumb) {
            return this.buildBreadCrumb(route.firstChild, url, breadcrumbs);
        }
        const breadcrumbInvalid = breadcrumbs.find(item => item.key === route.firstChild.snapshot.data.breadcrumb.key);
        if (breadcrumbInvalid) {
            return this.buildBreadCrumb(route.firstChild, url, breadcrumbs);
        }
        const title = route.firstChild.snapshot.data.breadcrumb.title;
        const path = route.firstChild.snapshot.data.breadcrumb.url ? route.firstChild.snapshot.data.breadcrumb.url : '';
        const icon = route.firstChild.snapshot.data.breadcrumb.icon;
        const nextUrl = `${url}${path}`;
        const breadcrumb = {
            patternPath: route.firstChild.routeConfig.path,
            title: title,
            url: nextUrl,
            icon: icon,
            key: route.firstChild.snapshot.data.breadcrumb.key,
            buttons: route.firstChild.snapshot.data.breadcrumb.buttons
        };

        const newBreadcrumbs = [...breadcrumbs, breadcrumb];
        return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }

    initBreadcrumbs(): void {
        this.breadcrumbs = this.buildBreadCrumb(this.activateRoute.root);
        this.postInitBreadcrumbs();

        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            distinctUntilChanged(),
            map(() => {
                return this.buildBreadCrumb(this.activateRoute.root);
            }),
        ).subscribe(breadcrumbs => {
            this.breadcrumbs = breadcrumbs;
            this.postInitBreadcrumbs();
        });

    }

    updateCache(): void {
        this.cache[this.router.url] = this.breadcrumbs;
    }

    postInitBreadcrumbs(): void {
        this.currentBreadcrumb = this.breadcrumbs[this.breadcrumbs.length - 1];

        this.header = this.currentBreadcrumb ? this.currentBreadcrumb.header : {};

        this.updateCache();
    }

}
