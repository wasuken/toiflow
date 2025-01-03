export interface QuestionPreset {
  title: string;
  questionList: Question[];
}

export interface QuestionList {
  id: number;
  title: string;
  questionList: Question[];
}

export interface Question {
  id: number;
  name: string;
}

// 表示用。最低限しか存在しない
export interface SimpleUser {
  id: number;
  name: string;
}

export interface UserQuestionAnswer {
  id: number;
  user: SimpleUser;
  question: Question;
  answer: string;
}
