import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api_Routes } from "../../tools/api_Routes";
import { Helper } from "../../tools/Helper";
import { IoMdAdd } from "react-icons/io";
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";

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

  const files = [
    { name: "Project Proposal.pdf", url: "/files/project-proposal.pdf" },
    { name: "Resume.pdf", url: "/files/resume.pdf" },
    { name: "Portfolio.zip", url: "/files/portfolio.zip" },
  ];

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
      <FilesSection files={files} />
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
          className={`px-4 py-2 rounded-lg shadow transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {loading ? "Processing..." : "Confirm"}
        </button>
      </div>
    </div>
  </div>
);


const FilesSection = ({ files }) => (
  <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Files</h3>
    <ul className="space-y-4">
      {files.map((file, index) => (
        <li
          key={index}
          className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow"
        >
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            {file.name}
          </a>
          <span className="px-2 py-1 rounded text-sm font-semibold bg-green-100 text-green-600">
            Available
          </span>
        </li>
      ))}
    </ul>
  </div>
);

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
