import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api_Routes } from "../../tools/api_Routes";
import { Helper } from "../../tools/Helper";
import { IoMdAdd } from "react-icons/io";
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import axios from "axios";
import { FiDownload, FiPlus, FiTrash } from "react-icons/fi";

const GroupDetails = () => {
  const { id, title } = useParams();
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingAllUsers, setLoadingAllUsers] = useState(false);
  const [addingUser, setAddingUser] = useState(false);
  const [error, setError] = useState(null);
  const [errorAdd, setAddError] = useState(null);
  const [showSelectUsers, setShowSelectUsers] = useState(false);

  // const files = [
  //   { name: "Project Proposal.pdf", url: "/files/project-proposal.pdf" },
  //   { name: "Resume.pdf", url: "/files/resume.pdf" },
  //   { name: "Portfolio.zip", url: "/files/portfolio.zip" },
  // ];

  // Fetch Group Users
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const { response } = await Helper.Get({
        url: `${api_Routes.Groups.user}/${id}`,
        hasToken: true,
      });
      setUsers(response);
    } catch (err) {
      handleError("Failed to fetch users. Please try again later.");
    } finally {
      setLoadingUsers(false);
    }
  };
  // Fetch All Users
  const fetchAllUsers = async () => {
    try {
      setLoadingAllUsers(true);
      const { response } = await Helper.Get({
        url: api_Routes.User.allUser,
        hasToken: true,
      });
      setAllUsers(response);
    } catch (err) {
      handleError("Failed to fetch all users. Please try again later.");
    } finally {
      setLoadingAllUsers(false);
    }
  };
  // Add User to Group
  const addUser = async (memberId) => {
    try {
      setAddingUser(true);
      const { response, message } = await Helper.Post({
        url: api_Routes.User.AddUser,
        hasToken: true,
        data: { memberId, groupId: id },
      });

      if (response) {
        await fetchUsers();
        setAddingUser(false);
        setShowSelectUsers(false);
        setAddError(null)
        setSelectedUsers(null)
      } else {
        setAddingUser(false);
        setAddError(message || "Failed to add user. Please try again later.");
      }
    } catch (err) {
      console.error("Error adding user:", err);
      setAddError("Failed to add user. Please try again later.");
    }
  };
  const handleError = (message) => {
    setError(message);
    setTimeout(() => setError(null), 3000);
  };

  useEffect(() => {
    fetchUsers();
    fetchAllUsers();

  }, [id]);

  return (
    <div className="relative rounded-lg mx-auto bg-gray-50 shadow-lg">
      <Header title={title} />
      <UsersSection
        users={users}
        loading={loadingUsers}
        error={error}
        onAddUser={() => setShowSelectUsers(true)}
      />
      {showSelectUsers && (
        <AddUserModal
          allUsers={allUsers}
          loading={addingUser}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          onClose={() => setShowSelectUsers(false)}
          onConfirm={() => addUser(selectedUsers)}
          error={errorAdd}

        />
      )}
      <FilesSection />
    </div>
  );
};

const Header = ({ title }) => (
  <div className="flex flex-col items-center">
    <h2 className="mt-4 text-2xl font-bold text-gray-800">{title}</h2>
  </div>
);

const UsersSection = ({ users, loading, error, onAddUser }) => (
  <div className="mt-8 p-6 bg-white rounded-lg shadow-md relative">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Users</h3>
    {loading ? (
      <Loader />
    ) : error ? (
      <ErrorMessage message={error} />
    ) : users.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    ) : (
      <p className="text-gray-600">No users found in this group.</p>
    )}
    <AddButton onClick={onAddUser} />
  </div>
);

