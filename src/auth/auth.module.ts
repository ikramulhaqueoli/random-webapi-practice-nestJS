import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: '7923bcd3bfa74d7d85ccd1379a68a4ca',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [JwtStrategy, AuthService],
  exports: [AuthService]
})
export class AuthModule {}
