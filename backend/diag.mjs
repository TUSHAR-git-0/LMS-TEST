import mongoose from "mongoose";
const url = "mongodb+srv://spams001122_db_user:MVaKg2p0ZYhb749k@cluster0.men3tl6.mongodb.net/?appName=Cluster0";

const courseSchema = new mongoose.Schema({}, { strict: false });
const userSchema = new mongoose.Schema({}, { strict: false });

const Course = mongoose.model("Course", courseSchema);
const User = mongoose.model("User", userSchema);

await mongoose.connect(url, { dbName: "lms" });
console.log("connected");

const courses = await Course.find({});
console.log("TOTAL COURSES:", courses.length);
for (const c of courses) {
  console.log(JSON.stringify({
    _id: c._id,
    title: c.title,
    category: c.category,
    price: c.price,
    isPublished: c.isPublished,
    thumbnail: c.thumbnail,
    enrolled: (c.enrolledStudents || []).length,
  }));
}

const users = await User.find({});
console.log("TOTAL USERS:", users.length);
for (const u of users) {
  console.log(JSON.stringify({
    _id: u._id,
    name: u.name,
    role: u.role,
    enrolledCourses: (u.enrolledCourses || []).map(String),
  }));
}

await mongoose.disconnect();