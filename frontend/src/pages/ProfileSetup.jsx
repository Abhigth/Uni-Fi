import { useState, useEffect } from "react";
import { post, get } from "../utils/api";
import { useNavigate } from "react-router-dom";

const BRANCHES = [
  "CSE", "ISE", "ECE", "EEE", "ME", "CE", "AI & ML", "Data Science"
];

const STUDY_STYLES = [
  "Group Study",
  "Solo but Open",
  "Flexible"
];

const TIMES = [
  "Morning",
  "Evening",
  "Night"
];

const INTERESTS = [
  "Coding",
  "Maths",
  "Competitive Programming",
  "AI/ML",
  "Web Development",
  "Exams",
  "Research"
];

const ACTIVITIES = [
  "Gym",
  "Sports",
  "Music",
  "Reading",
  "Hackathons",
  "Gaming"
];

export default function ProfileSetup() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    branch: "",
    year: "",
    studyStyle: "",
    preferredTime: "",
    interests: [],
    activities: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // If profile already exists, skip setup
  useEffect(() => {
    (async () => {
      const res = await get("/profile/me");
      if (res?.profile) {
        nav("/dashboard");
      }
    })();
  }, []);

  const toggleArray = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.branch || !form.year || !form.studyStyle || !form.preferredTime) {
      return setError("Please complete all required fields");
    }

    setLoading(true);
    const res = await post("/profile", form);
    setLoading(false);

    if (res?.error) {
      setError(res.error);
    } else {
      nav("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow border">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Complete Your Profile
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Branch */}
          <select
            value={form.branch}
            onChange={(e) => setForm({ ...form, branch: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Select Branch</option>
            {BRANCHES.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          {/* Year */}
          <input
            type="number"
            min="1"
            max="5"
            placeholder="Year of Study"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />

          {/* Study Style */}
          <div>
            <p className="font-medium mb-2">Study Style</p>
            <div className="flex gap-2 flex-wrap">
              {STUDY_STYLES.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setForm({ ...form, studyStyle: s })}
                  className={`px-4 py-2 rounded-full border ${
                    form.studyStyle === s
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Time */}
          <div>
            <p className="font-medium mb-2">Preferred Study Time</p>
            <div className="flex gap-2">
              {TIMES.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setForm({ ...form, preferredTime: t })}
                  className={`px-4 py-2 rounded-full border ${
                    form.preferredTime === t
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <p className="font-medium mb-2">Interests</p>
            <div className="flex gap-2 flex-wrap">
              {INTERESTS.map((i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => toggleArray("interests", i)}
                  className={`px-3 py-1 rounded-full border ${
                    form.interests.includes(i)
                      ? "bg-green-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div>
            <p className="font-medium mb-2">Activities</p>
            <div className="flex gap-2 flex-wrap">
              {ACTIVITIES.map((a) => (
                <button
                  type="button"
                  key={a}
                  onClick={() => toggleArray("activities", a)}
                  className={`px-3 py-1 rounded-full border ${
                    form.activities.includes(a)
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
