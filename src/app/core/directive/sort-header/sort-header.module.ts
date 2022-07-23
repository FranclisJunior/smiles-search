import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { SortHeaderDirective } from './sort-header.directive';

@NgModule({
  imports: [CommonModule],
  exports: [SortHeaderDirective],
  declarations: [SortHeaderDirective],
  providers: [],
})
export class SortHeaderModule {
}
