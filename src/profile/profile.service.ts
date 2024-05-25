import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from 'src/schemas/profile.schema';
import { CreateProfileDto, UpdateProfileDto } from 'src/dto/write-profile-dto';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>) {}

  async get(username: string): Promise<Profile> {
    var profile = await this.profileModel.findOne({ username })
    if (!profile) {
        throw new BadRequestException('Profile with this username not found');
    }

    return profile;
  }

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const username = createProfileDto.username
    var profile = await this.profileModel.findOne({ username })
    if (profile) {
        throw new BadRequestException('Profile with this username already exists');
    }

    let createdProfile = new this.profileModel(createProfileDto)
    return createdProfile.save();
  }

  async update(updateProfileDto: UpdateProfileDto): Promise<Profile> {
    const username = updateProfileDto.username
    var profile = await this.get(username)

    return this.profileModel.findOneAndUpdate(
        { username },
        updateProfileDto,
        { new: true }
    ).exec();
  }

}
