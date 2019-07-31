export class UpdateInfo {
  name: string;
  avatar: File;

  constructor(name: string, avatar: File) {
    this.name = name;
    this.avatar = avatar;
  }
}
