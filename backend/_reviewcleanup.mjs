import mongoose from "mongoose";
import dotenv from "dotenv";
import Review from "./models/reviewModel.js";
import Course from "./models/courseModel.js";
import User from "./models/userModel.js";
dotenv.config();

await mongoose.connect(process.env.MONGODB_URL, { serverSelectionTimeoutMS: 20000, connectTimeoutMS: 20000 });
console.log("connected");

const allReviews = await Review.find().lean();
const courseIds = new Set((await Course.find().select("_id").lean()).map((c) => String(c._id)));
const userIds = new Set((await User.find().select("_id").lean()).map((u) => String(u._id)));

let orphaned = 0;
for (const r of allReviews) {
  const cOk = courseIds.has(String(r.course));
  const uOk = userIds.has(String(r.user));
  if (!cOk || !uOk) {
    await Review.findByIdAndDelete(r._id);
    orphaned++;
  }
}
console.log("orphaned reviews deleted:", orphaned);
mongoose.disconnect();
process.exit(0);