/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllCoursesQuery } from "@/redux/course/courseApi";
import heroImage from "../../assets/images/skilss.jpg";
import { useGetAllStoriesQuery } from "@/redux/story/storyApi";

type Course = {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnailImage: string;
  instructor: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
};

type SuccessStory = {
  _id: string;
  studentName: string;
  courseName: string;
  storyText: string;
};

const Home = () => {
  // Fetch courses using RTK Query
  const {
    data: courseData,
    isLoading: coursesLoading,
    isError: coursesError,
  } = useGetAllCoursesQuery(undefined);
  const coursess: Course[] = courseData?.data || [];
  const courses = coursess.filter((c: any) => c.isPopular === true);

  // Fetch success stories using RTK Query
  const {
    data: storyData,
    isLoading: storiesLoading,
    isError: storiesError,
  } = useGetAllStoriesQuery(undefined);
  const stories: SuccessStory[] = storyData?.data || [];
  console.log(courseData, storyData);
  // Helper check if thumbnail is YouTube URL
  const isYoutubeUrl = (str: string) =>
    str.includes("youtu.be") || str.includes("youtube.com/watch");

  // Convert YouTube URL → embed URL
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

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[400px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Learn. Grow. Succeed.
          </h1>
          <p className="text-lg md:text-xl text-white mb-6 max-w-2xl drop-shadow-md">
            Explore top courses, learn from experts, and be part of inspiring
            success stories.
          </p>
          <a
            href="/courses"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1"
          >
            Browse Courses
          </a>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Popular Courses
          </h2>

          {coursesLoading && <p>Loading courses...</p>}
          {coursesError && <p>Error loading courses!</p>}

          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="p-6 border border-gray-300 rounded-lg shadow hover:shadow-lg transition bg-gray-50 dark:bg-gray-700"
              >
                {/* Thumbnail */}
                {isYoutubeUrl(course.thumbnailImage) ? (
                  <div className="w-full relative pb-[56.25%] mb-4 rounded overflow-hidden">
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
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                )}

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Instructor: {course.instructor?.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {course.description.slice(0, 80)}...
                </p>
                <p className="text-blue-600 font-bold mb-4">${course.price}</p>
                <a
                  href={`/courses/${course._id}`}
                  className="text-blue-600 hover:underline"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Success Stories
          </h2>

          {storiesLoading && <p>Loading success stories...</p>}
          {storiesError && <p>Error loading success stories!</p>}

          <div className="grid md:grid-cols-2 gap-6">
            {stories.map((story) => (
              <div
                key={story._id}
                className="p-6 border border-gray-300 rounded-lg shadow hover:shadow-lg transition bg-white dark:bg-gray-800"
              >
                <p className="italic text-gray-700 dark:text-gray-300 mb-4">
                  “{story.storyText}”
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  — {story.studentName}, {story.courseName}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
