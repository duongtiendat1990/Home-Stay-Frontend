export class UpdateInfo {
  name: string;
  email: string;
  avatar: File;

  constructor(name: string, email: string, avatar: File) {
    this.name = name;
    this.email = email;
    this.avatar = avatar;
  }
}
