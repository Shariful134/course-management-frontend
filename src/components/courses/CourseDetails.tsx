/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetSingleCourseQuery } from "@/redux/course/courseApi";
import { useState } from "react";
import { useParams } from "react-router-dom";

// Instructor type
type Instructor = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

// Course type
type Course = {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnailImage: string;
  instructor: Instructor;
};

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Fetch single course using RTK Query
  const { data: courseData, isLoading, isError } = useGetSingleCourseQuery(id);

  const course: Course | undefined = courseData?.Data;

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert("Please fill in all required fields.");
      return;
    }
    setFormSubmitted(true);
    console.log({ name, email, phone, message, courseId: course?._id });
  };

  // Check if URL is YouTube
  const isYoutubeUrl = (url: string) =>
    url.includes("youtu.be") || url.includes("youtube.com/watch");

  // Convert YouTube URL to embed URL
  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("youtube.com/watch")) {
      const params = new URLSearchParams(url.split("?")[1]);
      return `https://www.youtube.com/embed/${params.get("v")}`;
    }
    return url;
  };

  // Professional Skeleton Loader
  if (isLoading) {
    return (
      <div className="container mx-auto py-16 animate-pulse px-6 lg:px-0">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left side skeleton */}
          <div className="lg:w-1/2 w-full flex flex-col gap-6">
            <div className="w-full h-80 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            <div className="h-8 w-2/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-20 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>

          {/* Right side skeleton (form) */}
          <div className="lg:w-1/2 w-full bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col gap-4">
            <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-12 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-12 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-12 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-20 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-12 w-1/2 bg-blue-300 dark:bg-blue-600 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !course)
    return (
      <p className="p-6 text-center text-gray-600 dark:text-gray-300">
        Course not found.
      </p>
    );

  return (
    <div className="container  mx-auto py-16 px-6 lg:px-0">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left side: Course details */}
        <div className="lg:w-1/2 w-full flex flex-col gap-6">
          {isYoutubeUrl(course.thumbnailImage) ? (
            <div className="w-full relative pb-[56.25%] rounded shadow-lg overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={getYoutubeEmbedUrl(course.thumbnailImage)}
                title={course.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <img
              src={course.thumbnailImage}
              alt={course.title}
              className="w-full h-80 object-cover rounded shadow-lg"
            />
          )}

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {course.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            Instructor: {course.instructor.name} ({course.instructor.email})
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            {course.description}
          </p>
          <p className="text-blue-600 font-bold text-xl">${course.price}</p>
        </div>

        {/* Right side: Enrollment form */}
        <div className="lg:w-1/2 w-full bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Enroll in this Course
          </h2>
          {formSubmitted ? (
            <p className="text-green-600 dark:text-green-400 font-semibold">
              Thank you for enrolling! We will contact you soon.
            </p>
          ) : (
            <form onSubmit={handleEnroll} className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">
                  Message (optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  rows={4}
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-6 py-3 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
              >
                Enroll Now
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
