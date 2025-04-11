export class CreateUserDto {
  email: string;
  password: string;
}

export class FindUserByEmailDto {
  email: string;
  constructor(email: string) {
    this.email = email;
  }
}
