import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const WildWatersPackage = () => {
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
      destination: 'Wild Waters Mombasa',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🎢 Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Wild Waters Mombasa</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Wild Waters is Mombasa’s premier water park with thrilling slides, splash pools, lazy rivers, and entertainment for all ages — a must-visit for fun seekers and families!
        </p>
      </div>

      <div className="image-gallery">
        {[
          'https://wildwaterskenya.com/images/gallery/1.jpg',
          'https://wildwaterskenya.com/images/gallery/3.jpg',
          'https://wildwaterskenya.com/images/gallery/6.jpg',
          'https://images.unsplash.com/photo-1607392041348-0c3987f9066b',
          'https://images.unsplash.com/photo-1608571428526-0b7d4c9b94cb',
          'https://wildwaterskenya.com/images/gallery/5.jpg'
        ].map((img, i) => (
          <ImageComponent
            key={i}
            src={img}
            alt={`${fileName.replace("Package.js", "").replace(".js", "")} image ${i + 1}`}
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
        ))}
      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🎉 Attractions</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>12+ water slides for kids and adults</li>
          <li>Rain dance, lazy river, and splash zones</li>
          <li>Food court, gaming arcade, and bouncing castle</li>
          <li>Birthday and event packages</li>
          <li>Safe, family-friendly water thrills</li>
        </ul>
      </div>

      <div className="mt-16 bg-white p-8 rounded-2xl shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">📅 Book Your Day</h2>
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
            <label className="block text-gray-700 mb-2 font-semibold">Interests</label>
            <textarea name="interests" value={formData.interests} onChange={handleChange} rows="3" placeholder="e.g. water slides, group fun, family day" className="w-full border border-gray-300 rounded px-4 py-2" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full">
            Submit Booking
          </button>
        </form>
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Location on Map</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Wild Waters Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.2712630810026!2d39.69097581600782!3d-4.043903997003802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1840120c49f430e3%3A0x622b3d7ef3085c92!2sWild%20Waters!5e0!3m2!1sen!2ske!4v1628542191070!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">🎊 Upcoming Activities</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🎂 <strong>Sept 5:</strong> Kids Carnival & Foam Party</li>
          <li>🎤 <strong>Sept 12:</strong> Live DJ Pool Bash</li>
          <li>🏊 <strong>Every Weekend:</strong> Family Splash Days</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Wild%20Waters%20Mombasa%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default WildWatersPackage;
