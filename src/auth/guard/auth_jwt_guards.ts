import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// handleRequest(err, user, info) {
//   if (err || !user) {
//     throw err || new UnauthorizedException(info.message);
//   }
//   if (user.type !== 'accessToken') {
//     throw err || new UnauthorizedException('No access token');
//   }
//   return user;
// }
