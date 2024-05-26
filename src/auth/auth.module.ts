import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { JwtConfig } from 'src/utils/jwt.config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JwtConfig.Secret,
      signOptions: { expiresIn: JwtConfig.Expiry },
    }),
  ],
  providers: [JwtStrategy, AuthService],
  exports: [AuthService]
})
export class AuthModule {}
