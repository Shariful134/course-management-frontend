import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../components/Home/Home";
import Courses from "../components/courses/Courses";
import CourseDetails from "../components/courses/CourseDetails";
import Registration from "@/components/auth/Regsiter";
import Login from "@/components/auth/Login";

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
]);

export default router;
