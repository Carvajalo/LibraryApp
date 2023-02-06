import { Schema, model, Document } from "mongoose";

export interface ILoanHistory {
  userId: string;
  loanDate: Date;
  returnDate: Date | null;
}

export interface IBook extends Document {
  title: string;
  author: string;
  ISBN: string;
  loanHistory: ILoanHistory[];
}

const LoanHistorySchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
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

const bookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    ISBN: {
      type: String,
      required: true,
      unique: true,
    },
    loanHistory: [LoanHistorySchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IBook>("Book", bookSchema);
