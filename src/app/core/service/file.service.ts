import { Injectable } from '@angular/core';
import { BaseService } from '../interface/base.service';
import { FileURL } from 'src/app/shared/url/url.domain';

/**
 * The 'FileService' class provides file upload and download operations.
 *
 * @extends BaseService
 */
@Injectable({
  providedIn: 'root'
})
export class FileService extends BaseService {

  /**
   * Constructor.
   */
  constructor() {
    super();
  }

  /**
   * Download the file.
   *
   * @param response
   * @param filename
   */
  protected onDownload(response: any, filename: string): void {
    const dataType = response.type;
    const binaryData = [];
    binaryData.push(response);
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
    downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  /**
   * Open a browser window to view the file.
   *
   * @param data
   */
  protected openWindow(data: Blob) {
    const url = window.URL.createObjectURL(data);
    window.open(url);
  }

  /**
   * Upload the file.
   *
   * @param file
   * @param filename
   * @param pathToSave
   */
  filesUpload(url: string, files: any[], pathToSave?: string) {
    const formData: FormData = new FormData();
    files.forEach(file => {
      formData.append('files', file, file.name);
    });
    return this.http.post(url, formData, {
      headers: this.getHeaders().append('File-Directory', pathToSave),
    });
  }

  /**
   * GET method to search for the file and display it in the browser.
   *
   * @param link
   */
  viewFileOnBrowser(link: string) {
    this.http.get(link, { responseType: 'blob', headers: this.getHeaders() }).subscribe((data: Blob) => {
      this.openWindow(data);
    });
  }

  /**
   * GET method to search for the file and download it.
   *
   * @param link
   * @param filename
   */
  downloadFile(link: string, filename: string) {
    this.http.get(link, { responseType: 'blob', headers: this.getHeaders() }).subscribe((response: any) => {
      this.onDownload(response, filename);
    });
  }

}
