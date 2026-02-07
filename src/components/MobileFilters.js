import { useState } from "react";

const MobileFilters = ({ isOpen, onClose, onApply }) => {
  const [filters, setFilters] = useState({
    jobTitle: "",
    location: "",
    category: "",
    experienceLevel: [],
    jobType: [],
    salaryRange: [50, 250],
  });

  const toggleExperience = (level) => {
    setFilters((prev) => ({
      ...prev,
      experienceLevel: prev.experienceLevel.includes(level)
        ? prev.experienceLevel.filter((l) => l !== level)
        : [...prev.experienceLevel, level],
    }));
  };

  const toggleJobType = (type) => {
    setFilters((prev) => ({
      ...prev,
      jobType: prev.jobType.includes(type)
        ? prev.jobType.filter((t) => t !== type)
        : [...prev.jobType, type],
    }));
  };

  const handleReset = () => {
    setFilters({
      jobTitle: "",
      location: "",
      category: "",
      experienceLevel: [],
      jobType: [],
      salaryRange: [50, 250],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button onClick={onClose} className="text-blue-500">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-gray-900">Filters</h1>
        <button onClick={handleReset} className="text-blue-500 font-semibold">
          Reset
        </button>
      </div>

      <div className="p-4 space-y-6 pb-32">
        {/* Job Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Job Title
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.jobTitle}
              onChange={(e) =>
                setFilters({ ...filters, jobTitle: e.target.value })
              }
              placeholder="Search job titles..."
              className="w-full pl-4 pr-10 py-3 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Location
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
              placeholder="City or Remote"
              className="w-full pl-4 pr-10 py-3 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Categories</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { name: "Design" },
              { name: "Development" },
              { name: "Marketing" },
              { name: "Sales" },
              { name: "Finance" },
            ].map((category) => (
              <button
                key={category.name}
                onClick={() =>
                  setFilters({ ...filters, category: category.name })
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  filters.category === category.name
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Experience Level
          </h2>
          <div className="space-y-3">
            {[
              { value: "entry", label: "Entry Level" },
              { value: "mid", label: "Mid Level" },
              { value: "senior", label: "Senior" },
            ].map((level) => (
              <button
                key={level.value}
                onClick={() => toggleExperience(level.value)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-900 font-medium">
                    {level.label}
                  </span>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    filters.experienceLevel.includes(level.value)
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-400"
                  }`}
                >
                  {filters.experienceLevel.includes(level.value) && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Job Type */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Job Type</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "fulltime", label: "Full-time" },
              { value: "remote", label: "Remote" },
              { value: "contract", label: "Contract" },
              { value: "parttime", label: "Part-time" },
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => toggleJobType(type.value)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  filters.jobType.includes(type.value)
                    ? "bg-blue-600 border-blue-600"
                    : "bg-gray-50 border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`font-medium text-sm ${
                      filters.jobType.includes(type.value)
                        ? "text-white"
                        : "text-gray-900"
                    }`}
                  >
                    {type.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Salary Range */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">Salary Range</h2>
            <span className="text-blue-500 font-bold">
              ${filters.salaryRange[0]}k — ${filters.salaryRange[1]}k+
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="250"
            value={filters.salaryRange[0]}
            onChange={(e) =>
              setFilters({
                ...filters,
                salaryRange: [parseInt(e.target.value), filters.salaryRange[1]],
              })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>$50k</span>
            <span>$250k+</span>
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <button
          onClick={() => {
            onApply(filters);
            onClose();
          }}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Search Jobs
        </button>
      </div>
    </div>
  );
};

export default MobileFilters;
