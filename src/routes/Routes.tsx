import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../components/Home/Home";
import Courses from "../components/courses/Courses";
import CourseDetails from "../components/courses/CourseDetails";
import Registration from "@/components/auth/Regsiter";
import Login from "@/components/auth/Login";
import DashboardLayout from "@/dashboard/DashboardLayout";
import DashboardHome from "@/dashboard/DashboardHome";
import CourseForm from "@/components/admin/CourseForm";
import ProtectedRoutes from "@/components/layout/ProtectedRoutes";
import StoryForm from "@/components/admin/StoryForm";
import CourseList from "@/components/admin/CourseList";
import StoryList from "@/components/admin/story/StoryList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/courses/:id",
        element: <CourseDetails />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardHome /> },
      {
        path: "create-course",
        element: (
          <ProtectedRoutes role="admin">
            <CourseForm />
          </ProtectedRoutes>
        ),
      },
      {
        path: "create-story",
        element: (
          <ProtectedRoutes role="admin">
            <StoryForm />
          </ProtectedRoutes>
        ),
      },
      {
        path: "course-list",
        element: (
          <ProtectedRoutes role="admin">
            <CourseList />
          </ProtectedRoutes>
        ),
      },
      {
        path: "story-list",
        element: (
          <ProtectedRoutes role="admin">
            <StoryList />
          </ProtectedRoutes>
        ),
      },
      // {
      //   path: "course-update",
      //   element: (
      //     <ProtectedRoutes role="admin">
      //       <UpdateCourseForm />
      //     </ProtectedRoutes>
      //   ),
      // },
      // চাইলে আরও nested route যোগ করতে পারো
      // { path: "analytics", element: <AnalyticsPage /> },
    ],
  },
]);

export default router;
