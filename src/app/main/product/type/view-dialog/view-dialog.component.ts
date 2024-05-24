// ==========================================================>> Core Library
import { Component, Inject, OnInit, ViewChild, } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// ==========================================================>> Third Party Library
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductTypeService } from '../product-type.service';
import { SnackbarService } from 'app/shared/services/snackbar.service';


// ==========================================================>> Custom Library


@Component({
  selector: 'app-update',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.scss']
})
export class ViewDialogComponent implements OnInit  {
  public form: UntypedFormGroup;
  public isSaving:boolean = false; 
  public originalData: any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: UntypedFormBuilder,
    private snackBar: SnackbarService,
    private _dialogRef: MatDialogRef<ViewDialogComponent>,
    private _typeService: ProductTypeService,
    private _router: Router
    
    
  ) {
    
  }
  

  ngOnInit(): void {
    this.formBuilder();
    this.originalData = this.data;
    console.log(this.originalData);
  }

  formBuilder(): void {
    this.form = this._formBuilder.group({
      name: [this.data.name, Validators.required],
      id: [this.data.id, Validators.required],
      n_of_products: [this.data.n_of_products, Validators.required],
    });
  }
 

  save(): void{

    //Display spinner UI
    this.isSaving=true;
    console.log("hey", this.form.value);
    this._typeService.update(this.data.id , this.form.value).subscribe(res =>{
      console.log(this.form.get('n_of_products').value);
      console.log("D: ",this.data.id);
      console.log("Y: ", this.form.value);
      console.log("R: ", res.data);
      res.data["n_of_products"] = this.form.get('n_of_products').value;
      console.log("R2: ", res.data);
      //Hide Spinner UI
      this.isSaving = false;
      // console.log(res.data);
      //Display SnackBar Message
      this.snackBar.openSnackBar(res.message , '');

      //Close Dialog
      this._dialogRef.close(res.data);
    });

  }

  onCancel(): void {
 
    this._dialogRef.close();
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    const currentUrl = this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this._router.navigate([currentUrl]);
  });

  }
  

}



