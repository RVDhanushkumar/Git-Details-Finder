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
      className="bg-blue-900 shadow-md rounded-2xl p-4 w-[80%] mx-auto hover:shadow-xl transition duration-300 border border-blue-700"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between my-4">
        <h2 className="text-xl font-semibold text-blue-100">📁 {props.name}</h2>
        <span className="text-sm text-blue-300">ID: {props.id}</span>
      </div>

      <p className="text-blue-200 my-4">{props.description || "No description provided."}</p>
      <div className="w-full grid place-content-center">
        <div className="flex flex-wrap gap-3 text-sm text-blue-100 my-6">
          <span className="bg-blue-800 px-2 py-1 rounded-lg">🧵 Size: {props.size} KB</span>
          <span className="bg-blue-800 px-2 py-1 rounded-lg">💬 Language: {props.language || "Unknown"}</span>
          <span className="bg-blue-800 px-2 py-1 rounded-lg">📅 Created: {formattedDate}</span>
        </div>
      </div>

      <details className="bg-blue-800 rounded-lg px-4 py-2 text-sm text-blue-100 cursor-pointer">
        <summary className="font-medium text-blue-300 mb-1 hover:text-white transition duration-200">
          📜 View Commits
        </summary>

        {err && <p className="text-red-400 mt-2">{err}</p>}

        {commits.length > 0 ? (
          <div className="ml-4 mt-2 space-y-2">
            {commits.map((commit, index) => (
              <li key={index} className="bg-blue-900 p-2 rounded-md">
                <p>✍️ <strong>Author:</strong> {commit.commit.author.name}</p>
                <p>💬 <strong>Message:</strong> {commit.commit.message}</p>
              </li>
            ))}
          </div>
        ) : !err ? (
          <p className="text-blue-200 mt-2">No commits found.</p>
        ) : null}
      </details>
    </motion.div>
  );
}

export default Card;
