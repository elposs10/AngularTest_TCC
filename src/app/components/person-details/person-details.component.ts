import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/model/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  person!: Person;
  goBackUrl = '..';

  constructor(private personService: PersonService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('id');
    this.personService.get(name).subscribe(data => this.person = data);
  }

}
