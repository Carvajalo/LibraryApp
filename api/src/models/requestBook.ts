import { Schema, model, Document } from "mongoose";

export interface IRequestBook extends Document {
  bookId: string;
  userId: string;
  status: string;
}

const RequestBookSchema: Schema = new Schema(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "returned", "deleted"],
      default: "pending",
    },
    returnDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("RequestBook", RequestBookSchema);
