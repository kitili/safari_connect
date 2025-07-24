import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const GediRuinsPackage = () => {
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
      destination: "Gedi Ruins Malindi-Snake Park",
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🎉 Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Gedi Ruins & Snake Park</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Explore the ancient Swahili town of Gedi nestled in the Arabuko Sokoke Forest. This archaeological gem dates back to the 12th century and is rich in history and mystique — paired with an exciting snake park experience nearby.
        </p>
      </div>

      {/* Gallery */}
      <div className="image-gallery">
        {[
          'https://upload.wikimedia.org/wikipedia/commons/6/63/Gede_Ruins_-_Malindi.jpg',
          'https://images.unsplash.com/photo-1583203207484-95915a0c8852',
          'https://images.unsplash.com/photo-1549887534-351d945e5b42',
          'https://upload.wikimedia.org/wikipedia/commons/e/ea/Gedi_ruins_1.JPG',
          'https://upload.wikimedia.org/wikipedia/commons/7/72/GedeRuinsKenya.JPG',
          'https://images.unsplash.com/photo-1582197438561-83d236f43bcb'
        ].map((img, i) => (
          <ImageComponent
            key={i}
            src={img}
            alt={`${fileName.replace("Package.js", "").replace(".js", "")} image ${i + 1}`}
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
        ))}
      </div>

      {/* Highlights */}
      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🏛️ Highlights</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Explore ancient coral-stone ruins & Swahili architecture</li>
          <li>Visit the Gedi museum and see excavated artifacts</li>
          <li>Discover rare reptiles and snakes at the nearby park</li>
          <li>Walk forest trails through Arabuko Sokoke</li>
          <li>Ideal for school tours, history lovers & families</li>
        </ul>
      </div>

      {/* Booking Form */}
      <div className="mt-16 bg-white p-8 rounded-2xl shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">📅 Book Your Visit</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Full Name</label>
            <input name="name" value={formData.name} onChange={handleChange} type="text" className="w-full border border-gray-300 rounded px-4 py-2" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">ID / Passport Number</label>
            <input name="idNumber" value={formData.idNumber} onChange={handleChange} type="text" className="w-full border border-gray-300 rounded px-4 py-2" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Date of Visit</label>
            <input name="date" value={formData.date} onChange={handleChange} type="date" className="w-full border border-gray-300 rounded px-4 py-2" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Number of People</label>
            <input name="groupSize" value={formData.groupSize} onChange={handleChange} type="number" min="1" max="50" className="w-full border border-gray-300 rounded px-4 py-2" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Travel Interests</label>
            <textarea name="interests" value={formData.interests} onChange={handleChange} rows="3" placeholder="e.g. ruins, snake park, nature walk" className="w-full border border-gray-300 rounded px-4 py-2" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full">
            Submit Booking
          </button>
        </form>
      </div>

      {/* Map */}
      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Gedi Ruins on Google Maps</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Gedi Ruins Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15948.36460752671!2d40.0030978!3d-3.3064454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182a3ef207be91cb%3A0x76e7288f648e8f77!2sGedi%20Ruins!5e0!3m2!1sen!2ske!4v1628534590876!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Events */}
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">📌 Upcoming Tours</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>📖 <strong>Aug 12:</strong> Guided Historical Walk & Forest Trail</li>
          <li>🐍 <strong>Aug 20:</strong> Snake Handling & Conservation Workshop</li>
          <li>🏛️ <strong>Aug 27:</strong> Night at the Ruins – Light & Sound Show</li>
        </ul>
      </div>

      {/* WhatsApp */}
      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Gedi%20Ruins%20Malindi-Snake%20Park%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default GediRuinsPackage;
