import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'abc123',
    });
  }

  validate(payload: any) {
    // payload là object chứa thông tin người dùng đã được mã hóa trong JWT
    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
