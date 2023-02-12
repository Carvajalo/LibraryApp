export interface IUser {
  _id: string;
  title: string;
  author: string;
  ISBN: string;
  loanHistory: LoanHistory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LoanHistory {
  userId: string;
  loanDate: string;
  returnDate: null | Date;
  _id: string;
}
