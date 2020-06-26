import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: any;
  constructor(private data: DataService) { }


  ngOnInit() {
    this.data.test().then().catch();

    this.data.getUserDetails().subscribe(data => {

      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,
          // isEdit: false,
          // tslint:disable-next-line: no-string-literal
          Name: e.payload.doc.data()['name'],
          // tslint:disable-next-line: no-string-literal
          phone: e.payload.doc.data()['phone'],
          // tslint:disable-next-line: no-string-literal
          matric: e.payload.doc.data()['matric'],
          // tslint:disable-next-line: no-string-literal
          admission: e.payload.doc.data()['admission'],
          // tslint:disable-next-line: no-string-literal
          expiryDate: e.payload.doc.data()['expiryDate'],
          // tslint:disable-next-line: no-string-literal
          faculty: e.payload.doc.data()['faculty'],
          // tslint:disable-next-line: no-string-literal
          department: e.payload.doc.data()['department'],
          // tslint:disable-next-line: no-string-literal
          passport: e.payload.doc.data()['passport'],
        };
      });
      console.log(this.students);

    });
  }

  view(rowID){}

  RemoveRecord(rowID) {
    this.data.delete_Student(rowID);
  }

}
