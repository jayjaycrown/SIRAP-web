import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { User } from './users.model';
import { DataService } from './service/data.service';

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}


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
      image: new FormControl(null)
    });
  }

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(
          imageData.replace('data:image/jpeg;base64,', ''),
          'image/jpeg'
        );
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = imageData;
    }
    this.form.patchValue({ image: imageFile });
  }

  // Image Preview
  // uploadFile(event: { target: HTMLInputElement; }) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({
  //     eventUrl: file
  //   });

  // }

  onCreateUser() {
    if (!this.form.valid) {
      return;
    }
    this.data
      .uploadImage(this.form.get('image').value)
      .pipe(
        switchMap(uploadRes => {
          return this.data.addUser(
            this.form.value.name,
            this.form.value.matric,
            +this.form.value.phone,
            new Date(this.form.value.expiryDate),
            new Date(this.form.value.admission),
            this.form.value.department,
            this.form.value.faculty,
            uploadRes.imageUrl
          );
        })
      )
      .subscribe(() => {
        this.form.reset();
        this.successMessage = true;
      });
  }
}
