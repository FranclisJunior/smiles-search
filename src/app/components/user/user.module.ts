import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { UserListComponent } from './user-list/user-list.component';

import { SecurityUtil } from 'src/app/core/security/security.util';
import { SpinnerModule } from 'src/app/core/component/spinner/spinner.module';
import { SortHeaderModule } from 'src/app/core/directive/sort-header/sort-header.module';
import { PaginatorModule } from 'src/app/core/component/paginator/paginator.module';
import { PageSizeModule } from 'src/app/core/component/page-size/page-size.module';
import { SimpleSearchModule } from 'src/app/core/component/simple-search/simple-search.module';
import { DeleteConfirmationModule } from 'src/app/core/component/delete-confirmation/delete-confirmation.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingButtonModule } from 'src/app/core/component/loading-button/loading-button.module';
import { ControlMessageModule } from 'src/app/core/component/control-message/control-message.module';
import { Select2Module } from 'src/app/shared/directive/select2/select2.module';
import { AdvancedSearchModule } from 'src/app/core/component/advanced-search/advanced-search.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { UserViewComponent } from './user-view/user-view.component';
import { RolePipe } from 'src/app/shared/pipe/role.pipe';
import { ButtonChooseModule } from 'src/app/shared/directive/button-choose/button-choose.module';
import { TooltipModule } from 'src/app/shared/directive/tooltip/tooltip.module';

const routes: Routes = [
    {
        path: '', component: UserListComponent, data: {
            permissions: {
                only:  [...SecurityUtil.getPermissionRead('user')]
            }
        }
    },
    {
        path: 'create', component: UserEditComponent, data: {
            permissions: {
                only: [...SecurityUtil.getPermissionInsert('user')]
            },
            breadcrumb: {
                key: 'user-create', title: 'user.operations.register', icon: 'icon-user'
            }
        }
    },
    {
        path: 'edit/:id', component: UserEditComponent, data: {
            permissions: {
                only: [...SecurityUtil.getPermissionUpdate('user')]
            },
            breadcrumb: {
                key: 'user-edit', title: 'user.operations.update', icon: 'icon-user'
            }
        }
    },
    {
        path: 'view/:id', component: UserViewComponent, data: {
            permissions: {
                only: [...SecurityUtil.getPermissionRead('user')]
            },
            breadcrumb: {
                key: 'user-view', title: 'user.operations.view', icon: 'icon-user'
            }
        }
    }
];

@NgModule({
    declarations: [UserListComponent, UserEditComponent, UserViewComponent, RolePipe],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        RouterModule.forChild(routes),
        SortHeaderModule,
        RouterModule,
        SpinnerModule,
        PaginatorModule,
        PageSizeModule,
        SimpleSearchModule,
        AdvancedSearchModule,
        DeleteConfirmationModule,
        LoadingButtonModule,
        ControlMessageModule,
        Select2Module,
        ButtonChooseModule,
        TooltipModule,
        NgxPermissionsModule
    ],
    providers: []
})
export class UserModule { }
