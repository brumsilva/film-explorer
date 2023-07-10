import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './jwt-token-validator.service';

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAccess(state.url);
  }

  private checkAccess(url: string): boolean | UrlTree {
    const token = this.tokenService.getToken();

    if (token) {
      return true;
    }
    this.router.navigate(['/login']);

    return false;
  }
}
