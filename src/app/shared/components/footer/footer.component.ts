import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    protected sidebar;
    protected footer;

    constructor(@Inject(DOCUMENT) private document) {}

    ngOnInit(): void {
      this.initComponents();

      this.initObservableResizeWindow();

      this.adjustWidthOnFooter();
    }

    initComponents(): void {
      this.sidebar = this.document.getElementById('sidebar');
      this.footer = this.document.getElementById('footer');
    }

    initObservableResizeWindow(): void {
      fromEvent(window, 'resize').subscribe((event: any) => {
        this.adjustWidthOnFooter();
      });
    }

    adjustWidthOnFooter(): void {
      const proportionSidebarOnWindow = this.sidebar.offsetWidth / window.innerWidth;
      const widthFooter = (1 - proportionSidebarOnWindow) * window.innerWidth;

      this.footer.style.width = `${widthFooter}px`;
    }

}
