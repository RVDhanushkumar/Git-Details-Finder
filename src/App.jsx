import { useState } from "react";
import { useNavigate } from "react-router-dom";
import github from "./assets/github2.png";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (username.trim()) {
      navigate(`/data?username=${username}`);
    } else {
      alert("Please enter a username");
    }
  };

  return (
    <div className="grid place-content-center h-[90vh] ">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-lg border border-gray-300 dark:border-gray-600">
        <div className="flex justify-center mb-6">
          <img src={github} className="h-12 w-12 mr-2" alt="GitHub Logo" />
        </div>

        <h1 className="text-4xl font-extrabold text-center text-blue-400 mb-8">
          User Profile Analyzer
        </h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            GitHub Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g., RVDhanushkumar"
            className="w-full px-4 py-3 border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition duration-300 shadow-md hover:shadow-lg"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default App;
