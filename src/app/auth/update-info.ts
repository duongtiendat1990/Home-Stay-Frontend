import {Gender} from './gender';

export class UpdateInfo {
  name: string;
  birthday: Date;
  gender: Gender;
  address: string;
  phoneNumber: string;
  avatar: File;

  constructor(name: string, birthday: Date, gender: Gender, address: string, phoneNumber: string, avatar: File) {
    this.name = name;
    this.birthday = birthday;
    this.gender = gender;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.avatar = avatar;
  }
}
