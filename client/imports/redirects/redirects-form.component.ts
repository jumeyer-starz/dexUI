import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';

import { Redirects } from '../../../both/collections/redirect.collection';

import template from './redirects-form.component.html';

@Component({
  selector: 'parties-form',
  template,
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class PartiesFormComponent implements OnInit {
  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [],
      location: ['', Validators.required],
      public: [false]
    });
  }

  resetForm() {
    this.addForm.controls['name']['updateValue']('');
    this.addForm.controls['description']['updateValue']('');
    this.addForm.controls['location']['updateValue']('');
    this.addForm.controls['testEnabled']['updateValue'](false);
  }

  addParty() {
    if (this.addForm.valid) {
      if (Meteor.userId()) {
        let newRd:any  = {
          name: this.addForm.value.name,
          description: this.addForm.value.description,
          location: {
            name: this.addForm.value.location
          },
          testEnabled: this.addForm.value.testEnabled,
          owner: Meteor.userId()
        };

        Redirects.insert(newRd);
        Meteor.call('pushToConsul', newRd);



        // XXX will be replaced by this.addForm.reset() in RC5+
        this.resetForm();
      } else {
        alert('Please log in to add a party');
      }
    }
  }
}
