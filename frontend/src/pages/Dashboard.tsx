import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { FaFile, FaFileUpload } from "react-icons/fa";
import { useUser } from "../providers/userProvider";
import { handleFileUpload } from "../utils/handleFileUpload";
import { BsFiletypePdf } from "react-icons/bs";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, seloading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setDownloadUrl(user?.fileUrl as string);
    }
  }, [user]);

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
    seloading(true);
    handleFileUpload(selectedFile as File)
      .then(async (res) => {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/api/upload`, {
          email: user?.email as string,
          fileUrl: res.downloadUrl as string,
        });
        setDownloadUrl(res.downloadUrl as string);
      })
      .finally(() => seloading(false));
  };

  const handleFileDelete = async () => {
    seloading(true);
    const responce = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/delete/${user?.email}`
    );
    if (responce.status === 200) {
      setDownloadUrl("");
    }
    seloading(false);
  };

  // const handleDownload = () => {};

  return (
    <div className="h-[85vh] px-[20px]">
      <Header username={user?.username as string} />
      <div className="max-w-7xl mx-auto flex-1 h-full ">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-700">
            {downloadUrl === ""
              ? "Upload your file"
              : "Your file has been uploaded"}
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            {downloadUrl === ""
              ? "Please upload a single file in PDF, DOC, or DOCX format."
              : "You can download and delete your file from below."}
          </p>
        </div>
        <div className="flex items-center justify-center h-[90%]">
          {loading ? (
            <div className="flex items-center justify-center">
              <AiOutlineLoading3Quarters className="animate-spin h-10 w-10 text-center" />
            </div>
          ) : downloadUrl === "" ? (
            <>
              <input
                onChange={handleFileChange}
                type="file"
                hidden
                ref={inputRef}
              />
              <div
                onClick={handleUploadFileClick}
                className="flex flex-col items-center group justify-center  gap-4 cursor-pointer border-2 border-dashed p-8 min-w-[300px]  md:min-w-[500px] md:min-h-[200px]"
              >
                <FaFileUpload className="h-24 w-24 text-gray-500 group-hover:text-gray-800" />
                <p className="text-gray-500 group-hover:text-gray-800">
                  Select a file
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center min-w-[300px] md:min-w-[500px] border p-10 ">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <FaFile className="text-gray-600 h-6 w-6" />
                  <p className="text-gray-600 font-semibold">Resume</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src="/user.png" className="h-8 w-8" />
                  <p className="text-sm font-semibold text-gray-500 md:block hidden">
                    {user?.username || "Unknown"}
                  </p>
                </div>
              </div>
              <div className="p-10">
                <BsFiletypePdf className="md:h-[200px] h-[100px] w-[100px] md:w-[200px] text-gray-600" />
              </div>
              <div className="w-full flex items-center gap-5 justify-between">
                <button
                  onClick={handleFileDelete}
                  className="text-sm w-full font-semibold text-gray-500 border px-2 py-1 rounded bg-gray-50 cursor-pointer hover:bg-red-50 border-gray-300"
                >
                  Delete
                </button>
                <Link
                  to={downloadUrl}
                  target="_blank"
                  className="text-sm  text-center w-full font-semibold text-gray-500 border px-2 py-1 rounded bg-gray-50 cursor-pointer hover:bg-blue-50 border-gray-300"
                >
                  Download
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
