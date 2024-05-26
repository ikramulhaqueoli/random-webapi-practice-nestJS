import { Body, Request, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto, LoginUserDto } from 'src/dto/auth-user.dto';
import { SendMessageDto } from 'src/dto/send-message.dto';
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

    @UseGuards(AuthGuard('jwt'))
    @Post('createProfile')
    async createProfile(@Request() request, @Body() createProfileDto: CreateProfileDto) {
        const username = request.user.username
        return this.profileService.create(username, createProfileDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getProfile')
    async getProfile(@Request() request): Promise<Profile> {
        const username = request.user.username
        return this.profileService.get(username)
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('updateProfile')
    async updateProfile(@Request() request, @Body() updateProfileDto: UpdateProfileDto) {
        const username = request.user.username
        return this.profileService.update(username, updateProfileDto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('viewMessages')
    async viewMessages(@Request() request, @Body() viewMessagesDto: ViewMessagesDto) {
        const selfUsername = request.user.username
        return this.messageService.get(selfUsername, viewMessagesDto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('sendMessage')
    async sendMessage(@Request() request, @Body() sendMessageDto: SendMessageDto) {
        const selfUsername = request.user.username
        return this.messageService.sendMessage(selfUsername, sendMessageDto)
    }
}
