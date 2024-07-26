import './App.css'
import Login from './pages/login/Login'
import { Route, Routes, useLocation } from 'react-router-dom'
import Register from './pages/register/Register'
import Home from './pages/home/Home'
import NavBar from './components/Navbar'
import NotFound from './pages/not-found/NotFound'
import JobsPage from './pages/jobs/JobsPage'
import JobPage from './pages/jobs/JobPage'
import AddJobPage from './pages/jobs/AddJobPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import BlogsPage from './pages/blogs/BlogsPage'
import BlogDetailPage from './pages/blogs/BlogDetailPage'

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/blogs' element={<BlogsPage></BlogsPage>}></Route>
        <Route path='blogs/:blogId' element={<BlogDetailPage></BlogDetailPage>}></Route>
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobPage />} />
        {/* <Route path="/edit-job/:id" element={<EditJobPage />} loader={editPageDataLoader} /> */}
        <Route path="/add-job" element={<AddJobPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </>
  )
}

export default App