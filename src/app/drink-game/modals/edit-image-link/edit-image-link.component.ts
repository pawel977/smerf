import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-image-link',
  templateUrl: './edit-image-link.component.html',
  styleUrls: ['./edit-image-link.component.scss'],
})
export class EditImageLinkComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditImageLinkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {}

  onAbortClick() {
    this.dialogRef.close();
  }
}
