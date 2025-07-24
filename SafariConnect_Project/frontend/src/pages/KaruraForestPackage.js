import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const KaruraForestPackage = () => {
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
      destination: 'Karura Forest',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🌳 Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Karura Forest</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Nestled in Nairobi, Karura Forest is a serene urban forest reserve offering
          tranquil walking trails, scenic waterfalls, bamboo groves, and a peaceful escape from the city.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          'https://upload.wikimedia.org/wikipedia/commons/b/b4/Karura_Forest_Trail.jpg',
          'https://nairobiluxuryliving.com/wp-content/uploads/2022/09/karura-forest.jpg',
          'https://www.traveldiscoverkenya.com/wp-content/uploads/2022/04/Karura-Forest.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/d/df/Karura_forest_waterfall.jpg',
          'https://www.kenyaforestservice.org/images/Karura2.jpg',
          'https://www.tuko.co.ke/images/4b296f3f70a7c2cf.jpg'
        ].map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Karura Forest image ${i + 1}`}
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
        ))}
      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-green-800 mb-4">🌿 Highlights</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Nature walks & biking trails</li>
          <li>Beautiful waterfalls & caves</li>
          <li>Birdwatching and forest picnics</li>
          <li>Butterfly watching & indigenous trees</li>
          <li>Safe, family-friendly green escape</li>
        </ul>
      </div>

      <div id="booking" className="mt-16 bg-white p-8 rounded-2xl shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-green-800 mb-6">📅 Book Your Visit</h2>
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
              placeholder="e.g. walking, birdwatching, photography"
              className="w-full border border-gray-300 rounded px-4 py-2"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-full"
          >
            Submit Booking
          </button>
        </form>
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">📍 Karura Forest Map</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Karura Forest Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1991.9545540672945!2d36.81845141576704!3d-1.250658199074602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f175c304b9511%3A0xf99db365c6550c14!2sKarura%20Forest!5e0!3m2!1sen!2ske!4v1628532105146!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I%20am%20interested%20in%20Karura%20Forest"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default KaruraForestPackage;
