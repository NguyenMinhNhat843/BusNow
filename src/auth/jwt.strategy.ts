import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.JWT_SECRET_KEY !== undefined
          ? process.env.JWT_SECRET_KEY
          : 'abc123',
    });
  }

  validate(payload: any) {
    // payload sẽ chứa thông tin người dùng đã được mã hóa trong JWT
    return { userId: payload.id, email: payload.email };
  }
}
