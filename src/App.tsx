import Login from "./pages/login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import NavBar from "./components/Navbar";
import NotFound from "./pages/not-found/NotFound";
import JobsPage from "./pages/jobs/JobsPage";
import JobPage from "./pages/jobs/JobPage";
import AddJobPage from "./pages/jobs/AddJobPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogsPage from "./pages/blogs/BlogsPage";
import BlogDetailPage from "./pages/blogs/BlogDetailPage";
import AddBlogPage from "./pages/blogs/AddBlogPage";
import TokenService from "./services/TokenService";
import EditJobPage from "./pages/jobs/EditJobPage";
import { useEffect, useState } from "react";

function App() {
  const [IsAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(TokenService.IsAuthenticated());
  }, [location]);

  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogsPage></BlogsPage>}></Route>
        <Route path="/add-blog" element={!IsAuthenticated ? (
          <Navigate to="/login"></Navigate>
        ) : (
          <AddBlogPage />
        )}></Route>
        <Route
          path="blogs/:blogId"
          element={<BlogDetailPage></BlogDetailPage>}
        ></Route>
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobPage />} />
        <Route path="/edit-job/:id" element={
          !IsAuthenticated ? (
            <Navigate to="/login"></Navigate>
          ) : (
            <EditJobPage />
          )
        } />
        <Route
          path="/add-job"
          element={
            !IsAuthenticated ? (
              <Navigate to="/login"></Navigate>
            ) : (
              <AddJobPage />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
