import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app.routing.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { Routes, RouterModule } from '@angular/router';

// import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentDetailComponent,
    AddStudentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
