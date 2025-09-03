"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchoolPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

const onSubmit = async (data) => {
  setIsSubmitting(true);
  setMessage("");

  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "image" && data[key][0]) {
        formData.append(key, data[key][0]);
      } else if (key !== "image") {
        formData.append(key, data[key]);
      }
    });

    const res = await fetch("/api/schools", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (res.ok) {
      setMessage(result.message || "School added successfully!");
      reset();

      // ✅ If DB is unavailable and API falls back
      if (result.fallback) {
        const stored = JSON.parse(localStorage.getItem("fallbackSchools") || "[]");

        stored.push({
          id: Date.now(), // temporary unique ID
          name: data.name,
          address: data.address,
          city: data.city,
          state: data.state,
          contact: data.contact,
          email_id: data.email_id,
          image: result.imageName || "placeholder.jpg",
        });

        localStorage.setItem("fallbackSchools", JSON.stringify(stored));
      }
    } else {
      setMessage(result.error || "Failed to add school. Please try again.");
    }
  } catch (error) {
    setMessage("An error occurred. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Add New School
          </h1>
          <p className="text-gray-600 text-lg">
            Fill in the details below to add a school to our directory
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 md:p-10">
          <div className="space-y-6">
            {/* School Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                School Name *
              </label>
              <input 
                {...register("name", { required: "School name is required" })} 
                placeholder="Enter school name"
                className={`w-full px-4 py-3 rounded-xl border-2 text-black transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                  errors.name 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{errors.name.message}</span>
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Address *
              </label>
              <input 
                {...register("address", { required: "Address is required" })} 
                placeholder="Enter street address"
                className={`w-full px-4 text-black py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                  errors.address 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{errors.address.message}</span>
                </p>
              )}
            </div>

            {/* City and State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  City *
                </label>
                <input 
                  {...register("city", { required: "City is required" })} 
                  placeholder="Enter city"
                  className={`w-full text-black px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                    errors.city 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                  }`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{errors.city.message}</span>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  State *
                </label>
                <input 
                  {...register("state", { required: "State is required" })} 
                  placeholder="Enter state"
                  className={`w-full text-black px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                    errors.state 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                  }`}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{errors.state.message}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Contact and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Contact Number *
                </label>
                <input 
                  {...register("contact", { 
                    required: "Contact number is required",
                    pattern: {
                      value: /^[0-9+\-\s()]+$/,
                      message: "Invalid contact number"
                    }
                  })} 
                  placeholder="Enter contact number"
                  type="tel"
                  className={`w-full text-black px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                    errors.contact 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                  }`}
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{errors.contact.message}</span>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address *
                </label>
                <input 
                  {...register("email_id", { 
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/i,
                      message: "Invalid email address"
                    }
                  })} 
                  placeholder="Enter email address"
                  type="email"
                  className={`w-full text-black px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                    errors.email_id 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                  }`}
                />
                {errors.email_id && (
                  <p className="text-red-500 text-sm flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{errors.email_id.message}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                School Image *
              </label>
              <div className="relative">
                <input 
                  {...register("image", { 
                    required: "School image is required",
                    validate: {
                      fileType: (files) => {
                        if (!files[0]) return true;
                        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
                        return allowedTypes.includes(files[0].type) || "Only JPEG, PNG, and WebP images are allowed";
                      },
                      fileSize: (files) => {
                        if (!files[0]) return true;
                        return files[0].size <= 5 * 1024 * 1024 || "File size must be less than 5MB";
                      }
                    }
                  })} 
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-3 text-black rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-medium hover:file:bg-blue-100"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              {errors.image && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{errors.image.message}</span>
                </p>
              )}
              <p className="text-xs text-gray-900">
                Upload a high-quality image of the school (JPEG, PNG, WebP, max 5MB)
              </p>
            </div>

            {/* Submit Button */}
            <button 
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Adding School...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add School</span>
                </>
              )}
            </button>
                      </div>

          {/* Success/Error Message */}
          {message && (
            <div className={`mt-6 p-4 rounded-xl flex items-center space-x-3 ${
              message.includes("successfully") 
                ? "bg-green-50 border border-green-200 text-green-800" 
                : "bg-red-50 border border-red-200 text-red-800"
            }`}>
              {message.includes("successfully") ? (
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              <span className="font-medium">{message}</span>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-blue-50/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Quick Tips</h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                Make sure all information is accurate and complete. The school image should be clear and representative of the institution. All fields marked with * are required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}