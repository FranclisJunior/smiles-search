import { Directive, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appUploadFile]'
})
export class UploadFileDirective {

  @Output() fileOver = new EventEmitter();

  @Output() fileDropped = new EventEmitter();

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver.emit(true);
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver.emit(false);
  }

  @HostListener('change', ['$event']) public onChange(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const files = evt.target.files;
    this.fileDropped.emit(files);
  }

  @HostListener('drop', ['$event']) public onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver.emit(false);
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

  constructor() { }

}
