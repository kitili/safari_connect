import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ArabukoSokokePackage = () => {
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
      destination: 'Arabuko Sokoke Forest',
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
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Arabuko Sokoke Forest</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Located near Malindi, Arabuko Sokoke is the largest coastal forest in East Africa and home to rare birds, butterflies, and endemic mammals.
          A must-visit for birdwatchers, conservationists, and nature lovers.
        </p>
      </div>

      <div className="image-gallery">
        {[
          'https://upload.wikimedia.org/wikipedia/commons/d/da/Arabuko_Sokoke_Forest_Malindi.jpg',
          'https://www.kws.go.ke/sites/default/files/parks/ArabukoSokoke1.jpg',
          'https://images.unsplash.com/photo-1614184466543-c59d663641bd',
          'https://upload.wikimedia.org/wikipedia/commons/1/13/Sokoke_scops_owl.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/5/57/Butterfly_in_Arabuko.jpg',
          'https://images.unsplash.com/photo-1593819898664-8a3fc7dd5390'
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
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🌿 Highlights</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Home to rare species like Clarke's weaver & Sokoke scops owl</li>
          <li>Guided birdwatching trails and butterfly spotting</li>
          <li>Forest walks with trained rangers</li>
          <li>Nature education centers and research projects</li>
          <li>Camping options within forest stations</li>
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
            <label className="block text-gray-700 mb-2 font-semibold">Travel Interests</label>
            <textarea name="interests" value={formData.interests} onChange={handleChange} rows="3" placeholder="e.g. birding, butterflies, forest walk" className="w-full border border-gray-300 rounded px-4 py-2" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full">
            Submit Booking
          </button>
        </form>
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Location Map</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Arabuko Sokoke Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.111870214057!2d39.96099701426382!3d-3.290024697623681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1840a8a0c882bf49%3A0x16d37484c7226310!2sArabuko%20Sokoke%20Forest!5e0!3m2!1sen!2ske!4v1628792683927!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">🦋 Upcoming Nature Events</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🦉 <strong>Oct 4:</strong> Owl Night Walk & Listening Tour</li>
          <li>🦋 <strong>Oct 11:</strong> Butterfly Census & Trail Mapping</li>
          <li>🎓 <strong>Oct 18:</strong> Youth Eco Camp Weekend</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Arabuko%20Sokoke%20Forest%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default ArabukoSokokePackage;
