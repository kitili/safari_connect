import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const LewaConservancyPackage = () => {
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
      destination: 'Lewa Wildlife Conservancy',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🦏 Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Lewa Wildlife Conservancy</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          A UNESCO World Heritage Site, Lewa Conservancy in Laikipia is renowned for its rhino sanctuary and pioneering conservation work. Perfect for wildlife lovers and eco-tourists.
        </p>
      </div>

      <div className="image-gallery">
        {[
          'https://upload.wikimedia.org/wikipedia/commons/0/00/Lewa_DSC_0600_%2821921573089%29.jpg',
          'https://images.unsplash.com/photo-1582478191500-905c7e269299',
          'https://www.lewa.org/sites/default/files/styles/media_crop/public/2020-06/rhino-field.jpg',
          'https://images.unsplash.com/photo-1597848212624-eae76c9d70ff',
          'https://upload.wikimedia.org/wikipedia/commons/d/dc/Lewa_Savannah_Kenya.jpg',
          'https://images.unsplash.com/photo-1603165564791-b37ce130fbc6'
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
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🦏 Conservation Highlights</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Visit the Rhino Sanctuary — home to 10% of Kenya’s rhino population</li>
          <li>Track lions, elephants, and Grevy’s zebras</li>
          <li>Learn from Lewa’s anti-poaching rangers and conservationists</li>
          <li>Enjoy eco-lodges with views of Mt. Kenya</li>
          <li>Participate in rhino census & community projects</li>
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
            <label className="block text-gray-700 mb-2 font-semibold">Date of Travel</label>
            <input name="date" value={formData.date} onChange={handleChange} type="date" className="w-full border border-gray-300 rounded px-4 py-2" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Group Size</label>
            <input name="groupSize" value={formData.groupSize} onChange={handleChange} type="number" min="1" max="50" className="w-full border border-gray-300 rounded px-4 py-2" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Travel Interests</label>
            <textarea name="interests" value={formData.interests} onChange={handleChange} rows="3" placeholder="e.g. rhinos, conservation, tracking, nature" className="w-full border border-gray-300 rounded px-4 py-2" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full">
            Submit Booking
          </button>
        </form>
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Locate Lewa Conservancy</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Lewa Conservancy Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2040.7023979614528!2d37.417260774824245!3d0.2765091862592027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1829017c8894a8ff%3A0xa1d05d4b8b80486e!2sLewa%20Wildlife%20Conservancy!5e0!3m2!1sen!2ske!4v1628708452439!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">📅 Upcoming Activities</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🦏 <strong>Sept 10:</strong> Rhino Tracking Adventure</li>
          <li>🌍 <strong>Sept 17:</strong> Community Conservation Forum</li>
          <li>🌅 <strong>Sept 24:</strong> Mt. Kenya Sundowner Safari</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Lewa%20Conservancy%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default LewaConservancyPackage;
