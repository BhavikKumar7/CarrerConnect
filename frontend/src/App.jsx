import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import Login from "./pages/Auth/Login.jsx";
import JobSeekerDashboard from "./pages/JobSeeker/JobSeekerDashboard.jsx";
import JobDetails from "./pages/JobSeeker/JobDetails.jsx";
import SavedJobs from "./pages/JobSeeker/SavedJobs.jsx";
import UserProfile from "./pages/JobSeeker/UserProfile.jsx";
import EmployerDashBoard from "./pages/Employer/EmployerDashBoard.jsx";
import JobPostingForm from "./pages/Employer/JobPostingForm.jsx";
import ManageJobs from "./pages/Employer/ManageJobs.jsx";
import ApplicationViewer from "./pages/Employer/ApplicationViewer.jsx";
import EmployerProfilePage from "./pages/Employer/EmployerProfilePage.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import { useThemeStore } from "./utils/useTheme.js";
import { AuthProvider } from "./context/AuthContext.jsx";

const App = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <AuthProvider>
      <div className="h-screen" data-theme={theme}>
        <Router>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={< Login />} />

            <Route path="/find-jobs" element={<JobSeekerDashboard />} />
            <Route path="/job/:jobId" element={<JobDetails />} />
            <Route path="/saved-jobs" element={<SavedJobs />} />
            <Route path="/profile" element={<UserProfile />} />

            {/* Protected */}
            <Route element={<ProtectedRoute requiredRole="employer" />}>
              <Route path="/employer-dashboard" element={<EmployerDashBoard />} />
              <Route path="/post-job" element={<JobPostingForm />} />
              <Route path="/manage-jobs" element={<ManageJobs />} />
              <Route path="/applicants" element={<ApplicationViewer />} />
              <Route path="/company-profile" element={<EmployerProfilePage />} />
            </Route>
            {/* catch False Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>

        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </div>
    </AuthProvider>
  )
}

export default App