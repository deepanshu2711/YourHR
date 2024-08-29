import { useRef } from "react";
import Header from "../components/Header";
import { FaFileUpload } from "react-icons/fa";
import { useUser } from "../providers/userProvider";
// import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  // const navigate = useNavigate();

  const handleUploadFileClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  console.log("User", user);

  return (
    <div className="h-[85vh]">
      <Header username={user?.username as string} />
      <div className="max-w-7xl mx-auto flex-1 h-full ">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-700">
            Upload your resume.
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Please upload a single file in PDF, DOC, or DOCX format.
          </p>
        </div>
        <div className="flex items-center justify-center h-[90%]">
          <input type="file" hidden ref={inputRef} />
          <div
            onClick={handleUploadFileClick}
            className="flex flex-col items-center group justify-center  gap-4 cursor-pointer border-2 border-dashed p-8 md:min-w-[500px] md:min-h-[200px]"
          >
            <FaFileUpload className="h-24 w-24 text-gray-500 group-hover:text-gray-800" />
            <p className="text-gray-500 group-hover:text-gray-800">
              Select a file
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
