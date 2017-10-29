export class MailValidator {

	public static validate(email) {
		if (this.validateEmail(email)) {
		  return true;
		}
		else {
			throw new EmailNotValidError();
		}
	}

	private static validateEmail (email) {
		return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
	}
}

class EmailNotValidError extends Error {
  constructor() {
		super ("Provided e-mail is not valid.");
	}
}