import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const WatamuSnakeFarmPackage = () => {
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
      destination: 'Watamu Snake Farm',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🐍 Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Watamu Snake Farm</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          The Watamu Snake Farm is a world-renowned center for snake education, rescue, venom research, and conservation. Visitors can safely observe a variety of snakes and learn about their vital ecological role.
        </p>
      </div>

      <div className="image-gallery">
        {[
          'https://watamusnakefarm.org/wp-content/uploads/2021/05/SnakeFarm13-scaled.jpg',
          'https://watamusnakefarm.org/wp-content/uploads/2021/05/SnakeFarm06-scaled.jpg',
          'https://watamusnakefarm.org/wp-content/uploads/2021/05/SnakeFarm10-scaled.jpg',
          'https://watamusnakefarm.org/wp-content/uploads/2021/05/SnakeFarm11-scaled.jpg',
          'https://watamusnakefarm.org/wp-content/uploads/2021/05/SnakeFarm08-scaled.jpg',
          'https://watamusnakefarm.org/wp-content/uploads/2021/05/SnakeFarm12-scaled.jpg'
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
        <h2 className="text-2xl font-bold text-green-800 mb-4">🦎 Tour Highlights</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Over 20 species of venomous and non-venomous snakes</li>
          <li>Live demonstrations & snake handling (safe & guided)</li>
          <li>Learn about venom extraction & antivenom production</li>
          <li>Wildlife rescue and snake conservation talks</li>
          <li>Family-friendly and educational for all ages</li>
        </ul>
      </div>

      <div className="mt-16 bg-white p-8 rounded-2xl shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-green-800 mb-6">📅 Book Your Visit</h2>
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
            <textarea name="interests" value={formData.interests} onChange={handleChange} rows="3" placeholder="e.g. reptiles, venom research, conservation" className="w-full border border-gray-300 rounded px-4 py-2" />
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-full">
            Submit Booking
          </button>
        </form>
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">📍 Visit the Snake Farm</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Watamu Snake Farm Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1992.7035091435034!2d40.01215171560864!3d-3.3783149999999935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1815c7ddcd9c8bbd%3A0xb5d66aa838c91cb7!2sBio-Ken%20Snake%20Farm!5e0!3m2!1sen!2ske!4v1656522100000!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">📢 Events & Talks</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🧪 <strong>Sept 9:</strong> Venom Extraction Demo & Tour</li>
          <li>🐍 <strong>Sept 16:</strong> Snake Rescue Stories & Kids’ Q&A</li>
          <li>🌍 <strong>Sept 24:</strong> Eco-Conservation & Snake Myths Talk</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Watamu%20Snake%20Farm%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default WatamuSnakeFarmPackage;
