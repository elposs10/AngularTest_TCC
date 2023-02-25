// Angular imports
import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
// PrimeNG imports
import {PrimeNGConfig} from 'primeng/api';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
// Local imports
import { Person } from 'src/app/model/person';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent {

  @Input() showDialog!: boolean;
  @Input() header!: string;
  person!: Person;
  personForm: FormGroup;

  constructor(private primengConfig: PrimeNGConfig, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.person = this.config.data.person;
    this.personForm = new FormGroup({
      id: new FormControl({value: this.person.id, disabled: this.person.id != null}, [Validators.required]),
      firstName: new FormControl(this.person.firstName, [Validators.required]),
      lastName: new FormControl(this.person.lastName, [Validators.required]),
      email: new FormControl(this.person.email, [Validators.required])
    });
    this.primengConfig.ripple = true;
  }

  onSubmit() {
    this.formValuesToPerson();
    this.ref.close(this.person);
  }

  hideDialog() {
    this.ref.close(null);
  }

  formValuesToPerson() {
    this.person = this.personForm.getRawValue();
  }


}
