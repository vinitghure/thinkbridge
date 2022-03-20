import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-details',
  templateUrl: './add-edit-details.component.html',
  styleUrls: ['./add-edit-details.component.scss']
})
export class AddEditDetailsComponent implements OnInit {

  detailsForm: FormGroup | any;
  details: any;
  headerText: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddEditDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initializeVariables();
    this.initializeDetailsForm();
  }

  initializeVariables(): void {
    this.headerText = this.data.isEdit ? 'Edit' : 'Add';
    this.details = this.data.details || [];
  }

  initializeDetailsForm(): void {
    this.detailsForm = this.formBuilder.group({
      id: [this.details?.id || ''],
      name: [this.details?.name || ''],
      description: [this.details?.description || '', Validators.required],
      pricePerUnit: [this.details?.pricePerUnit || '', [Validators.required, Validators.min(1)]],
      category: [this.details?.category || '', Validators.required],
      unitOfMeasurement: [this.details?.unitOfMeasurement || '', Validators.required],
      quantity: [this.details?.quantity || '', [Validators.required, Validators.min(1)]],
    });
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }

  saveDetails(): void {
    if (this.detailsForm.invalid) {
      this.detailsForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.detailsForm.value);
  }

}
