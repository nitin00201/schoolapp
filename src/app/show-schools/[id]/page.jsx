"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function SchoolDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/schools/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSchool(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <p className="p-6 text-center">Loading school details...</p>;
  }

  if (!school) {
    return <p className="p-6 text-center text-red-500">School not found</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <img
          src={`/schoolImages/${school.image}`}
          alt={school.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{school.name}</h1>
          <p className="text-gray-700 mb-4">{school.address}, {school.city}, {school.state}</p>

          <div className="space-y-2 text-gray-800">
            <p><strong>📞 Contact:</strong> {school.contact}</p>
            <p><strong>📧 Email:</strong> {school.email_id}</p>
          </div>

          <button
            onClick={() => router.push("/show-schools")}
            className="mt-6 inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition"
          >
            ← Back to Schools
          </button>
        </div>
      </div>
    </div>
  );
}
