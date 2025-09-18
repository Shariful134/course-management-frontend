/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import {
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
} from "@/redux/course/courseApi";
import { selectCurrentUser } from "@/redux/auth/authSlice";
import UpdateCourseForm from "./CourseUpdate";
import CourseForm from "./CourseForm"; // ✅ Import CourseForm

const CourseList = () => {
  const user = useSelector(selectCurrentUser) as any;

  const { data, isLoading, isError } = useGetAllCoursesQuery(undefined);
  const [deleteCourse] = useDeleteCourseMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false); // ✅ for Add Course

  // Search, filter, sort
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPopular, setFilterPopular] = useState<"all" | "yes" | "no">(
    "all"
  );
  const [sortPrice, setSortPrice] = useState<"asc" | "desc" | "none">("none");

  const courses = data?.data || [];
  const filteredCourses = useMemo(() => {
    let filtered = [...courses];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c: any) =>
          c.title?.toLowerCase().includes(query) ||
          c.description?.toLowerCase().includes(query) ||
          c.category?.toLowerCase().includes(query) ||
          c.instructor?.name?.toLowerCase().includes(query)
      );
    }

    if (filterPopular !== "all") {
      filtered = filtered.filter((c: any) =>
        filterPopular === "yes" ? c.isPopular : !c.isPopular
      );
    }

    if (sortPrice !== "none") {
      filtered.sort((a: any, b: any) =>
        sortPrice === "asc" ? a.price - b.price : b.price - a.price
      );
    }

    return filtered;
  }, [courses, searchQuery, filterPopular, sortPrice]);

  // ✅ Loading Skeleton (Table Style)
  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-5">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          All Courses
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Instructor</th>
                <th className="py-3 px-6 text-left">Popular</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="py-3 px-6">
                    <div className="h-4 w-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="h-4 w-10 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  </td>
                  <td className="py-3 px-6 flex gap-2">
                    <div className="h-6 w-14 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                    <div className="h-6 w-14 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">Failed to load courses.</p>
    );

  const handleDeleteClick = (id: string) => {
    setSelectedCourseId(id);
    setModalOpen(true);
    setEditMode(false);
    setAddMode(false);
  };

  const handleEditClick = (id: string) => {
    setSelectedCourseId(id);
    setModalOpen(true);
    setEditMode(true);
    setAddMode(false);
  };

  const handleAddClick = () => {
    setModalOpen(true);
    setAddMode(true);
    setEditMode(false);
    setSelectedCourseId(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCourseId) return;
    const toastId = toast.loading("Deleting course...");
    try {
      await deleteCourse(selectedCourseId).unwrap();
      toast.success("Course deleted successfully!", {
        id: toastId,
        duration: 1500,
      });
      setModalOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete course", {
        id: toastId,
      });
    }
  };

  return (
    <div className="container mx-auto py-10 px-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          All Courses
        </h1>

        {/* Add Course Button (Admin Only) */}
        {user?.role === "admin" && (
          <button
            onClick={handleAddClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add Course
          </button>
        )}
      </div>

      {/* Controls */}
      {user?.role === "admin" && (
        <div className="flex flex-wrap gap-4 mb-6 justify-start">
          <input
            type="text"
            placeholder="Search by title, instructor, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded w-64 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
              focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />

          <select
            value={filterPopular}
            onChange={(e) => setFilterPopular(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
              focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          >
            <option value="all">All Courses</option>
            <option value="yes">Popular</option>
            <option value="no">Not Popular</option>
          </select>

          <select
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
              focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          >
            <option value="none">Sort by Price</option>
            <option value="asc">Price Low → High</option>
            <option value="desc">Price High → Low</option>
          </select>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Instructor</th>
              <th className="py-3 px-6 text-left">Popular</th>
              {user?.role === "admin" && (
                <th className="py-3 px-6 text-left">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course: any, index: number) => (
              <tr
                key={course?._id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition"
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{course.title}</td>
                <td className="py-3 px-6">{course.category}</td>
                <td className="py-3 px-6">${course.price}</td>
                <td className="py-3 px-6">
                  {course.instructor?.name || "N/A"}
                </td>
                <td className="py-3 px-6">{course.isPopular ? "Yes" : "No"}</td>
                {user?.role === "admin" && (
                  <td className="py-3 px-6 flex gap-2">
                    <button
                      onClick={() => handleEditClick(course?._id)}
                      className="bg-blue-600 cursor-pointer text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(course?._id)}
                      className="bg-red-600 cursor-pointer text-white px-4 py-1 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div
            className="relative w-full max-w-4xl mx-4 sm:mx-6 md:mx-8 lg:mx-auto 
        bg-white dark:bg-gray-800 rounded-2xl shadow-2xl 
        max-h-screen overflow-y-auto p-6 pointer-events-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-700 hover:text-red-500 dark:text-gray-200 font-bold text-3xl cursor-pointer"
            >
              ×
            </button>

            {/* Modal Content */}
            {addMode ? (
              <CourseForm />
            ) : editMode && selectedCourseId ? (
              <UpdateCourseForm
                courseId={selectedCourseId}
                closeModal={() => setModalOpen(false)}
              />
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
                <p className="mb-6">
                  Are you sure you want to delete this course?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleConfirmDelete}
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-6 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;
