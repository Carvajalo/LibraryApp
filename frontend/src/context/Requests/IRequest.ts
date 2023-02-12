export interface IRequests {
  _id: string;
  bookId: string;
  userId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  book: Book;
}

export interface Book {
  title: string;
  author: string;
  ISBN: string;
}

export interface User {
  name: string;
  email: string;
}
