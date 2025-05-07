import React from "react";
import Navbar from "../components/Navbar";

const Services = () => {
  const services = [
    {
      title: "Real-time Code Editing",
      description:
        "Edit HTML, CSS, and JavaScript in real-time with instant preview. Perfect for testing ideas quickly.",
      icon: "💡",
    },
    {
      title: "Project Auto-Save",
      description:
        "Save your projects to the cloud using Ctrl + S. Your work is always safe and accessible.",
      icon: "💾",
    },
    {
      title: "User Authentication",
      description:
        "Secure login and signup system using JWT. Your projects are tied to your account only.",
      icon: "🔐",
    },
    {
      title: "Modern UI",
      description:
        "Clean, responsive, and mobile-friendly design built with Tailwind CSS for a smooth user experience.",
      icon: "🎨",
    },
    {
      title: "MongoDB Integration",
      description:
        "Data is stored securely in MongoDB. Retrieve your code anytime from any device.",
      icon: "🗂️",
    },
    {
      title: "Open-Source Friendly",
      description:
        "Built to be extended. Contribute or fork the project on GitHub and customize it to your needs.",
      icon: "🌍",
    },
  ];

  return (
    <div>
        <Navbar />
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
          Our Services
        </h1>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-2xl transition"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                {service.title}
              </h2>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>

      
      </div>
    </div>
    </div>
  );
};

export default Services;
