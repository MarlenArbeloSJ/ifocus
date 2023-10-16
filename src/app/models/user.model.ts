export class User {

  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public country : string;
  public onBoardingDone : boolean;
  public blocked : boolean;
  public enabled : boolean;
  public roles : string[] = [];
}
