/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllCoursesQuery } from "@/redux/course/courseApi";
import { useState } from "react";
import { Link } from "react-router-dom";

type Instructor = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type Course = {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnailImage: string;
  instructor: Instructor;
  isPopular?: boolean;
};

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "popular">("all");
  const [priceSort, setPriceSort] = useState<"none" | "asc" | "desc">("none");

  const {
    data: courseData,
    isLoading,
    isError,
  } = useGetAllCoursesQuery(undefined);

  const courses: Course[] = courseData?.data || [];

  const isYoutubeUrl = (str: string) =>
    str.includes("youtu.be") || str.includes("youtube.com/watch");

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

  //  Professional Loading Skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-6 lg:px-0">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          All Courses
        </h1>
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow bg-gray-50 dark:bg-gray-800 animate-pulse"
            >
              <div className="w-full h-40 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-1/2"></div>
              <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-20 mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">Failed to load courses.</p>
    );
  }

  // Filter courses by search term
  let filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter popular courses
  if (filter === "popular") {
    filteredCourses = filteredCourses.filter((course) => course.isPopular);
  }

  // Sort by price
  if (priceSort === "asc") {
    filteredCourses = filteredCourses.sort((a, b) => a.price - b.price);
  } else if (priceSort === "desc") {
    filteredCourses = filteredCourses.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="container mx-auto py-5 px-6 lg:px-0">
      <h1 className="text-3xl pt-10 font-bold mb-6 text-gray-900 dark:text-white">
        All Courses
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <input
          type="text"
          placeholder="Search by title or instructor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All Courses</option>
            <option value="popular">Popular</option>
          </select>

          <select
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value as any)}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="none">Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredCourses.length === 0 && (
          <p className="col-span-3 text-gray-600 dark:text-gray-300">
            No courses found.
          </p>
        )}

        {filteredCourses.map((course) => (
          <div
            key={course._id}
            className="p-6 border border-gray-300 rounded-lg shadow hover:shadow-lg transition bg-gray-50 dark:bg-gray-700"
          >
            {/* Thumbnail */}
            <div className="w-full relative rounded overflow-hidden mb-4">
              {course.isPopular && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                  Popular
                </span>
              )}

              {isYoutubeUrl(course.thumbnailImage) ? (
                <div className="w-full relative pb-[56.25%]">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={getYoutubeEmbedUrl(course.thumbnailImage)}
                    title={course.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <img
                  src={course.thumbnailImage}
                  alt={course.title}
                  className="w-full h-52 object-cover rounded"
                />
              )}
            </div>

            {/* Course Info */}
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {course.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Instructor: {course.instructor.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {course.description.slice(0, 80)}...
            </p>
            <p className="text-blue-600 font-bold mb-4">${course.price}</p>
            <Link
              to={`/courses/${course._id}`}
              className="text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
