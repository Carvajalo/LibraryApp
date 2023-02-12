export interface IBookRequest {
  title?: string;
  author?: string;
  ISBN?: string;
}

export interface IBookProps {
  title: string;
  author: string;
  ISBN: string;
}
export interface IBook extends IBookProps {
  _id: string;
  loanHistory: ILoanHistory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ILoanHistory {
  userId: string;
  loanDate: Date;
  returnDate: Date | null;
  _id: string;
}
