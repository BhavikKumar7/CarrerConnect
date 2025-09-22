import DashboardLayout from "../../components/layout/DashboardLayout";
import { useState, useEffect, useMemo } from "react";
import {
  Users,
  Calendar,
  MapPin,
  Briefcase,
  Download,
  Eye,
  ArrowLeft,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { getInitials } from "../../utils/helper";

const ApplicationViewer = () => {

  const location = useLocation();
  const jobId = location.state?.jobId || null;
  const navigate = useNavigate();

  const[applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const fetchApplications = async () => {

  };

  useEffect(() => {
    if(jobId) fetchApplications();
    else navigate("/manage-jobs");
  }, []);

  const groupedApplications = useMemo

  return (
    <DashboardLayout activeMenu='manage-jobs'>

    </DashboardLayout>
  )
}

export default ApplicationViewer