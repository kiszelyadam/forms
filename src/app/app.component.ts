import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, NgModel, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('testForm', {
    static: false
  }) testForm?: NgForm;
  title = 'forms';

  constructor(
    private readonly fb: FormBuilder
  ) { }

  username?: string;
  password?: string;

  errorMessage?: string;
  hasError = false;

  // Formgroup létrehozása
  form2 = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.minLength(10)]),
      age: new FormControl(10)
    }
  )
    // Formgroup formbuilderrel
  form3 = this.fb.group({
    fcontrol1: new FormControl('', [Validators.required]),
    fcontrol2: new FormControl(10, [Validators.required])
  })

  formControlExample = this.fb.control('teszt szöveg', [Validators.required, Validators.minLength(10)]);

  ngOnInit(): void {
    this.form2.controls['age'].valueChanges.subscribe((value) => {
      console.log(value);
    })

  }

  submit(): void {
    if (this.form2.valid) {
      console.log(this.submit);
      this.form2.patchValue({ email: 'asd' });
      console.log(this.form2.controls['email']);
    }
  }

  keydown(): void {
    console.log(this.username);
  }

  formControl() {
    this.hasError = false;
    console.log(this.formControlExample.errors);
    if (this.formControlExample.errors?.['required']) {
      this.errorMessage = 'A mező kitöltése kötelező';
      this.hasError = true;
    } else if (this.formControlExample.errors?.['minlength']) {
      this.errorMessage = 'A minimum karakterszám 10!';
      this.hasError = true;

    }
  }
}
