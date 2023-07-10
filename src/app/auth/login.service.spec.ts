import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';
import { environment } from 'src/enviorments/environments';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  let toastrService: ToastrService;
  let router: MockRouter;

  beforeEach(() => {
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['error']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoginService,
        { provide: ToastrService, useValue: toastrSpy },
        { provide: Router, useClass: MockRouter }
      ]
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
    toastrService = TestBed.inject(ToastrService);
    router = TestBed.inject(Router) as unknown as MockRouter;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should make successful login', () => {
    const mockResponse = { access_token: 'myAccessToken' };
    const email = 'test@example.com';
    const password = 'password';

    spyOn(localStorage, 'setItem');

    service.login(email, password);

    const req = httpMock.expectOne(`${environment.api}login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email, password });

    req.flush(mockResponse);

    expect(localStorage.setItem).toHaveBeenCalledWith('meuToken', mockResponse.access_token);
    expect(localStorage.setItem).toHaveBeenCalledWith('email', email);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
    expect(toastrService.error).not.toHaveBeenCalled();
  });
  //   const mockError: any = { error: { message: 'Erro ao fazer login' } };
  //   const email = 'test@example.com';
  //   const password = 'password';

  //   spyOn(localStorage, 'setItem');
  //   spyOn(toastrService, 'error').and.callThrough(); // Corrige o spy para o método 'error'

  //   service.login(email, password);

  //   const req = httpMock.expectOne(`${environment.api}login`);
  //   expect(req.request.method).toBe('POST');
  //   expect(req.request.body).toEqual({ email, password });

  //   req.error(mockError);

  //   expect(localStorage.setItem).not.toHaveBeenCalled();
  //   expect(router.navigate).not.toHaveBeenCalled();
  //   expect(toastrService.error).toHaveBeenCalledWith(mockError.error.message);
  // });

  // it('should successfully register a user', async () => {
  //   const mockResponse = { access_token: 'meuToken' };
  //   const email = 'test@example.com';
  //   const password = 'Brun1997!!!!';
  //   const name = 'John Doe';

  //   spyOn(localStorage, 'setItem');

  //   service.register(email, password, name);

  //   const req = httpMock.expectOne(`${environment.api}user`);
  //   expect(req.request.method).toBe('POST');
  //   expect(req.request.body).toEqual({ email, password, name });

  //   req.flush(mockResponse);

  //   expect(localStorage.setItem).toHaveBeenCalledWith('meuToken', mockResponse.access_token);
  //   expect(localStorage.setItem).toHaveBeenCalledWith('email', email);
  //   expect(service.login).toHaveBeenCalledWith(email, password);
  //   expect(router.navigate).toHaveBeenCalledWith(['/home']);
  //   expect(toastrService.error).not.toHaveBeenCalled();
  // });

  // it('should display error message on user registration failure', () => {
  //   const mockError: any = { error: { message: 'Erro ao registrar usuário' } };
  //   const email = 'test@example.com';
  //   const password = 'password';
  //   const name = 'John Doe';

  //   spyOn(localStorage, 'setItem');
  //   spyOn(toastrService, 'error').and.callThrough(); // Corrige o spy para o método 'error'

  //   service.register(email, password, name);

  //   const req = httpMock.expectOne(`${environment.api}user`);
  //   expect(req.request.method).toBe('POST');
  //   expect(req.request.body).toEqual({ email, password, name });

  //   req.error(mockError);

  //   expect(localStorage.setItem).not.toHaveBeenCalled();
  //   expect(service.login).not.toHaveBeenCalled();
  //   expect(router.navigate).not.toHaveBeenCalled();
  //   expect(toastrService.error).toHaveBeenCalledWith(mockError.error.message);
  // });
});
