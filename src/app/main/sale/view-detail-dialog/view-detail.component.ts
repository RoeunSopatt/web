// ==========================================================>> Core Library
import { Component, Inject, OnInit } from '@angular/core';

// ==========================================================>> Third Party Library
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

// ==========================================================>> Custom Library
import { SaleService } from '../sale.service';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public displayedColumns: string[] = ['no', 'product', 'price', 'qty', 'total'];
  public dataSource: any;
  public data: any[] = [];
  public isDownloading: boolean = false;

  public item: any[];
  constructor(

    @Inject(MAT_DIALOG_DATA) public getRow: any,
    private dialogRef: MatDialogRef<DetailsComponent>,
    private _saleService: SaleService

  ) {

    this.dialogRef.disableClose = true;

  }

  ngOnInit(): void {

    console.log(this.getRow);

    this.data = this.getRow?.details;
    this.dataSource = new MatTableDataSource(this.data);
  }

  

  // =================================>> Convert base64 to blob
  // b64toBlob(b64Data: any, contentType: any, sliceSize: any) {
  //   contentType = contentType || '';
  //   sliceSize = sliceSize || 512;
  //   var byteCharacters = atob(b64Data);
  //   var byteArrays = [];
  //   for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  //     var slice = byteCharacters.slice(offset, offset + sliceSize);
  //     var byteNumbers = new Array(slice.length);
  //     for (var i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }
  //     var byteArray = new Uint8Array(byteNumbers);
  //     byteArrays.push(byteArray);
  //   }
  //   var blob = new Blob(byteArrays, { type: contentType });
  //   return blob;
  // }

}
