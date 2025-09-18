import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface CompanyType {
  name: string;
  contactEmail: string;
  contactPhone: string;
}

export interface JobType extends Document {
  title: string;
  type: string;
  description: string;
  company: CompanyType;
  user_id: mongoose.Types.ObjectId;
}

const jobSchema: Schema<JobType> = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    company: {
      name: { type: String, required: true },
      contactEmail: { type: String, required: true },
      contactPhone: { type: String, required: true },
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { versionKey: false }
);

// Add virtual field "id"
jobSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = (ret._id as string|Types.ObjectId).toString();
    delete ret._id; // optional: remove _id to clean up response
    return ret;
  },
});

const Job: Model<JobType> = mongoose.model<JobType>("Job", jobSchema);

export default Job;
