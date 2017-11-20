
export class User {

  email: string;
  password: any;
  passwordRepeat: any;
  session: Session;
  roles: string[];

  constructor(email: string, password: any, session: Session, roles: string[]) {

    this.email = email;
    this.password = password;
    this.session = session
    this.roles = roles;
  }
}

export class UserBuilder {

  email: string;
  password: any;
  passwordRepeat: any;
  session: Session;
  roles: string[];

  constructor() {
    this.clear()
    return this;
  }

  private clear() {
    this.email = null;
    this.password = null;
    this.passwordRepeat = null;
    this.session = null;
    this.roles = null;
  }

  public withEmail(email: string) {
    this.email = email;
    return this;
  }

  public withPassword(password: any) {
    this.password = password;
    return this;
  }

  public withPasswordRepeat(passwordRepeat: any) {
    this.passwordRepeat = passwordRepeat;
    return this;
  }

  public withSession(token: string) {
    this.session = new SessionBuilder()
      .withToken(token)
      .withExpireDate()
      .build();
    return this;
  }

  public withRoles(roles: string[]) {
    this.roles = roles;
    return this;
  }

  public build() {
    const user = new User(this.email, this.password,
      this.session, this.roles);
    this.clear();
    return user;
  }
}

class Session {

  token: string;
  expireDate: Date;

  constructor(token: string, expireDate: Date) {
    this.token = token;
    this.expireDate = expireDate;
  }

  public tokenExpired() {
    const today = new Date;
    return this.expireDate < today;
  }
}

class SessionBuilder {

  token: string;
  expireDate: Date;

  constructor() {
    this.clear();
    return this;
  }

  private clear() {
    this.token = null;
    this.expireDate = null;
  }

  withToken(token: string) {
    this.token = token;
    return this;
  }

  withExpireDate() {
    const now = new Date;
    const newDate = now.setHours(now.getHours() + 2);
    this.expireDate = new Date(newDate);
    return this;
  }

  build() {
    const session = new Session(this.token, this.expireDate);
    this.clear();
    return session;
  }
}