export class SignUpInfo {
    name: string;
    username: string;
    email: string;
    role: string[];
    password: string;
    avatar: File;

    constructor(name: string, username: string, email: string, password: string, avatar: File) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = ['user'];
        this.avatar = avatar;
    }
}
