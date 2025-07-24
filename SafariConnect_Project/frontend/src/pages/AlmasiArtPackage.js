import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AlmasiArtPackage = () => {
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
      destination: 'Almasi Art Agency',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🎨 Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Almasi Art Agency</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Almasi Art Agency is a contemporary African art space that showcases emerging and established Kenyan artists. From stunning canvases to interactive installations, it’s a hub for creativity and culture in Nairobi.
        </p>
      </div>

      <div className="image-gallery">
        {[
          'https://media.istockphoto.com/id/1296806640/photo/contemporary-african-art-gallery.jpg',
          'https://www.artsy.net/images/kind/c/african_art_gallery.jpg',
          'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
          'https://images.unsplash.com/photo-1535083781169-85c5f3d8f6e6',
          'https://images.unsplash.com/photo-1508975553012-7c4d6e67e90c',
          'https://media.istockphoto.com/id/1210119317/photo/african-paintings-on-display.jpg'
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
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🎭 Artistic Highlights</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Paintings, sculptures & installations by Kenyan artists</li>
          <li>Live art demonstrations & artist meet-and-greets</li>
          <li>Workshops in painting, photography, and crafts</li>
          <li>Art for purchase and exhibition tours</li>
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
            <textarea name="interests" value={formData.interests} onChange={handleChange} rows="3" placeholder="e.g. art, photography, workshops" className="w-full border border-gray-300 rounded px-4 py-2" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full">
            Submit Booking
          </button>
        </form>
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Find Almasi Art Agency</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Almasi Art Agency Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1992.1026709631812!2d36.798823084185935!3d-1.2917907999999933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1762d9f3c9e1%3A0x7cb5b8fa4bb969a6!2sAlmasi%20Art%20Agency!5e0!3m2!1sen!2ske!4v1656123456789!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">🗓️ Upcoming Exhibitions</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🎨 <strong>Oct 5:</strong> Nairobi Art Collective Showcase</li>
          <li>🧑‍🎨 <strong>Oct 12:</strong> Live Sketching & Wine Evening</li>
          <li>📷 <strong>Oct 20:</strong> Visual Storytelling Workshop</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Almasi%20Art%20Agency%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default AlmasiArtPackage;
