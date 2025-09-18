/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useGetAllUserQuery } from "@/redux/user/userApi";
import {
  useGetSingleCourseQuery,
  useUpdateCourseMutation,
} from "@/redux/course/courseApi";

export type TCourseResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  Data: any;
};

export type IUsers = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type UpdateCourseFormProps = {
  courseId: string;
  closeModal?: () => void;
};

const UpdateCourseForm = ({ courseId, closeModal }: UpdateCourseFormProps) => {
  const [updateCourse] = useUpdateCourseMutation();

  // Fetch users
  const { data: usersData } = useGetAllUserQuery(undefined);
  const users: IUsers[] = usersData?.data || [];
  const instructors = users?.filter((u: IUsers) => u.role === "instructor");

  // Fetch single course
  const { data: courseData } = useGetSingleCourseQuery(courseId);
  const course = courseData?.Data;

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [instructor, setInstructor] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [isPopular, setIsPopular] = useState(false);

  // Populate form with existing course data
  useEffect(() => {
    if (course) {
      setTitle(course.title || "");
      setDescription(course.description || "");
      setPrice(course.price || "");
      setCategory(course.category || "");
      setInstructor(course.instructor?._id || course.instructor || "");
      setThumbnailImage(course.thumbnailImage || "");
      setIsPopular(course.isPopular || false);
    }
  }, [course]);

  const handleUpdateCourse = async (e: any) => {
    e.preventDefault();
    const toastId = toast.loading("Updating course...");

    const updatedCourse = {
      title,
      description,
      price: Number(price),
      category,
      instructor,
      thumbnailImage,
      isPopular,
    };
    console.log("updatedCourse: ", updatedCourse);
    try {
      const res = (await updateCourse({
        id: courseId,
        data: updatedCourse,
      }).unwrap()) as TCourseResponse;
      console.log("Response: ", res);
      if (res.success) {
        toast.success("Course updated successfully!", {
          id: toastId,
          duration: 1500,
        });
        if (closeModal) closeModal();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Course update failed!", {
        id: toastId,
        duration: 1500,
      });
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleUpdateCourse}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Title */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Course Title</label>
          <input
            type="text"
            placeholder="Enter course title"
            className="p-3 rounded-xl border"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Price ($)</label>
          <input
            type="number"
            placeholder="Enter course price"
            className="p-3 rounded-xl border"
            required
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Category</label>
          <input
            type="text"
            placeholder="Enter course category"
            className="p-3 rounded-xl border"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* Instructor */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Instructor</label>
          <select
            className="p-3 rounded-xl border"
            required
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
          >
            <option value="">Select instructor</option>
            {instructors?.map((ins) => (
              <option key={ins._id} value={ins._id}>
                {ins.name}
              </option>
            ))}
          </select>
        </div>

        {/* Thumbnail */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Thumbnail URL</label>
          <input
            type="text"
            placeholder="Enter image URL"
            className="p-3 rounded-xl border"
            required
            value={thumbnailImage}
            onChange={(e) => setThumbnailImage(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 font-medium">Description</label>
          <textarea
            placeholder="Enter course description"
            className="p-3 rounded-xl border"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Popular */}
        <div className="flex items-center gap-2 md:col-span-2">
          <input
            type="checkbox"
            checked={isPopular}
            onChange={(e) => setIsPopular(e.target.checked)}
            className="h-5 w-5 rounded"
          />
          <span className="font-medium">Mark as Popular</span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default UpdateCourseForm;
