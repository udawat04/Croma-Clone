import React from 'react'

const HeroSection = () => {
  return (
    <div>
      <section className="bg-gradient-to-r from-indigo-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Discover the Latest in Electronics
            </h1>
            <p className="text-lg text-gray-600">
              Upgrade your lifestyle with cutting-edge gadgets and unbeatable
              deals.
            </p>
            <a
              href="#"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
            >
              Shop Now
            </a>
          </div>
          {/* Image */}
          <div className="relative">
            <img
              src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1744715049/Croma%20Assets/CMS/LP%20Page%20Banners/2025/HP%20Rotating%20Banners/April/1604205/Desktop/HP_Rotating_iPhone_16April2025_unrfbv.jpg"
              alt=" featured product"
              className="w-full rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection