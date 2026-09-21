import Course from "../models/courseModel.js"
import Lecture from "../models/lectureModel.js"
import Review from "../models/reviewModel.js"
import User from "../models/userModel.js"
import { deleteLocalFile } from "../utils/localFile.js"

// create Courses
export const createCourse = async (req,res) => {

    try {
        const {title,category} = req.body
        if(!title || !category){
            return res.status(400).json({message:"title and category is required"})
        }
        const course = await Course.create({
            title,
            category,
            creator: req.userId
        })
        
        return res.status(201).json(course)
    } catch (error) {
         return res.status(500).json({message:`Failed to create course ${error}`})
    }
    
}

export const getPublishedCourses = async (req,res) => {
    try {
        const courses = await Course.find({isPublished:true}).populate("lectures reviews")
        if(!courses)
        {
            return res.status(404).json({message:"Course not found"})
        }

        return res.status(200).json(courses)
        
    } catch (error) {
          return res.status(500).json({message:`Failed to get All  courses ${error}`})
    }
}


export const getCreatorCourses = async (req,res) => {
    try {
        const userId = req.userId
        const courses = await Course.find({creator:userId})
        if(!courses)
        {
            return res.status(404).json({message:"Course not found"})
        }
        return res.status(200).json(courses)
        
    } catch (error) {
        return res.status(500).json({message:`Failed to get creator courses ${error}`})
    }
}

export const editCourse = async (req,res) => {
    try {
        const {courseId} = req.params;
        const {title , subTitle , description , category , level , price , isPublished } = req.body;
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message:"Course not found"})
        }
        const updateData = {}

        if(title) updateData.title = title
        if(subTitle) updateData.subTitle = subTitle
        if(description !== undefined) updateData.description = description
        if(category) updateData.category = category
        if(level) updateData.level = level
        if(price !== undefined && price !== "") updateData.price = price
        updateData.isPublished = isPublished === true || isPublished === "true"

        if(req.file){
            // remove old thumbnail before replacing
            deleteLocalFile(course.thumbnail)
            updateData.thumbnail = `/uploads/${req.file.filename}`
        }

        course = await Course.findByIdAndUpdate(courseId , updateData , {new:true})
        return res.status(201).json(course)
    } catch (error) {
        return res.status(500).json({message:`Failed to update course ${error}`})
    }
}


export const getCourseById = async (req,res) => {
    try {
        const {courseId} = req.params
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message:"Course not found"})
        }
         return res.status(200).json(course)
        
    } catch (error) {
        return res.status(500).json({message:`Failed to get course ${error}`})
    }
}
export const removeCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    deleteLocalFile(course.thumbnail);
    for (const lectureId of course.lectures) {
      const lecture = await Lecture.findById(lectureId);
      if (lecture) deleteLocalFile(lecture.videoUrl);
    }

    await Lecture.deleteMany({ _id: { $in: course.lectures } });
    await Review.deleteMany({ _id: { $in: course.reviews } });

    await course.deleteOne();
    return res.status(200).json({ message: "Course Removed Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({message:`Failed to remove course ${error}`})
  }
};

export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (!course.isPublished) {
      return res.status(400).json({ message: "This course is not published yet" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyEnrolled = user.enrolledCourses.some(
      (id) => id.toString() === courseId
    );
    if (alreadyEnrolled) {
      return res.status(400).json({ message: "You are already enrolled in this course" });
    }

    const price = Number(course.price);
    if (price > 0) {
      return res.status(400).json({ message: "Please complete the payment to enroll in this course" });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    course.enrolledStudents.push(userId);
    await course.save();

    return res.status(200).json({ message: "Enrolled successfully. Start learning now!", course });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Failed to enroll in course ${error}` });
  }
};



//create lecture

export const createLecture = async (req,res) => {
    try {
        const {lectureTitle}= req.body
        const {courseId} = req.params

        if(!lectureTitle || !courseId){
             return res.status(400).json({message:"Lecture Title required"})
        }
        const lecture = await Lecture.create({lectureTitle})
        const course = await Course.findById(courseId)
        if(course){
            course.lectures.push(lecture._id)
            
        }
        await course.populate("lectures")
        await course.save()
        return res.status(201).json({lecture,course})
        
    } catch (error) {
        return res.status(500).json({message:`Failed to Create Lecture ${error}`})
    }
    
}

export const getCourseLecture = async (req,res) => {
    try {
        const {courseId} = req.params
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message:"Course not found"})
        }
        await course.populate("lectures")
        await course.save()
        return res.status(200).json(course)
    } catch (error) {
        return res.status(500).json({message:`Failed to get Lectures ${error}`})
    }
}

export const editLecture = async (req,res) => {
    try {
        const {lectureId} = req.params
        const {isPreviewFree , lectureTitle} = req.body
        const lecture = await Lecture.findById(lectureId)
          if(!lecture){
            return res.status(404).json({message:"Lecture not found"})
        }
        if(req.file){
            deleteLocalFile(lecture.videoUrl)
            lecture.videoUrl = `/uploads/${req.file.filename}`
                }
        if(lectureTitle){
            lecture.lectureTitle = lectureTitle
        }
        lecture.isPreviewFree = isPreviewFree === true || isPreviewFree === "true"
        
         await lecture.save()
        return res.status(200).json(lecture)
    } catch (error) {
        return res.status(500).json({message:`Failed to edit Lectures ${error}`})
    }
    
}

export const removeLecture = async (req,res) => {
    try {
        const {lectureId} = req.params
        const lecture = await Lecture.findById(lectureId)
        if(!lecture){
             return res.status(404).json({message:"Lecture not found"})
        }
        deleteLocalFile(lecture.videoUrl)
        await lecture.deleteOne()
        //remove the lecture from associated course

        await Course.updateOne(
            {lectures: lectureId},
            {$pull:{lectures: lectureId}}
        )
        return res.status(200).json({message:"Lecture Remove Successfully"})
        }
    
     catch (error) {
        return res.status(500).json({message:`Failed to remove Lectures ${error}`})
    }
}



//get Creator data


// controllers/userController.js

export const getCreatorById = async (req, res) => {
  try {
    const {userId} = req.body;

    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json( user );
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "get Creator error" });
  }
};




