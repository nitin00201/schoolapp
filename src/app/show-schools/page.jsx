"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/schools")
      .then((res) => res.json())
      .then((data) => {
        let schoolsData = data;

        // If backend fell back → merge localStorage data
        if (Array.isArray(data) && data.length && data[0].name === "Green Valley School") {
          const local = JSON.parse(localStorage.getItem("fallbackSchools") || "[]");
          schoolsData = [...data, ...local];
        }

        setSchools(schoolsData);
        setFilteredSchools(schoolsData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSchools(schools);
      return;
    }

    const filtered = schools.filter((school) => {
      const query = searchQuery.toLowerCase();
      return (
        school.name.toLowerCase().includes(query) ||
        school.address.toLowerCase().includes(query) ||
        school.city.toLowerCase().includes(query)
      );
    });

    setFilteredSchools(filtered);
  }, [searchQuery, schools]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          {/* Search bar skeleton */}
          <div className="mb-8 max-w-md mx-auto">
            <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Discover Schools
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore educational institutions in your area with detailed information and beautiful visuals
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search schools by name, address, or city..."
              className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          
          {/* Search Results Info */}
          {searchQuery && (
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-600">
                {filteredSchools.length === 0
                  ? "No schools found"
                  : `Found ${filteredSchools.length} school${filteredSchools.length === 1 ? "" : "s"}`}
                {searchQuery && (
                  <span className="text-blue-600 font-medium"> matching "{searchQuery}"</span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredSchools.map((school, index) => (
            <div 
              key={school.id} 
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
              style={{
                animationName: 'fadeInUp',
                animationDuration: '0.6s',
                animationTimingFunction: 'ease-out',
                animationFillMode: 'forwards',
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                <img
                  src={`/schoolImages/${school.image}`}
                  alt={school.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f3f4f6'/%3E%3Ctext x='200' y='100' text-anchor='middle' dy='0.3em' font-family='sans-serif' font-size='14' fill='%236b7280'%3ESchool Image%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  {school.name}
                </h2>
                <div className="flex items-start space-x-2 text-gray-600">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm leading-relaxed">
                    {school.address}, {school.city}
                  </p>
                </div>

                {/* Action Button */}
                <Link href={`/show-schools/${school.id}`}>
                  <button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-2.5 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 focus:outline-none">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSchools.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              {searchQuery ? (
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              ) : (
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery ? "No Schools Found" : "No Schools Available"}
            </h3>
            <p className="text-gray-600">
              {searchQuery 
                ? `No schools match your search for "${searchQuery}". Try adjusting your search terms.`
                : "We couldn't find any schools to display at the moment."
              }
            </p>
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}