import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddPlayerComponent implements OnInit {
  public form: FormGroup = this.initForm();
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<string>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): FormGroup {
    return this.fb.group({
      nick: ['', [Validators.required, Validators.maxLength(20)]],
      imgUrl: ['', Validators.maxLength(200)],
    });
  }
  public submit(): void {
    this.dialogRef.close(this.form.value);
  }
  public abort(): void {
    this.dialogRef.close();
  }
}
