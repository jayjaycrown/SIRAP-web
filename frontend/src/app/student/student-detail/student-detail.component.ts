import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  id: any;
  item: any;
  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
      console.log('id is ' + this.id);
      this.data.getUser(this.id).then(doc => {
        this.item = doc;
        console.log(doc);
      }).catch();
    });
  }


}