const AddUserModal = ({
  allUsers,
  loading,
  selectedUsers,
  setSelectedUsers,
  onClose,
  onConfirm,
  error, // Added error prop
}) => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
      <h4 className="text-xl font-semibold text-gray-800 mb-4 text-center">Select a User</h4>

      {/* Error Section */}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-md text-sm border border-red-300">
          {error}
        </div>
      )}

      {/* Select Dropdown */}
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="select-user-label">Select User</InputLabel>
        <Select
          labelId="select-user-label"
          id="select-user"
          value={selectedUsers}
          onChange={(e) => setSelectedUsers(e.target.value)}
          input={<OutlinedInput label="Select User" />}
          MenuProps={{
            PaperProps: { style: { maxHeight: 200, width: 250 } },
          }}
        >
          {allUsers.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.fullName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className={`px-4 py-2 rounded-lg shadow transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
          {loading ? "Processing..." : "Confirm"}
        </button>
      </div>
    </div>
  </div>
);



const FilesSection = () => {
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newFile, setNewFile] = useState(null);
  const [fileIdForCheckOut, setFileIdForCheckOut] = useState(null);
  const [addFileModal, setAddFileModal] = useState(false);
  const [addFileData, setAddFileData] = useState({ name: "", filePath: null, groupId: "1" });
  const { id, title } = useParams();

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const { response } = await Helper.Get({
        url: `${api_Routes.File.GetAllfile}?groupId=${id}`,
        hasToken: true,
      });
      setFiles(response);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch files. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileSelection = (fileId) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.includes(fileId)
        ? prevSelectedFiles.filter((id) => id !== fileId) // Remove if already selected
        : [...prevSelectedFiles, fileId] // Add if not already selected
    );
  };
  const handleUpdate = async (fileId, newStatus) => {
    try {
      // Define the API endpoint with query parameters
      const url = `http://localhost:8080/file/updateFile?fileId=${encodeURIComponent(fileId)}&requestStatus=${encodeURIComponent(newStatus)}&groupId=${encodeURIComponent(id)}`;
  
      // Make the GET request
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to update file status.");
      }
  
      const data = await response.json();
      console.log("Status updated successfully:", data);
  
      fetchFiles();
    } catch (error) {
      console.error("Error updating file status:", error);
    }
  };
  
  
  const handleSendSelectedFiles = async () => {
    try {
      setLoading(true);
      const { response, message } = await Helper.Post({
        url: `http://localhost:8080/file/inCheckFiles`,
        hasToken: true,
        data: {
          fileIds: selectedFiles,
        },
      });
      if (response) {
        fetchFiles();
        setError(null);
        setSelectedFiles([]);
      } else {
        setError(message || "Failed to send selected files. Please try again.");
      }
    } catch (err) {
      console.error("Failed to send selected files:", err);
      setError("Failed to send selected files. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleCheckOut = async () => {
    const formData = new FormData();
    formData.append("fileId", fileIdForCheckOut);
    formData.append("newFile", newFile);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/file/outCheckFile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to send file.");
      }
      fetchFiles();

      console.log("File sent successfully!");
      setShowModal(false);
    } catch (err) {
      console.error("Error sending file:", err);
      setError("Failed to send file. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleFileDownload = async (id, name, extension) => {
    try {
      const url = `http://localhost:8080/file/download/${id}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download file.");
      }
      fetchFiles();

      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;

      link.download = `${name}.${extension}`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(downloadUrl);

      console.log("File downloaded successfully!");
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  const getFileExtension = (filePath) => {
    // Use regex to extract extension after the last dot
    const match = filePath.match(/\.([0-9a-z]+)$/i);
    return match ? match[1] : ""; // Return the extension or an empty string
  };
  const handleFileDelete = async (fileId, groupId) => {
    try {
      // Construct the API URL with query parameters
      const url = `http://localhost:8080/file/deleteFile?fileId=${fileId}&groupId=${id}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete file.");
      }


      fetchFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };
  const handleAddFile = async () => {
    const formData = new FormData();
    formData.append("name", addFileData.name);
    formData.append("filePath", addFileData.filePath);
    formData.append("groupId", addFileData.groupId);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/file/addFile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to add file.");
      }
      console.log("File added successfully!");
      setAddFileModal(false);
      fetchFiles();
    } catch (err) {
      console.error("Error adding file:", err);
      setError("Failed to add file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading files...</div>;
  }

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Files</h3>
      {error && <div className="text-red-500 mb-2">Error: {error}</div>}
      <button
        onClick={() => setAddFileModal(true)}
        className="flex items-center px-4 py-2 rounded bg-primary mb-2 text-white font-semibold shadow  transition"
      >
        <FiPlus className="mr-2" /> Add File
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Check Out File
            </h4>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Upload New File
              </label>
              <input
                type="file"
                onChange={(e) => setNewFile(e.target.files[0])}
                className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckOut}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <ul className="space-y-4">

        {files.map((file) => (
          <li
            key={file.id}
            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedFiles.includes(file.id)}
                onChange={() => handleFileSelection(file.id)}
                className="mr-4"
              />
              <a
                href={file.filePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                {file.name}
              </a>
            </div>
            <div className="flex items-center space-x-4">

              <select
                value={file.requestStatus}
                onChange={(e) => handleUpdate(file.id, e.target.value)}
                className={`px-2 py-1 rounded text-sm font-semibold 
                  
                  }`}
              >
                <option value="PENDING" >
                  PENDING
                </option>
                <option value="APPROVED" >
                  APPROVED
                </option>
              </select>
              <span
                className={`px-2 py-1 rounded text-sm font-semibold ${file.fileStatus === "FREE"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
                  }`}
              >
                {file.fileStatus}
              </span>
              {file.fileStatus === "IN_USE" && (
                <button
                  onClick={() => {
                    setShowModal(true);
                    setFileIdForCheckOut(file.id);
                  }}
                  className="px-4 py-2 rounded bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition"
                >
                  Check Out
                </button>
              )}
              {file.fileStatus === "RESERVED" && (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleFileDownload(file.id, file.name, getFileExtension(file.filePath))}
                    className="px-4 py-2 rounded bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition flex items-center"
                  >
                    <FiDownload className="mr-2" /> Download
                  </button>


                </div>
              )}
              <button
                onClick={() => handleFileDelete(file.id, file.groupId)} // Provide fileId and groupId
                className="px-4 py-2 rounded bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition flex items-center"
              >
                <FiTrash className="mr-2" /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSendSelectedFiles}
        disabled={selectedFiles.length === 0}
        className={`px-4 py-2 rounded bg-primary text-white font-semibold mt-4 shadow transition ${selectedFiles.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
      >
        Send Selected Files
      </button>


      {addFileModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Add New File
            </h4>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                File Name
              </label>
              <input
                type="text"
                value={addFileData.name}
                onChange={(e) => setAddFileData({ ...addFileData, name: e.target.value })}
                className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                File Upload
              </label>
              <input
                type="file"
                onChange={(e) => setAddFileData({ ...addFileData, filePath: e.target.files[0] })}
                className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setAddFileModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFile}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};









const Loader = () => (
  <div className="flex justify-center">
    <div className="loader animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <p className="text-red-600">{message}</p>
);

const AddButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg transition flex items-center justify-center"
    title="Add User"
  >
    <IoMdAdd className="text-2xl" />
  </button>
);

const UserCard = ({ user }) => (
  <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105">
    <div className="ml-4">
      <h4 className="text-lg font-semibold text-gray-800">{user.fullName}</h4>
      <p className="text-sm text-gray-500">{user.roleType}</p>
    </div>
  </div>
);

export default GroupDetails;
