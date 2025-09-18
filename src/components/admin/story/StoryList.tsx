/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetAllStoriesQuery } from "@/redux/story/storyApi";
import { selectCurrentUser } from "@/redux/auth/authSlice";
import StoryForm from "../StoryForm";

const StoryList = () => {
  const user = useSelector(selectCurrentUser) as any;
  const { data, isLoading, isError } = useGetAllStoriesQuery(undefined);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stories = data?.data || [];

  const filteredStories = useMemo(() => {
    if (!searchQuery.trim()) return stories;
    const query = searchQuery.toLowerCase();
    return stories.filter(
      (s: any) =>
        s.studentName?.toLowerCase().includes(query) ||
        s.courseName?.toLowerCase().includes(query) ||
        s.storyText?.toLowerCase().includes(query)
    );
  }, [stories, searchQuery]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-5">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Success Stories
        </h1>
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-20 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load success stories.
      </p>
    );

  return (
    <div className="container mx-auto py-10 px-5 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Success Stories
        </h1>
        {/* Add Story button (Admin Only) */}
        {user?.role === "admin" && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Story
          </button>
        )}
      </div>

      {/* Search */}
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Search by student or course..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded w-full
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
            focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Student</th>
              <th className="py-3 px-6 text-left">Course</th>
              <th className="py-3 px-6 text-left">Story</th>
            </tr>
          </thead>
          <tbody>
            {filteredStories.map((story: any, index: number) => (
              <tr
                key={story._id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition"
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{story.studentName}</td>
                <td className="py-3 px-6">{story.courseName}</td>
                <td className="py-3 px-6">{story.storyText}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div
            className="relative w-full max-w-4xl mx-4 sm:mx-6 md:mx-8 lg:mx-auto 
        bg-white dark:bg-gray-800 rounded-2xl shadow-2xl 
        max-h-screen overflow-y-auto p-6 pointer-events-auto"
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 dark:hover:text-red-500 font-bold cursor-pointer  text-3xl"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <StoryForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryList;
