"use client";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [stats, setStats] = useState({ totalSchools: 0, loading: true });

  useEffect(() => {
    // Fetch school count for stats
    fetch("/api/schools")
      .then((res) => res.json())
      .then((data) => {
        setStats({ totalSchools: data.length || 0, loading: false });
      })
      .catch(() => {
        setStats({ totalSchools: 0, loading: false });
      });
  }, []);

  const navigateToAddSchool = () => {
    window.location.href = "/add-school";
  };

  const navigateToShowSchools = () => {
    window.location.href = "/show-schools";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
             
              <span className="text-xl font-bold text-gray-900">SchoolHub</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={navigateToShowSchools}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Browse Schools
              </button>
              <button 
                onClick={navigateToAddSchool}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
              >
                Add School
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>

            <div className="relative z-10">
              <h1 className="text-5xl md:text-7xl font-bold mb-8">
                <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  School Management
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Made Simple
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Discover and manage educational institutions with our comprehensive platform. 
                Add new schools to the directory or browse through our extensive collection 
                of schools with detailed information and beautiful imagery.
              </p>

              {/* Stats */}
              <div className="flex justify-center mb-12">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-8 py-4 border border-gray-200/50 shadow-sm">
                  <div className="text-3xl font-bold text-gray-900">
                    {stats.loading ? (
                      <div className="w-12 h-8 bg-gray-200 rounded animate-pulse mx-auto"></div>
                    ) : (
                      stats.totalSchools
                    )}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stats.totalSchools === 1 ? 'School' : 'Schools'} Registered
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={navigateToShowSchools}
                  className="group bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-8 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md flex items-center space-x-3 min-w-[200px]"
                >
                  <svg className="w-6 h-6 text-blue-500 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Browse Schools</span>
                </button>
                
                <button 
                  onClick={navigateToAddSchool}
                  className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 min-w-[200px]"
                >
                  <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add New School</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A complete solution for managing school information with modern design and seamless user experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy School Registration</h3>
              <p className="text-gray-600 leading-relaxed">
                Add new schools to the directory with our intuitive form. Upload images, validate data, and store information securely.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Browse & Discover</h3>
              <p className="text-gray-600 leading-relaxed">
                Explore schools in a beautiful grid layout with high-quality images and essential information at a glance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Validated Data</h3>
              <p className="text-gray-600 leading-relaxed">
                All school information is validated and stored securely with proper error handling and data integrity checks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Whether you want to add a new school to our directory or explore existing institutions, 
                we've made it simple and intuitive.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={navigateToAddSchool}
                  className="bg-white text-blue-600 hover:text-blue-700 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 min-w-[180px]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add School</span>
                </button>
                
                <button 
                  onClick={navigateToShowSchools}
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 min-w-[180px]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>View Schools</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Add School Feature */}
            <div className="group cursor-pointer" onClick={navigateToAddSchool}>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  Add New School
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Register a new educational institution with our comprehensive form. Upload images, 
                  validate contact information, and add schools to the directory with ease.
                </p>
                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                  <span>Get Started</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Show Schools Feature */}
            <div className="group cursor-pointer" onClick={navigateToShowSchools}>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  Explore Schools
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Browse through our collection of schools displayed in a beautiful grid layout. 
                  View school information, images, and contact details in an intuitive interface.
                </p>
                <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                  <span>Start Exploring</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-2 flex space-x-2">
          <button 
            onClick={navigateToShowSchools}
            className="flex-1 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Browse</span>
          </button>
          <button 
            onClick={navigateToAddSchool}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            
            <span className="text-xl font-bold">SchoolHub</span>
          </div>
          <p className="text-gray-400">
            A modern school management platform built with Next.js and MySQL
          </p>
        </div>
      </footer>
    </div>
  );
}