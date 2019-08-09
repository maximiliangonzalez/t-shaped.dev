export interface ReduxStore {
  auth: {
    loggedIn: boolean,
    username: string,
    message: string
  };
  userInfo: {
    following: topic[]
  };
}

export interface topic {
  name: string;
  tags: string[];
  questions: question[];
}

export interface question {
  contributor: user;
  text: string;
  answers: answer[];
}

export interface answer {
  contributor: user;
  text: string;
  replies: reply[];
}

interface reply {
  contributor: user;
  text: string;
}

interface user {
  name: string;
  password: string;
  following: topic[];
}

