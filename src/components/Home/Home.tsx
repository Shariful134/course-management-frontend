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
  const {
    data: courseData,
    isLoading: coursesLoading,
    isError: coursesError,
  } = useGetAllCoursesQuery(undefined);
  const coursess: Course[] = courseData?.data || [];
  const courses = coursess.filter((c: any) => c.isPopular === true);

  const {
    data: storyData,
    isLoading: storiesLoading,
    isError: storiesError,
  } = useGetAllStoriesQuery(undefined);
  const stories: SuccessStory[] = storyData?.data || [];

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

  //  Skeleton Loader Component
  const CourseSkeleton = () => (
    <div className="p-6 border border-gray-200 rounded-lg shadow bg-gray-100 dark:bg-gray-700 animate-pulse">
      <div className="w-full h-40 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
    </div>
  );

  const StorySkeleton = () => (
    <div className="p-6 border border-gray-200 rounded-lg shadow bg-gray-100 dark:bg-gray-700 animate-pulse">
      <div className="h-20 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
    </div>
  );

  return (
    <div className="container mx-auto">
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
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Popular Courses
        </h2>

        {coursesError && <p className="text-red-500">Error loading courses!</p>}

        <div className="grid md:grid-cols-3 gap-6">
          {coursesLoading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <CourseSkeleton key={idx} />
              ))
            : courses.map((course) => (
                <div
                  key={course._id}
                  className="p-6 border border-gray-300 rounded-lg shadow hover:shadow-lg transition bg-gray-50 dark:bg-gray-700"
                >
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
                  <p className="text-blue-600 font-bold mb-4">
                    ${course.price}
                  </p>
                  <a
                    href={`/courses/${course._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </a>
                </div>
              ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Success Stories
        </h2>

        {storiesError && (
          <p className="text-red-500">Error loading success stories!</p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {storiesLoading
            ? Array.from({ length: 2 }).map((_, idx) => (
                <StorySkeleton key={idx} />
              ))
            : stories.map((story) => (
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
      </section>
    </div>
  );
};

export default Home;
