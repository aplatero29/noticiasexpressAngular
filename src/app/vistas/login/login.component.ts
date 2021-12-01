import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  EmailValidator,
} from '@angular/forms';
import { ApiService } from '../../servicios/api/api.service';
import { LoginI } from '../../modelos/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('we@we.com', Validators.required),
    password: new FormControl('123456', Validators.required),
  });

  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  onLogin(form: LoginI) {
    /* this.api.LoginByEmail(form).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.error(err);
      }
    ); */
    console.log("prueba");
  }
}
