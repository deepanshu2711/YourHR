import { useRef, useState } from "react";
import Header from "../components/Header";
import { FaFile, FaFileUpload } from "react-icons/fa";
import { useUser } from "../providers/userProvider";
import { handleFileUpload } from "../utils/handleFileUpload";
import { BsFiletypePdf } from "react-icons/bs";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const { user } = useUser();

  const handleUploadFileClick = async () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const selectedFile = event.target.files?.[0];
    console.log("Selected File:", selectedFile);
    handleFileUpload(selectedFile as File)
      .then((res) => {
        if (res.success === false) return;
        setDownloadUrl(res?.downloadUrl as string);
      })
      .then(async () => {
        await axios.post("http://localhost:8080/api/upload", {
          email: user?.email as string,
          downloadUrl: downloadUrl,
        });
      });
  };

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
          {downloadUrl === "" ? (
            <>
              <input
                onChange={handleFileChange}
                type="file"
                hidden
                ref={inputRef}
              />
              <div
                onClick={handleUploadFileClick}
                className="flex flex-col items-center group justify-center  gap-4 cursor-pointer border-2 border-dashed p-8 md:min-w-[500px] md:min-h-[200px]"
              >
                <FaFileUpload className="h-24 w-24 text-gray-500 group-hover:text-gray-800" />
                <p className="text-gray-500 group-hover:text-gray-800">
                  Select a file
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center md:min-w-[500px] border p-10 ">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <FaFile className="text-gray-600 h-6 w-6" />
                  <p className="text-gray-600 font-semibold">Resume</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/user.png" className="h-8 w-8" />
                  <p className="text-sm font-semibold text-gray-500">
                    {user?.username || "Unknown"}
                  </p>
                </div>
              </div>
              <div className="p-10">
                <BsFiletypePdf className="h-[200px] w-[200px] text-gray-600" />
              </div>
              <div className="w-full flex items-center gap-5 justify-between">
                <button className="text-sm w-full font-semibold text-gray-500 border px-2 py-1 rounded bg-gray-50 cursor-pointer hover:bg-red-50 border-gray-300">
                  Delete
                </button>
                <button className="text-sm  w-full font-semibold text-gray-500 border px-2 py-1 rounded bg-gray-50 cursor-pointer hover:bg-blue-50 border-gray-300">
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
