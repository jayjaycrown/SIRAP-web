import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
import { AddStudentComponent } from './student/add-student/add-student.component';


const routes: Routes = [
  { path: 'add-student', component: AddStudentComponent },
  { path: 'students', component: StudentListComponent },
  {path: 'student/:id', component: StudentDetailComponent},
  { path: '', redirectTo: '/students', pathMatch: 'full' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
