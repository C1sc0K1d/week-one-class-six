import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/core/helpers/message.service';
import { LoginService } from 'src/app/core/services/login.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  userForm: FormGroup =  new FormGroup({});

  user: User = {
    userName: '',
    password: ''
  };

  constructor(private fb: FormBuilder, private messageService: MessageService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userName: [this.user.userName, [Validators.required, Validators.minLength(4)]],
      password: [this.user.password, [Validators.required, Validators.minLength(4)]],
      isAdmin: [false]
    });
  }

  newUser() : void {
    this.user = this.userForm.value;
    this.loginService.createUser(this.user).subscribe(response => {
      this.messageService.add('Welcome ' + response.user.userName[0].toUpperCase() + response.user.userName.substring(1).toLowerCase() +' to the louder site of the world!! Get some instruments and make noise yourself too!!');
      this.userForm.reset();
    });
  }

  clearUserForm() : void {
    this.userForm.reset();
  }

}
