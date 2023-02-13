export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  borrowedBooks: BorrowedBook[];
  updatedAt: Date | null;
  createdAt: Date;
}

export interface IUserProps {
  name: string;
  email: string;
  role: string;
  _id: string;
}

export interface BorrowedBook {
  bookId: string;
  loanDate: string;
  returnDate: Date | null;
  _id: string;
}
