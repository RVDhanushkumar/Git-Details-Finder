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
    <div>
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 sm:p-10 w-full max-w-lg transition-all duration-300">
        <div className="flex justify-center mb-6">
          <img src={github} className="h-12 w-20 mr-2 animate-pulse" alt="GitHub Logo" />
        </div>

        <h1 className="text-4xl font-extrabold text-center text-red-600 dark:text-red-400 mb-8">
          GitHub User Finder
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
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-300 shadow-md hover:shadow-lg"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default App;
