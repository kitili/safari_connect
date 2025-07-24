import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TsavoWestPackage = () => {
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    date: '',
    groupSize: '',
    interests: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      ...formData,
      destination: "Tsavo West National Park",
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🎉 Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Tsavo West National Park</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Located in southeastern Kenya, Tsavo West is one of the largest national parks in Kenya. Known for its stunning landscape of rolling volcanic hills, lava flows, rivers, and diverse wildlife including lions, leopards, elephants, and hippos.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          'https://images.unsplash.com/photo-1609337462221-e5c26f61e51d',
          'https://images.unsplash.com/photo-1610901322193-1d3cc9430a8b',
          'https://images.unsplash.com/photo-1616779009435-376cf7b72c7b',
          'https://images.unsplash.com/photo-1581929369564-6b1edba5d847',
          'https://images.unsplash.com/photo-1616240975351-d3ff87c2d09b',
          'https://images.unsplash.com/photo-1616166334436-68b4818cfd61'
        ].map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Tsavo image ${i + 1}`}
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
        ))}
      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🦁 What to Expect</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Explore Mzima Springs with crystal-clear pools and hippos</li>
          <li>Visit the Shetani Lava Flow and Chaimu Crater</li>
          <li>Game drives featuring elephants, lions, and rhinos</li>
          <li>Guided walks and birdwatching excursions</li>
          <li>Luxury lodges and scenic viewpoints</li>
        </ul>
      </div>

      <div id="booking" className="mt-16 bg-white p-8 rounded-2xl shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">📅 Book Your Safari</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">ID / Passport Number</label>
            <input
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Date of Visit</label>
            <input
              name="date"
              value={formData.date}
              onChange={handleChange}
              type="date"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Number of People</label>
            <input
              name="groupSize"
              value={formData.groupSize}
              onChange={handleChange}
              type="number"
              min="1"
              max="50"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Travel Interests</label>
            <textarea
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              rows="3"
              placeholder="e.g. game drives, Mzima Springs, birdwatching"
              className="w-full border border-gray-300 rounded px-4 py-2"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full"
          >
            Submit Booking
          </button>
        </form>
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Location Map</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Tsavo West National Park Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31863.0797862562!2d38.14521730932455!3d-2.9994621320316506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1843d27df9dc9d1b%3A0x95ce7eb8d90e37f5!2sTsavo%20West%20National%20Park!5e0!3m2!1sen!2ske!4v1628703032483!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">🌄 Upcoming Tsavo Events</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🚙 <strong>Sept 7:</strong> Tsavo Full-Day Game Drive</li>
          <li>🌋 <strong>Sept 14:</strong> Shetani Lava Flow Hike</li>
          <li>📸 <strong>Sept 20:</strong> Wildlife Photography Safari</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Tsavo%20West%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default TsavoWestPackage;
