import React from 'react';
import ImageComponent from '../components/ImageComponent';
import '../styles/images.css';

const NairobiMuseumPackage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Nairobi National Museum</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Located on Museum Hill, just 10 minutes from Nairobi’s CBD, the Nairobi National Museum is a hub of Kenya’s rich heritage.
          Visitors can immerse themselves in the history, nature, culture, and contemporary art of the country — all under one roof.
        </p>
      </div>

      {/* Gallery */}
     <div className="image-gallery">
  {[
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb4NflVbcWBV4_flM9TEv_stDOUqib9RcOaw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0mSxzqnAi74Pv_iHN81kO_cDg8zW3e04i6Q&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9IDJGm3yzfqizdr8cLxt5l3DZaaw_7XLRtQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXkBSRYIwivC1I1Noprnd-KME2mK4li1MXhQ&s',
    'https://momaa.org/wp-content/uploads/2019/10/Culture-Zoma-Contemporary-Art-Center-Article01.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ErxIByVxRXUwb1Fsgr-EGwoQ3JS27lF01g&s'
  ].map((img, i) => (
    <ImageComponent
      key={i}
      src={img}
      alt={`Museum image ${i + 1}`}
      className="rounded-xl shadow-lg w-full h-64 object-cover"
    />
  ))}
</div>

      {/* Entry Details */}
      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🎫 Entry Fees</h2>
        <ul className="text-gray-700 text-lg space-y-2">
          <li>👨‍🦱 Adults: <strong>Ksh 1,200</strong></li>
          <li>🧒 Children: <strong>Ksh 600</strong></li>
          <li>🎓 Students (with ID): <strong>Ksh 600</strong></li>
        </ul>

        <h2 className="text-2xl font-bold text-blue-800 mt-8 mb-4">🗺️ Highlights</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Fossils and artifacts from Kenya’s prehistoric past</li>
          <li>Traditional African cultures and colonial history exhibits</li>
          <li>Snake Park with live reptiles, amphibians, and fish</li>
          <li>Botanical gardens with indigenous Kenyan flora</li>
          <li>Contemporary exhibitions and local artwork</li>
        </ul>
      </div>

      {/* SafariConnect */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 shadow-lg mb-12">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">🚐 Travel Smarter with SafariConnect</h2>
        <p className="text-gray-700 text-lg mb-4">
          Save money and meet fellow travelers by pooling your visit through SafariConnect.
        </p>
        <ul className="text-gray-700 text-base list-disc list-inside space-y-2">
          <li>🔍 Match with others visiting on the same day</li>
          <li>💬 Coordinate travel via in-app chat</li>
          <li>🚗 Share rides and tour guides</li>
          <li>🌟 Review your experience to help others</li>
        </ul>
      </div>

      {/* Opening Hours */}
      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🕒 Opening Hours</h2>
        <p className="text-gray-700 text-lg">
          Open Daily: <strong>8:30 AM – 5:30 PM</strong><br />
          Including weekends and public holidays.
        </p>
      </div>

      {/* Contact Info */}
      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">📞 Contact Information</h2>
        <p className="text-gray-700 text-lg">
          <strong>Phone:</strong> 0721 308485<br />
          <strong>Email:</strong> dgnmk@museums.or.ke.<br />
          <strong>Location:</strong> Museum Hill, Kipande Road, Nairobi, Kenya
        </p>
      </div>

      {/* Google Map */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Find Us on Google Maps</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Nairobi National Museum Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.451352422697!2d36.80831956836759!3d-1.2719243059364587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1731a65fd623%3A0x3f98d671ea16b6d3!2sNairobi%20National%20Museum!5e0!3m2!1sen!2ske!4v1628323751711!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <a
          href="/booking"
          className="inline-block bg-yellow-500 text-white text-lg font-bold px-6 py-3 rounded-full shadow hover:bg-yellow-600 transition"
        >
          Plan My Visit
        </a>
      </div>

      {/* Booking Form */}
      <div className="mt-16 bg-white p-8 rounded-2xl shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">📅 Book Your Visit</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Date of Visit</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Number of People</label>
            <input
              type="number"
              min="1"
              max="50"
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="e.g. 4"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-full"
            >
              Submit Booking
            </button>
          </div>
        </form>
      </div>

      {/* Upcoming Events */}
      <div className="mt-20 bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">📌 Upcoming Tours & Events</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🎨 <strong>July 15, 2025:</strong> Contemporary African Art Showcase</li>
          <li>🐍 <strong>July 20, 2025:</strong> Live Snake Feeding Tour & Talk</li>
          <li>🏺 <strong>August 5, 2025:</strong> History of Kenya Walkthrough with curator</li>
          <li>🌿 <strong>Every Saturday:</strong> Botanical Garden Guided Nature Walks</li>
        </ul>
      </div>

      {/* WhatsApp Floating Chat */}
      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I%20want%20to%20inquire%20about%20the%20Nairobi%20Museum%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default NairobiMuseumPackage;
