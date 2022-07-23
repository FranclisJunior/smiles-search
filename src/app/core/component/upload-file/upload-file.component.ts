import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  /**
   * True if the file is on the dropzone.
   *
   */
  onDrop = false;

  /**
   * Array with the files.
   *
   */
  files: any[] = [];

  /**
   * True if the file exceeds the maximum limit.
   *
   */
  limitSizeError = false;

  /**
   * True if the file is not supported.
   *
   */
  unsupportedFileError = false;

  /**
   * True if the input is for multiple files.
   *
   */
  @Input() multipleFiles = false;

  /**
   * Limit size for files in bytes.
   *
   */
  @Input() limitFileSize = 5000000;

  /**
   * Array with supported file types. Empty if all are supported.
   *
   * @example 'image/*', 'application/pdf'
   *
   */
  @Input() acceptedFiles: any[];

  /**
   * Issues the updated list for the parent component.
   *
   */
  @Output() filesList = new EventEmitter();

  /**
   * Constructor
   *
   */
  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Function that receives the event of the directive if the file is on the dropzone.
   *
   * @param event
   */
  dragOver(event) {
    this.onDrop = event;
  }

  /**
   * Function that adds files to a list when the dropzone is dropped.
   *
   * @param event;
   */
  onFileDropped(event) {
    this.limitSizeError = false;
    this.unsupportedFileError = false;
    for (const item of event) {

      if (this.acceptedFiles) {
        if (!this.checkFileTypeSupport(item)) {
          this.unsupportedFileError = true;
          return;
        }
      }

      if (item.size > this.limitFileSize) {
        this.limitSizeError = true;
        return;
      }

      if (this.multipleFiles) {
        this.files.push(item);
      } else {
        this.files = [];
        this.files.push(item);
      }

      this.filesList.emit(this.files);
    }
  }

  /**
   * Remove a file from the list.
   *
   * @param index
   */
  removeFile(index: any) {
    this.files.splice(index, 1);
    this.filesList.emit(this.files);
  }

  /**
   * Check if the file has its supported type.
   *
   * @param file
   */
  checkFileTypeSupport(file: any) {
    let supported = false;
    Array.from(this.acceptedFiles).forEach(type => {
      if (String(type).includes('*')) {
        const typeSplit = String(type).split('*');
        if (String(file.type).startsWith(typeSplit[0])) {
          supported = true;
        }
      } else {
        if (file.type === type) {
          supported = true;
        }
      }
    });
    return supported;
  }

}
