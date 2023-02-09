import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  borrowedBooks: IBorrowedBooksSchema[];
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  newPassword: (password: string) => Promise<string>;
}

export interface IBorrowedBooksSchema {
  bookId: string;
  loanDate: Date;
  returnDate: Date | null;
}

const borrowedBooksSchema: Schema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  loanDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
  },
});

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    borrowedBooks: [borrowedBooksSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre<IUser>("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

UserSchema.methods.newPassword = function (password: string) {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return err;
    }
    this.password = hash;
  });
};

UserSchema.methods.comparePassword = function (
  candidatePassword: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      resolve(isMatch);
    });
  });
};

export default model<IUser>("User", UserSchema);
