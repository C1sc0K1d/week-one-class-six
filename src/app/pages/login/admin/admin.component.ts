import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/core/helpers/message.service';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  instrument: Product = {};

  instrumentForm: FormGroup =  new FormGroup({});

  constructor(private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.instrumentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      image: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, Validators.minLength(4)]],
      type: [0.0, [Validators.required, Validators.minLength(4)]]
    });
  }

}
