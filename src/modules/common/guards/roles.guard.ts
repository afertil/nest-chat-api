import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log(context);
    return true;
    // const { parent, handler } = context;
    // const request = context.switchToHttp().getRequest();
    // const roles = this.reflector.get<string[]>('roles', handler);
    // if (!roles) {
    //   return true;
    // }

    // const user = request.user;
    // const hasRole = () =>
    //   !!user.roles.find(role => !!roles.find(item => item === role));
    // return user && user.roles && hasRole();
  }
}
