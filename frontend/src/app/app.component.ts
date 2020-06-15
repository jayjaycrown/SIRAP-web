import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from './users.model';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  successMessage = false;
  constructor( private data: DataService) { }
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      matric: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      phone: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(10)]
      }),
      admission: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      expiryDate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      faculty: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      department: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
    });
  }
  onCreateUser() {
    if (!this.form.valid) {
      return;
    }
    this.data
      .addUser(
        this.form.value.name,
        this.form.value.matric,
        +this.form.value.phone,
        new Date(this.form.value.expiryDate),
        new Date(this.form.value.admission),
        this.form.value.department,
        this.form.value.faculty
      )
      .subscribe(() => {
        this.form.reset();
        this.successMessage = true;
      });
  }
}
