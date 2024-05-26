import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto, LoginUserDto } from 'src/dto/auth-user.dto';
import { ViewMessagesDto } from 'src/dto/view-messages.dto';
import { CreateProfileDto, UpdateProfileDto } from 'src/dto/write-profile-dto';
import { MessageService } from 'src/message/message.service';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/schemas/profile.schema';

@Controller('api')
export class ApiController {
    constructor(
        private readonly authService: AuthService,
        private readonly profileService: ProfileService,
        private readonly messageService: MessageService
    ) {}
    
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto)
    }

    @Post('createProfile')
    async createProfile(@Body() createProfileDto: CreateProfileDto) {
        console.log(typeof createProfileDto.birthday)
        return this.profileService.create(createProfileDto);
    }

    @Get('getProfile/:username')
    async getProfile(@Param('username') username: string): Promise<Profile> {
        return this.profileService.get(username)
    }

    @Put('updateProfile')
    async updateProfile(@Body() updateProfileDto: UpdateProfileDto) {
        return this.profileService.update(updateProfileDto)
    }

    @Post('viewMessages')
    async viewMessages(@Body() viewMessagesDto: ViewMessagesDto) {
        return this.messageService.get(viewMessagesDto)
    }

    @Post('sendMessage')
    async sendMessage(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto)
    }
}
