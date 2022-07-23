import { Injectable, OnInit } from '@angular/core';

import { LoginURL, UserURL } from '../url/url.domain';

import { AuthService, STORAGE_KEY } from '../../core/service/auth.service';

@Injectable()
export class UserService extends AuthService {

  constructor() {
    super();
  }

  login(username, password?: any, oAuth2Token?: any, oAuth2Type?: any) {
    return this.post(LoginURL.BASE, { username, password, oAuth2Token, oAuth2Type });
  }

  changePassword(body: any) {
    return this.patch(UserURL.CHANGE_PASSWORD, body);
  }

}
