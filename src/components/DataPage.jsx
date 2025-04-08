import { useLocation } from "react-router-dom";
import Card from "./card";
import { useEffect, useState } from "react";
import axios from "axios";

function DataPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get("username");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://api.github.com/users/${username}/repos`);
        setData(res.data);
        setErr("");
      } catch (error) {
        setErr("Username Not found (or) Limit Exceeds");
      }
      setLoading(false);
    };

    if (username) {
      getData();
    }
  }, [username]);

  return (
    <div className="bg-blue-950 text-white py-10 px-4 flex flex-col items-center rounded-2xl">
      <h2 className="text-3xl font-bold text-blue-200 mb-8">
        🔍 GitHub Data for: {username || "Unknown User"}
      </h2>

      {err && <p className="text-red-400 mb-4">{err}</p>}
      {loading ? (
        <h1 className="text-xl text-blue-300">Loading...</h1>
      ) : (
        <div className="w-full flex flex-col gap-6 items-center">
          {data.map((item) => (
            <Card
              key={item.id}
              name={item.name}
              id={item.id}
              description={item.description}
              size={item.size}
              language={item.language}
              created={item.created_at}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DataPage;
