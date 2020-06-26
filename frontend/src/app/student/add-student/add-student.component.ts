import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DataService } from 'src/app/service/data.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  imgSrc = 'assets/img/upload.jpg';
  form: FormGroup;
  selectedImage: any;
  successMessage = false;
  isSubmitted = false;
  constructor(private data: DataService, private storage: AngularFireStorage, private router: Router) { }


  formTemplate = new FormGroup({
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
    passport: new FormControl('', Validators.required)
  });
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = 'assets / img / bg.jpg';
      this.selectedImage = null;
    }
  }



  onsubmit(formValue) {
    console.log(formValue);
    alert('Please wait... I will let you know if there is an error...');
    // if (!this.formTemplate.valid) {
    //   return;
    // }
    const filePath = `images/${this.selectedImage.name.split('_').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          // tslint:disable-next-line: no-string-literal
          formValue['passport'] = url;
          this.data.insertUserDetails(formValue).then(resp => {
            alert('Upload successful...Yipee!!!');
            console.log(resp);
            this.resetForm();
            this.successMessage = true;
            this.router.navigateByUrl('/students');
          })
            .catch(error => {
              console.log(error);
              alert(error);
            });
          this.resetForm();
        });
      })
    ).subscribe(() => {

    });
  }

  resetForm() {
    this.formTemplate.reset();
  }
  ngOnInit(): void {
  }

}
