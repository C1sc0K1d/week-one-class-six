import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'src/app/core/helpers/message.service';
import { InstrumentService } from 'src/app/core/services/instrument.service';
import { LoginService } from 'src/app/core/services/login.service';
import { Product } from 'src/app/shared/interfaces/product';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  instrument: Product = {};

  users: User[] = [];

  user: User = {
    userName: '',
    password: ''
  };

  instrumentForm: FormGroup =  new FormGroup({});

  adminForm: FormGroup =  new FormGroup({});

  constructor(private fb: FormBuilder, private messageService: MessageService, private loginService: LoginService, private instrumentService: InstrumentService, private ngxService: NgxUiLoaderService) { }

  ngOnInit() : void {
    this.instrumentForm = this.fb.group({
      name: [this.instrument.name, [Validators.required, Validators.minLength(4)]],
      image: [this.instrument.image, [Validators.required, Validators.minLength(20)]],
      price: [this.instrument.price, [Validators.required, Validators.minLength(2)]],
      type: [ this.instrument.type, [Validators.required, Validators.minLength(3)]]
    });

    this.adminForm = this.fb.group({
      userName: [this.user.userName, [Validators.required, Validators.minLength(4)]],
      password: [this.user.password, [Validators.required, Validators.minLength(4)]],
      isAdmin: [true]
    });

    this.getUsers();
  }

  addInstrument() : void {
    this.ngxService.start();
    this.instrumentForm.value.name = (this.instrumentForm.value.name[0].toUpperCase() + this.instrumentForm.value.name.substring(1).toLowerCase());    
    this.instrument = this.instrumentForm.value;
    this.instrumentService.addInstrument(this.instrument).subscribe(() => {
      this.instrumentForm.reset();
      this.ngxService.stop();
    });
  }

  clearInstrumentForm() : void {
    this.instrumentForm.reset();
  }

  newAdmin() : void {
    this.ngxService.start();
    this.user = this.adminForm.value;
    this.loginService.createUser(this.user).subscribe(response => {
      this.users.push(response.user);
      this.adminForm.reset();
      this.ngxService.stop();
      this.messageService.add('Admin ' + response.user.userName +' successfully created');
    });
  }

  clearAdminForm() : void {
    this.adminForm.reset();
  }

  getUsers() : void {
    this.ngxService.start();
    this.loginService.getUsers().subscribe(response => {
      this.users = response.users
      this.ngxService.stop();
    });
  }

  deleteUser(id: number, name: string) : void {
    this.ngxService.start();
    this.loginService.deleteUser(id).subscribe(() => {
      this.users.splice(this.findIndex(id), 1);
      this.ngxService.stop();
      this.messageService.add(`User ${name} deleted!`);
    });
  }

  public findIndex(id: number) : number {
    return this.users.findIndex(user => (user.id == id) ? true : false);
  }

}
