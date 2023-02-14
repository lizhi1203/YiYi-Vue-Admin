export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password: string;
  }
  export interface ResLogin {
    access_token: string;
  }
  export interface ResAuthButtons {
    [key: string]: string[]
  }
}

export namespace User {
  export interface ResUserList {
		id: string;
		username: string;
		gender: string;
		user: {
			detail: {
				age: number;
			};
		};
		idCard: string;
		email: string;
		address: string;
		createTime: string;
		status: number;
		avatar: string;
		children?: ResUserList[];
	}
}