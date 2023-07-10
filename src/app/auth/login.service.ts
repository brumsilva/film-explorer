import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) { }


  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:3000/login', {
      email,
      password
    })
    .subscribe((res) => {
      localStorage.setItem('meuToken', res.access_token);
      localStorage.setItem('email', email);
      this.router.navigate(['/home']);
    });
  }

  register(email: string, password: string, name: string) {
    return this.http.post<any>('http://localhost:3000/user', {
      email,
      password,
      name
    })
    .subscribe(async (res) => {
      localStorage.setItem('meuToken', res.access_token);
      localStorage.setItem('email', email);
      await this.login(email, password);
      this.router.navigate(['/home']);
    });
  }
}
