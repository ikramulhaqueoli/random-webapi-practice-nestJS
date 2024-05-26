import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from 'src/schemas/profile.schema';
import { CreateProfileDto, UpdateProfileDto } from 'src/dto/write-profile-dto';
import { ZodiacCalculatorUtil } from 'src/utils/zodiac-calculator.util';
import { HoroscopeCalculatorUtil } from 'src/utils/horoscope-calculator.util';

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

  async create(username: string, createProfileDto: CreateProfileDto): Promise<Profile> {
    var profile = await this.profileModel.findOne({ username })
    if (profile) {
        throw new BadRequestException('Profile with this username already exists');
    }

    let createdProfile = new this.profileModel(createProfileDto)

    this.calculateZodiacAndHoroscope(createdProfile, createProfileDto.birthday);
    
    return createdProfile.save();
  }

  async update(username: string, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    await this.get(username)

    const fieldsToUpdate: Partial<UpdateProfileDto> = {};

    Object.entries(updateProfileDto).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            fieldsToUpdate[key] = value;
        }
    });

    this.calculateZodiacAndHoroscope(fieldsToUpdate, updateProfileDto.birthday)

    return this.profileModel
        .findOneAndUpdate({ username }, fieldsToUpdate, { new: true })
        .exec();
  }
  
  calculateZodiacAndHoroscope(document: any, birthday?: Date) {
    if (birthday) {
            const horoscope = HoroscopeCalculatorUtil.getHoroscopeByBirthDay(birthday);
            const zodiac = ZodiacCalculatorUtil.getZodiacSign(birthday);
            
            document['zodiac'] = zodiac;
            document['horoscope'] = horoscope;
        }
    }
}
