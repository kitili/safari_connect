import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const OserengoniPackage = () => {
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
      destination: 'Oserengoni Wildlife Sanctuary',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🦓 Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Oserengoni Wildlife Sanctuary</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Nestled in Naivasha, the Oserengoni Wildlife Sanctuary is a private reserve that offers guided wildlife safaris, nature walks, and eco-friendly lodging. Home to giraffes, zebras, buffalos, and many bird species — it’s a hidden gem for nature lovers.
        </p>
      </div>

      <div className="image-gallery">
        {[
          'https://images.ctfassets.net/0nm5vlv2ad7a/7Dxe5TD9LHDVNqCDu9r6iv/b010b4cc5e4105943e26d0c7f45ebc4d/oserengoni-lodge-kenya.jpg',
          'https://nairobiluxuryliving.files.wordpress.com/2021/04/oserian-sanctuary.jpg',
          'https://images.unsplash.com/photo-1559060017-06e26e3c2b92',
          'https://www.dorobo-safari.com/wp-content/uploads/2020/02/oserengoni-zebra-kenya.jpg',
          'https://images.unsplash.com/photo-1575711292791-4b144b24f8f3',
          'https://media.istockphoto.com/id/1364949300/photo/safari-in-africa.jpg?s=612x612&w=0&k=20&c=yxU9UwSGJ28f9s7L4LfQO1oIkididcWT7LozDOBoqlU='
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
        <h2 className="text-2xl font-bold text-green-800 mb-4">🦓 Wildlife Highlights</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Private game drives with expert guides</li>
          <li>Sightings of giraffes, zebras, antelopes, buffalos</li>
          <li>Birdwatching and peaceful nature trails</li>
          <li>Eco-lodges and farm-to-table dining</li>
          <li>Photography opportunities across the sanctuary</li>
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
            <textarea name="interests" value={formData.interests} onChange={handleChange} rows="3" placeholder="e.g. wildlife, photography, hiking" className="w-full border border-gray-300 rounded px-4 py-2" />
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-full">
            Submit Booking
          </button>
        </form>
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">📍 Find Oserengoni Sanctuary</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Oserengoni Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1992.884897329306!2d36.38776665121815!3d-0.7539998029628481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182a28c85a83cfe7%3A0x1e6d4ef369d94fae!2sOserengoni%20Wildlife%20Sanctuary!5e0!3m2!1sen!2ske!4v1651115000000!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">🌿 Upcoming Events</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🛻 <strong>Oct 12:</strong> Evening Game Drive & Sundowner Picnic</li>
          <li>📸 <strong>Oct 17:</strong> Wildlife Photography Safari</li>
          <li>🔥 <strong>Oct 25:</strong> Bonfire & Bush Dinner under the Stars</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Oserengoni%20Sanctuary%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default OserengoniPackage;
