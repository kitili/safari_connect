import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const LichthausPackage = () => {
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
      destination: 'Lichthaus',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🎶 Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Lichthaus</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Lichthaus is Nairobi's alternative art and performance space, known for its vibrant mix of music, dance, poetry, and underground art culture. It's a sanctuary for creatives and explorers seeking authenticity and expression.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          'https://cdn.vanguardngr.com/wp-content/uploads/2022/04/IMG-20220424-WA0049.jpg',
          'https://images.unsplash.com/photo-1598387992706-0a93e7a9df3c',
          'https://images.unsplash.com/photo-1550686041-db1e62e5b250',
          'https://images.unsplash.com/photo-1598387900989-517cfa2c0083',
          'https://images.unsplash.com/photo-1600585153471-8c0f3b099d4a',
          'https://images.unsplash.com/photo-1582542029787-0d6e9a4e4896'
        ].map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Lichthaus image ${i + 1}`}
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
        ))}
      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">🌟 Experience Highlights</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Live music, poetry nights & open mic sessions</li>
          <li>Art exhibitions & interactive installations</li>
          <li>Pop-up food and drink markets</li>
          <li>Creative workshops & artist collaborations</li>
          <li>Evening bonfires, acoustic sets & storytelling</li>
        </ul>
      </div>

      <div className="mt-16 bg-white p-8 rounded-2xl shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-800 mb-6">📅 Book Your Experience</h2>
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
            <label className="block text-gray-700 mb-2 font-semibold">Group Size</label>
            <input name="groupSize" value={formData.groupSize} onChange={handleChange} type="number" min="1" max="50" className="w-full border border-gray-300 rounded px-4 py-2" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Interests</label>
            <textarea name="interests" value={formData.interests} onChange={handleChange} rows="3" placeholder="e.g. art, music, workshops" className="w-full border border-gray-300 rounded px-4 py-2" />
          </div>
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-full">
            Submit Booking
          </button>
        </form>
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-purple-800 mb-4 text-center">📍 Find Lichthaus</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Lichthaus Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1992.4430306878694!2d36.8023893156089!3d-1.2861121999999883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1765b6932855%3A0x8e1f8c81f192e539!2sLichthaus%20Nairobi!5e0!3m2!1sen!2ske!4v1656432100000!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">🎤 Upcoming Events</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🎸 <strong>Sept 8:</strong> Indie Music Night & Poetry Slam</li>
          <li>🖌️ <strong>Sept 15:</strong> Visual Art Jam + Street Market</li>
          <li>🎧 <strong>Sept 23:</strong> Deep House Night with Guest DJ</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Lichthaus%20experience"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default LichthausPackage;
