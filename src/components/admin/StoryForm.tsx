/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateStoryMutation } from "@/redux/story/storyApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export type TStoryResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  Data: any;
};

const StoryForm = () => {
  const navigate = useNavigate();
  const [createStory] = useCreateStoryMutation();

  // state
  const [studentName, setStudentName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [storyText, setStoryText] = useState("");

  // submit handler
  const handleCreateStory = async (e: any) => {
    e.preventDefault();
    const toastId = toast.loading("Creating story...");

    const storyData = {
      studentName,
      courseName,
      storyText,
    };

    try {
      const res = (await createStory(storyData).unwrap()) as TStoryResponse;
      if (res.success) {
        toast.success("Story created successfully!", {
          id: toastId,
          duration: 1500,
        });
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Story creation failed!", {
        id: toastId,
        duration: 1500,
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-10 bg-white dark:bg-gray-800 rounded-3xl ">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Share Your Success Story
      </h2>

      <form
        onSubmit={handleCreateStory}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Student Name */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
            Student Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>

        {/* Course Name */}
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
            Course Name
          </label>
          <input
            type="text"
            placeholder="Enter course name"
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>

        {/* Story Text (Full Width) */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
            Your Story
          </label>
          <textarea
            placeholder="Share your success story..."
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition min-h-[140px]"
            required
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="md:col-span-2 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
            hover:bg-blue-700 transition"
        >
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default StoryForm;
