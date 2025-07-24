import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const HellsGatePackage = () => {
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
      destination: "Hell's Gate National Park",
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
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Hell's Gate National Park</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Located in the Great Rift Valley near Lake Naivasha, Hell’s Gate is one of Kenya’s most dramatic landscapes.
          Famous for its cliffs, gorges, rock towers, and geothermal activity — it’s perfect for hiking, biking, and wildlife spotting.
        </p>
      </div>

      {/* Gallery */}
      <div className="image-gallery">
        {[
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Hell%27s_Gate_Gorge_Kenya.jpg/640px-Hell%27s_Gate_Gorge_Kenya.jpg',
          'https://www.experienceeastafrica.com/images/hells-gate-1.jpg',
          'https://images.unsplash.com/photo-1577819118210-7a5ffdb35efc',
          'https://images.unsplash.com/photo-1593345123761-3aeb0dd6cf7a',
          'https://upload.wikimedia.org/wikipedia/commons/3/3a/Hells_Gate_National_Park.jpg',
          'https://cdn.britannica.com/73/185973-050-20E0AD5A/Hells-Gate-National-Park-Kenya.jpg'
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
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🗺️ Highlights & Activities</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Hiking through Hell’s Gate Gorge & Fischer’s Tower</li>
          <li>Rock climbing & cycling through wild terrain</li>
          <li>Wildlife spotting — zebras, giraffes, buffalos</li>
          <li>Hot springs, volcanic plugs, and geothermal spa</li>
          <li>Guided tours and camping options available</li>
        </ul>
      </div>

      {/* Booking Form */}
      <div id="booking" className="mt-16 bg-white p-8 rounded-2xl shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">📅 Book Your Visit</h2>
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
              placeholder="e.g. hiking, wildlife photography, hot springs"
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

      {/* Map */}
      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Map to Hell's Gate</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Hell's Gate National Park Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.307739082224!2d36.3074957!3d-0.9004964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182a29e0071a2b45%3A0x94576a3e3ae9e8f7!2sHell's%20Gate%20National%20Park!5e0!3m2!1sen!2ske!4v1628522117157!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Events */}
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">🔥 Upcoming Events & Tours</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🧗 <strong>Sept 3:</strong> Rock Climbing Adventure Challenge</li>
          <li>🚵 <strong>Sept 10:</strong> Guided Bike Safari + Picnic</li>
          <li>🎒 <strong>Sept 15:</strong> Gorge Trekking Expedition</li>
        </ul>
      </div>

      {/* WhatsApp */}
      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Hell's%20Gate%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default HellsGatePackage;
