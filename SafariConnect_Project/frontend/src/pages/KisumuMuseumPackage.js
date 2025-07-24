import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const KisumuMuseumPackage = () => {
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
      destination: 'Kisumu Museum',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🏛️ Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Kisumu Museum</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Discover the heritage of Western Kenya at Kisumu Museum — featuring Luo traditional homesteads, cultural artifacts, fish species, and exhibitions about Lake Victoria’s biodiversity.
        </p>
      </div>

      <div className="image-gallery">
        {[
          'https://upload.wikimedia.org/wikipedia/commons/1/1e/Kisumu_Museum_Luo_homestead.jpg',
          'https://images.unsplash.com/photo-1581919774935-5992cf49c1d4',
          'https://upload.wikimedia.org/wikipedia/commons/9/97/Kisumu_Museum.jpg',
          'https://www.kenyans.co.ke/files/styles/article_style_mobile/public/images/media/Kisumu%20Museum%20Exhibit.jpg',
          'https://cdn.britannica.com/57/201657-050-BF123C2D/Kisumu-Kenya.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/7/76/Kisumu_Museum_fish_exhibit.jpg'
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
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🏺 Cultural & Natural Exhibits</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Luo homestead replicas and community life exhibits</li>
          <li>Traditional fishing tools and artifacts</li>
          <li>Aquarium with native fish species of Lake Victoria</li>
          <li>Snake pit and biodiversity information</li>
          <li>Great for student field trips and researchers</li>
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
            <textarea name="interests" value={formData.interests} onChange={handleChange} rows="3" placeholder="e.g. anthropology, aquatic life, Luo culture" className="w-full border border-gray-300 rounded px-4 py-2" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full">
            Submit Booking
          </button>
        </form>
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Find Us on the Map</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Kisumu Museum Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.635912526302!2d34.74816958794148!3d-0.10332643716163616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182aa5435079e9a3%3A0x9872dbdaefc8e2e3!2sKisumu%20Museum!5e0!3m2!1sen!2ske!4v1628592782345!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">📆 Upcoming Museum Days</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🎓 <strong>Sept 5:</strong> Student Field Day + Snake Talk</li>
          <li>🎣 <strong>Sept 11:</strong> Traditional Fishing Demo</li>
          <li>🏺 <strong>Sept 20:</strong> Luo Culture & Heritage Showcase</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Kisumu%20Museum%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default KisumuMuseumPackage;
