import { useEffect, useState } from "react";
import { get } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await get("/matches");

      if (res?.error) {
        console.error(res.error);
      } else {
        setMatches(res.matches || []);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading matches...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Your Best Matches
      </h1>

      {matches.length === 0 && (
        <p className="text-center text-gray-500">
          No matches yet. Try updating your profile.
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {matches.map((m) => (
          <div
            key={m.user.id}
            className="bg-white p-6 rounded-xl shadow border"
          >
            <h2 className="text-xl font-semibold">{m.user.name}</h2>
            <p className="text-sm text-gray-600">
              {m.profile.branch} · Year {m.profile.year}
            </p>

            <div className="mt-3">
              <p className="text-sm">
                <strong>Study Style:</strong> {m.profile.studyStyle}
              </p>
              <p className="text-sm">
                <strong>Preferred Time:</strong> {m.profile.preferredTime}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {m.profile.interests.map((i) => (
                <span
                  key={i}
                  className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                >
                  {i}
                </span>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm font-medium text-indigo-600">
                Compatibility: {m.score}%
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => nav(`/profile/${m.user.id}`)}
                  className="px-3 py-1 text-sm border rounded-lg"
                >
                  View
                </button>

                <a
                  href={m.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
