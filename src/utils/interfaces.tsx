export interface topic {
  questions: question[];
}

interface question {
  contributor: user;
  text: string;
  answers: answer[];
}

interface answer {
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