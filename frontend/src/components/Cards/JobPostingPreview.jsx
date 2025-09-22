import { Briefcase, MapPin, Users, IndianRupee, ArrowLeft, Send } from "lucide-react";

const JobPostingPreview = ({ formData, setIsPreview, handleSubmit, isSubmitting }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-6">
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Job Posting Preview
            </h2>
            <button
              onClick={() => setIsPreview(false)}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Edit</span>
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                {formData.jobTitle || "Untitled Job"}
              </h3>
              <p className="flex items-center mt-2 text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                {formData.location || "Not specified"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <Users className="h-5 w-5 text-gray-400" />
                <span>
                  Category:{" "}
                  <strong className="text-gray-900">{formData.category || "N/A"}</strong>
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Briefcase className="h-5 w-5 text-gray-400" />
                <span>
                  Job Type:{" "}
                  <strong className="text-gray-900">{formData.jobType || "N/A"}</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-gray-700">
              <IndianRupee className="h-5 w-5 text-gray-400" />
              <span>
                Salary Range:{" "}
                <strong className="text-gray-900">
                  {formData.salaryMin && formData.salaryMax
                    ? `${formData.salaryMin} - ${formData.salaryMax}`
                    : "Not specified"}
                </strong>
              </span>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Job Description</h4>
              <p className="text-gray-700 whitespace-pre-line">
                {formData.description || "No description provided."}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Requirements</h4>
              <p className="text-gray-700 whitespace-pre-line">
                {formData.requirements || "No requirements provided."}
              </p>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4">
              <button
                onClick={() => setIsPreview(false)}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Edit
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center px-5 py-2 rounded-lg text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Publishing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Publish Job
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingPreview;
