import mongoose from "mongoose";
const url = "mongodb+srv://spams001122_db_user:MVaKg2p0ZYhb749k@cluster0.men3tl6.mongodb.net/?appName=Cluster0";

const conn = await mongoose.createConnection(url).asPromise();
const db = conn.useDb("test");

const courses = await db.collection("courses").find({}).toArray();
console.log("=== COURSES ===");
for (const c of courses) {
  console.log(JSON.stringify({
    _id: c._id,
    title: c.title,
    subTitle: c.subTitle,
    category: c.category,
    level: c.level,
    price: c.price,
    isPublished: c.isPublished,
    thumbnail: c.thumbnail,
    creator: c.creator,
    enrolledStudents: (c.enrolledStudents || []).map(String),
    lectures: (c.lectures || []).map(String),
    reviews: (c.reviews || []).map(String),
  }, null, 1));
}

const users = await db.collection("users").find({}).toArray();
console.log("=== USERS ===");
for (const u of users) {
  console.log(JSON.stringify({
    _id: u._id,
    name: u.name,
    email: u.email,
    role: u.role,
    photoUrl: u.photoUrl,
    enrolledCourses: (u.enrolledCourses || []).map(String),
  }, null, 1));
}

const lectures = await db.collection("lectures").find({}).toArray();
console.log("=== LECTURES ===");
for (const l of lectures) {
  console.log(JSON.stringify({
    _id: l._id,
    lectureTitle: l.lectureTitle,
    videoUrl: l.videoUrl,
    isPreviewFree: l.isPreviewFree,
  }));
}

const reviews = await db.collection("reviews").find({}).toArray();
console.log("=== REVIEWS ===");
for (const r of reviews) {
  console.log(JSON.stringify({ _id: r._id, rating: r.rating, comment: r.comment, course: r.course, user: r.user }));
}

await conn.close();