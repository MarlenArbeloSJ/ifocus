export class User {
  public email: string;
  public password: string;
  public remember: boolean;

  constructor() {
    this.email = '';
    this.password = '';
    this.remember = false;
  }
}
