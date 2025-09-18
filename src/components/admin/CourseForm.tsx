/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateCourseMutation } from "@/redux/course/courseApi";
import { useGetAllUserQuery } from "@/redux/user/userApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

const CourseForm = ({ closeModal }: { closeModal?: () => void }) => {
  const navigate = useNavigate();
  const [addCourse] = useCreateCourseMutation();

  const { data: usersData } = useGetAllUserQuery(undefined);
  const users: IUsers[] = usersData?.data || [];
  const instructors = users?.filter((u: IUsers) => u.role === "instructor");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [instructor, setInstructor] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [isPopular, setIsPopular] = useState(false);

  const handleCreateCourse = async (e: any) => {
    e.preventDefault();
    const toastId = toast.loading("Creating course...");

    const courseData = {
      title,
      description,
      price: Number(price),
      category,
      instructor,
      thumbnailImage,
      isPopular,
    };

    try {
      const res = (await addCourse(courseData).unwrap()) as TCourseResponse;
      if (res.success) {
        toast.success("Course created successfully!", {
          id: toastId,
          duration: 1500,
        });
        if (closeModal) closeModal();
        navigate("/courses");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Course creation failed!", {
        id: toastId,
        duration: 1500,
      });
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Add New Course
      </h2>

      {/* Form */}
      <form
        onSubmit={handleCreateCourse}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Course Title */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
            Course Title
          </label>
          <input
            name="title"
            type="text"
            placeholder="Enter course title"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
            Price ($)
          </label>
          <input
            name="price"
            type="number"
            placeholder="Enter course price"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
            Category
          </label>
          <input
            name="category"
            type="text"
            placeholder="Enter course category"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* Instructor */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
            Instructor
          </label>
          <select
            name="instructor"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
          <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
            Thumbnail URL
          </label>
          <input
            name="thumbnailImage"
            type="text"
            placeholder="Enter image URL"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
            value={thumbnailImage}
            onChange={(e) => setThumbnailImage(e.target.value)}
          />
        </div>

        {/* Description (Full width) */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter course description"
            rows={4}
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Popular Checkbox */}
        <div className="flex items-center gap-2 md:col-span-2">
          <input
            type="checkbox"
            checked={isPopular}
            onChange={(e) => setIsPopular(e.target.checked)}
            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Mark as Popular
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="md:col-span-2 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold 
            hover:bg-blue-700 transition"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
