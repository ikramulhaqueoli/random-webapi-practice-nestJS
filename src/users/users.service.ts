import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/auth-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let alreadyExist = await this.existsByUsernameEmail(
      createUserDto.username,
      createUserDto.email)
      
    if (alreadyExist) {
      throw new BadRequestException('User with this username or email already exists');
    }
    
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOneByUsername(username: string)
    : Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async existsByUsernameEmail(username: string, email: string)
    : Promise<boolean | undefined> {
    return await this.userModel
      .countDocuments({ $or: [{ username }, { email }], })
      .exec() > 0;
  }

  async existsByUsername(username: string)
    : Promise<boolean | undefined> {
    return await this.userModel
      .countDocuments({ username })
      .exec() > 0;
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: any): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }
}
