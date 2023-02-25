import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/model/person';
import { PersonService } from 'src/app/services/person.service';
import { PersonFormComponent } from '../person-form/person-form.component';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.scss']
})
export class PersonsListComponent implements OnInit {

  persons!: Person[];
  selectedPerson!: Person;

  searchText = '';

  constructor(private personService: PersonService, private router: Router, private primengConfig: PrimeNGConfig, private messageService: MessageService, public dialogService: DialogService) {
  }

  ngOnInit() {
    this.loadAll();
    this.primengConfig.ripple = true;
  }

  private loadAll() {
    this.personService.getAll().subscribe(data => this.persons = data);
  }

  onRowSelect($event: any) {
    this.router.navigate(['persons', $event.data.id]);
  }

  deleteCountry(person: Person) {
    this.personService.delete(person.id).subscribe(() => {
      this.loadAll();
      this.messageService.add({severity: 'error', summary: 'Success', detail: 'Person deleted'});
    });
  }

  openCreateModal() {
    const ref = this.openModal(new Person(), 'Add Person');
    ref.onClose.subscribe((person: Person) => {
      if (person) {
        this.personService.create(person).subscribe(() => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Person Added'});
          window.location.reload();
        }, er => {
          this.messageService.add({severity: 'error', summary: 'Failure', detail: 'Unable to add Person'});
        });
      }
    });
  }

  openEditModal(selectedPerson: Person) {
    const ref = this.openModal(selectedPerson, 'Edit Person');
    ref.onClose.subscribe((person: Person) => {
      if (person) {
        this.personService.update(person.id, person).subscribe(() => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Person updated'});
        });
      }
    });
  }

  openModal(person: Person, header: string): DynamicDialogRef {
    return this.dialogService.open(PersonFormComponent, {
      data: {person},
      header,
      contentStyle: {'max-height': '500px', 'overflow': 'auto'},
      baseZIndex: 10000
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
}

}
