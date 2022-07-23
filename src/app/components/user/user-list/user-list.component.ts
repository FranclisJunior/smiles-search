import { Component, OnInit } from '@angular/core';

import { BaseListComponent } from '../../../core/interface/base-list.component';
import { UserURL } from '../../../shared/url/url.domain';
import { PropertyType } from 'src/app/core/domain/property-type.domain';
import { Comparison } from 'src/app/core/domain/comparison.domain';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends BaseListComponent implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }

    getServiceURL(): string {
        return UserURL.BASE;
    }

    getRouterURL(): string {
        return 'users';
    }

    advancedSearch(): void {
        this.addSearch('name', this.translate('user.name'), PropertyType.String, Comparison.Like);
        this.addSearch('username', this.translate('user.username'), PropertyType.String, Comparison.Like);
    }

}
