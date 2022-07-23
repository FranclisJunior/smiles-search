import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BaseEditComponent } from '../../../core/interface/base-edit.component';
import { ROLES } from '../../../core//domain/user.domain';

import { UserURL } from '../../../shared/url/url.domain';
import { Validators } from '@angular/forms';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent extends BaseEditComponent implements OnInit {

    roles: {key, id}[] = ROLES;

    constructor(private route: ActivatedRoute) {
      super();
    }

    ngOnInit() {
      super.ngOnInit();
    }

    getFormControls(): Object {
      if (this.isEditMode) {
        return {
          id: this.formBuilder.control(undefined, []),
          name: this.formBuilder.control(undefined, [Validators.required]),
          username: this.formBuilder.control(undefined, [Validators.required]),
          roles: this.formBuilder.control(undefined, [Validators.required])
        };
      }
      return {
        id: this.formBuilder.control(undefined, []),
        name: this.formBuilder.control(undefined, [Validators.required]),
        username: this.formBuilder.control(undefined, [Validators.required]),
        roles: this.formBuilder.control(undefined, [Validators.required]),
        newPassword: this.formBuilder.control(undefined, [Validators.required]),
      };
    }

    getServiceURL() {
      return UserURL.BASE;
    }

    getRouterURL() {
      return 'users';
    }

    isUpdatePartial(): boolean {
      return true;
    }

    getActivatedRoute(): ActivatedRoute {
      return this.route;
    }

}
