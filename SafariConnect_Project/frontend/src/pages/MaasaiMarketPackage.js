import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MaasaiMarketPackage = () => {
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
      destination: 'Maasai Market',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🛍️ Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Maasai Market</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          The Maasai Market is a vibrant cultural marketplace where artisans sell handmade crafts, jewelry, clothing, and artworks. It’s a perfect stop for souvenir shopping, cultural exploration, and meeting local creators.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          'https://nairobicity.ke/sites/default/files/2021-12/maasai-market.jpg',
          'https://images.unsplash.com/photo-1591218989436-0c98c3c177b7',
          'https://kenyanbackpacker.com/wp-content/uploads/2019/08/Maasai-Market-Nairobi.jpg',
          'https://www.expatkings.com/wp-content/uploads/2020/08/Maasai-market.jpg',
          'https://www.kenya-advisor.com/images/maasai-market-nairobi-kenya.jpg',
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1'
        ].map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Maasai Market image ${i + 1}`}
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
        ))}
      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-red-800 mb-4">🛍️ What to Expect</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Handcrafted jewelry, beadwork & sandals</li>
          <li>Traditional Maasai clothing & fabrics</li>
          <li>Art pieces, paintings & wood carvings</li>
          <li>Live demos and cultural storytelling</li>
          <li>Bargaining and direct artisan support</li>
        </ul>
      </div>

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
            <label className="block text-gray-700 mb-2 font-semibold">Group Size</label>
            <input name="groupSize" value={formData.groupSize} onChange={handleChange} type="number" min="1" max="50" className="w-full border border-gray-300 rounded px-4 py-2" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Interests</label>
            <textarea name="interests" value={formData.interests} onChange={handleChange} rows="3" placeholder="e.g. beadwork, shopping, artisan crafts" className="w-full border border-gray-300 rounded px-4 py-2" />
          </div>
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-full">
            Submit Booking
          </button>
        </form>
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-red-800 mb-4 text-center">📍 Locate Maasai Market</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Maasai Market Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.223471735066!2d36.81724499543483!3d-1.2841059324324108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d52b7c05f3%3A0x8b0c55c1131864c4!2sMaasai%20Market!5e0!3m2!1sen!2ske!4v1690000000000!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-red-800 mb-6 text-center">🎨 Upcoming Cultural Events</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🧵 <strong>Oct 8:</strong> Beadwork Workshop with Local Artisans</li>
          <li>🥁 <strong>Oct 15:</strong> Live Drumming & Dance Session</li>
          <li>🎨 <strong>Oct 22:</strong> Nairobi Open-Air Art Exhibition</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Maasai%20Market%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default MaasaiMarketPackage;
