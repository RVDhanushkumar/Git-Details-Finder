import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Card(props) {
  const formattedDate = props.created
    ? new Date(props.created).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const [commits, setCommits] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const res = await axios.get(
          `https://api.github.com/repos/${props.username}/${props.name}/commits`
        );
        setCommits(res.data.slice(0, 5));
      } catch (err) {
        setErr("Error fetching commits (or) Limit exceeds");
      }
    };

    fetchCommits();
  }, [props.username, props.name]);

  return (
    <motion.div
      className="bg-blue-950 shadow-xl rounded-2xl p-6 w-[85%] mx-auto border border-blue-800 hover:shadow-2xl transition-all duration-300 my-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-blue-100">📁 {props.name}</h2>
        <span className="text-sm text-blue-400 font-mono">ID: {props.id}</span>
      </div>

      <p className="text-blue-200 text-base mb-6">
        {props.description || "No description provided."}
      </p>

      <div className="flex justify-center">
        <div className="flex flex-wrap gap-3 text-sm text-blue-100 mb-6 justify-center">
          <span className="bg-blue-800/70 px-3 py-1 rounded-full shadow-inner">
            🧵 Size: {props.size} KB
          </span>
          <span className="bg-blue-800/70 px-3 py-1 rounded-full shadow-inner">
            💬 Language: {props.language || "Unknown"}
          </span>
          <span className="bg-blue-800/70 px-3 py-1 rounded-full shadow-inner">
            📅 Created: {formattedDate}
          </span>
        </div>
      </div>


      <details className="bg-blue-900/70 rounded-lg px-4 py-3 text-sm text-blue-100 group transition-all duration-300">
        <summary className="font-medium text-blue-300 cursor-pointer group-hover:text-white group-hover:bg-blue-700 px-2 py-1 rounded-md transition duration-300">
          📜 View Commits
        </summary>

        {err && <p className="text-red-400 mt-2">{err}</p>}

        {commits.length > 0 ? (
          <ul className="mt-4 space-y-3 pl-4">
            {commits.map((commit, index) => (
              <li key={index} className="bg-blue-950/70 border border-blue-800 rounded-md p-3 text-sm shadow-sm flex justify-around flex-row-reverse">
                <p className="text-blue-200">
                  💬 <strong className="text-blue-100">Message:</strong> {commit.commit.message}
                </p>
                <p className="text-blue-200 mb-1">
                  ✍️ <strong className="text-blue-100">Author:</strong> {commit.commit.author.name}
                </p>
                
              </li>
            ))}
          </ul>
        ) : !err ? (
          <p className="text-blue-300 mt-2">No commits found.</p>
        ) : null}
      </details>
    </motion.div>
  );
}

export default Card;
