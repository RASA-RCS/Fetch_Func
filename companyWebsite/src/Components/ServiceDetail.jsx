import React from "react";
import { useParams, Link } from "react-router-dom";
import services from "./servicesData";

const ServiceDetail = () => {
  const { id } = useParams();

  // Flatten all items into one array
  const allServices = services.flatMap((section) => section.items);

  const service = allServices.find((s) => s.id === id);

  if (!service) {
    return (
      <h2 className="mt-20 text-center text-red-500">Service not found</h2>
    );
  }

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-3xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        <img
          src={service.img}
          alt={service.title}
          className="object-cover w-full h-64 mb-6 rounded-lg"
          
          
        />
        <h1 className="mb-4 text-3xl font-bold text-blue-700">{service.title}</h1>
        <p className="leading-relaxed text-gray-700">{service.description}</p>

        <Link
          to="/"
          className="inline-block mt-6 font-semibold text-blue-600 hover:underline"
        >
          ← Back to Services
        </Link>
      </div>
    </div>
  );
};

export default ServiceDetail;
