import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-header-dialog-box',
  templateUrl: './header-dialog-box.component.html',
  styleUrls: ['./header-dialog-box.component.css'],
})
export class HeaderDialogBoxComponent {

  constructor(
    public dialogRef: MatDialogRef<HeaderDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
