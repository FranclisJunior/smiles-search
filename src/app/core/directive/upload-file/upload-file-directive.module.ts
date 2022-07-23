import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileDirective } from './upload-file.directive';



@NgModule({
  declarations: [UploadFileDirective],
  exports: [UploadFileDirective],
  imports: [
    CommonModule
  ]
})
export class UploadFileDirectiveModule { }
