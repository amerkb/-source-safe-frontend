import React from "react";

const GroupDetails = () => {
  const user = {
    coverImage: "https://via.placeholder.com/800x300",
    profileImage: "https://via.placeholder.com/150",
    name: "John Doe",
    role: "Full Stack Developer",
    stats: [
      { label: "Posts", value: "259" },
      { label: "Followers", value: "129K" },
      { label: "Following", value: "2K" },
    ],
    about:
      "John is a full stack developer with a passion for building amazing web applications. He specializes in React and Node.js.",
  };

  const files = [
    { name: "Project Proposal.pdf", url: "/files/project-proposal.pdf" },
    { name: "Resume.pdf", url: "/files/resume.pdf" },
    { name: "Portfolio.zip", url: "/files/portfolio.zip" },
  ];

  const users = [
    {
      profileImage: "https://via.placeholder.com/100",
      name: "Alice Smith",
      role: "UI/UX Designer",
    },
    {
      profileImage: "https://via.placeholder.com/100",
      name: "Bob Johnson",
      role: "Frontend Developer",
    },
    {
      profileImage: "https://via.placeholder.com/100",
      name: "Charlie Davis",
      role: "Backend Developer",
    },
  ];

  return (
    <div className="rounded-lg max-w-screen-xl mx-auto p-6 bg-gray-50 shadow-lg">
      {/* Profile Section */}
      <div className="flex flex-col items-center -mt-16">
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
        />
        <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-500">{user.role}</p>
      </div>

      {/* Stats Section */}
      <div className="flex justify-around mt-6 border-t border-gray-200 pt-6">
        {user.stats.map((stat, index) => (
          <div key={index} className="text-center">
            <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* About Section */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">About Me</h3>
        <p className="text-gray-600 leading-relaxed">{user.about}</p>
      </div>
      {/* Users Section */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Users</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-16 h-16 rounded-full border-2 border-gray-200"
              />
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  {user.name}
                </h4>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Files Section */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Files</h3>
        <ul className="space-y-4">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow"
            >
              {/* File Name with Link */}
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                {file.name}
              </a>

              {/* File Status */}
              <span
                className={`px-2 py-1 rounded text-sm font-semibold ${file.available
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                  }`}
              >
                {file.available ? "Available" : "Not Available"}
              </span>
            </li>
          ))}
        </ul>
      </div>



    </div>
  );
};

export default GroupDetails;
