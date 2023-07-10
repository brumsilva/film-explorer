import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private readonly route: Router,
    private readonly loginService: LoginService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  goToRegister() {
    this.route.navigate(['/register']);
  }

  login() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password);
  }
}
