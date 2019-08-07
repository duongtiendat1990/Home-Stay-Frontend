import {Gender} from './gender';
export class SignUpInfo {
  name: string;
  username: string;
  email: string;
  birthday: Date;
  gender: Gender;
  address: string;
  phoneNumber: string;
  password: string;
  avatar: File;

  constructor(name: string, username: string, email: string, birthday: Date, gender: Gender,
              address: string, phoneNumber: string, password: string, avatar: File) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.birthday = birthday;
    this.gender = gender;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.avatar = avatar;
  }
}
