import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SecurityUtil } from './core/security/security.util';

export const AppRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      breadcrumb: {
        key: 'home', title: 'home.title', url: '/', icon: 'icon-home2'
      }
    },
    children: [
      {
        path: 'users',
        loadChildren: () => import('src/app/components/user/user.module').then(m => m.UserModule),
        data: {
          breadcrumb: {
            key: 'user-list', title: 'user.title.plural', url: 'users', icon: 'icon-list', buttons: [
              {
                url: ['/users/create'],
                label: 'system.new',
                icon: 'fa fa-plus',
                permissions: [...SecurityUtil.getPermissionInsert('user')]
              }
            ]
          }
        }
      },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
