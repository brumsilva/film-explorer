import { LoginService } from 'src/app/auth/login.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private readonly LoginService: LoginService) {
    this.registerForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      name: new FormControl('')
    })
  }

  register() {
    this.LoginService.register(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.name);
  }
}
