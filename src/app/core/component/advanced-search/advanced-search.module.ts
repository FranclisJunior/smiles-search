import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { AdvancedSearchComponent } from './advanced-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule],
  exports: [AdvancedSearchComponent],
  declarations: [AdvancedSearchComponent],
  providers: []
})
export class AdvancedSearchModule {}
