
export class Mail {

  private from: string;
  private to: string;
  private subject: string;
  private text: string;

  constructor(from: string, to: string, subject: string, text: string) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.text = text;
  }

  getFrom() {
    return this.from;
  }

  getTo() {
    return this.to;
  }

  getSubject() {
    return this.subject;
  }

  getText() {
    return this.text;
  }
}