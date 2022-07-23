import { Component, OnInit } from '@angular/core';

import { UserService } from '../../service/user.service';
import { ScriptService } from '../../service/script.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private userService: UserService, private scriptService: ScriptService) { }

    ngOnInit(): void {
      this.initScriptSidebar();
    }

    logout() {
      this.userService.logout();
    }

    get user() {
      return this.userService.getUser();
    }

    initScriptSidebar(): void {
      this.scriptService.load('app.js');
    }

    resizeSidebar(): void {
      setTimeout(() => {
        const newEvent = document.createEvent('TMLEvents');
        newEvent.initEvent('resize', false, true);
        window.dispatchEvent(newEvent);
      }, 0);
    }

}
