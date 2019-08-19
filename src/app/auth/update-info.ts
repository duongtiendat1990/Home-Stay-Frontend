import {Gender} from './gender';

export class UpdateInfo {
  name: string;
  birthday: Date;
  gender: Gender;
  address: string;
  phoneNumber: string;
  avatarUrl: string;

  constructor(name?: string, birthday?: Date, gender?: Gender, address?: string, phoneNumber?: string, avatarUrl?: string) {
    this.name = name;
    this.birthday = birthday;
    this.gender = gender;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.avatarUrl = avatarUrl;
  }
}
