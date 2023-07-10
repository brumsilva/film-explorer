import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/enviorments/environments';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) { }


  login(email: string, password: string) {
    return this.http.post<any>(`${environment.api}login`, {
      email,
      password
    })
    .subscribe({
      next: (res: any) => {
        localStorage.setItem('meuToken', res.access_token);
        localStorage.setItem('email', email);
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        this.toastr.error(err.error.message);
      }
    });
  }

  register(email: string, password: string, name: string) {
    return this.http.post<any>(`${environment.api}user`, {
      email,
      password,
      name
    })
    .subscribe({
      next: async (data: any) => {
        localStorage.setItem('meuToken', data.access_token);
        localStorage.setItem('email', email);
        await this.login(email, password);
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        this.toastr.error(err.error.message);
      }
    });
  }
}
