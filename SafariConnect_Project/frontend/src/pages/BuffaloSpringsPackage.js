import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BuffaloSpringsPackage = () => {
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
      destination: 'Buffalo Springs National Reserve',
      createdAt: new Date(),
    };
    try {
      await axios.post('http://localhost:5000/api/trips', bookingData);
      toast.success('🦬 Booking confirmed!');
      setFormData({ name: '', idNumber: '', date: '', groupSize: '', interests: '' });
    } catch (error) {
      console.error(error);
      toast.error('❌ Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Buffalo Springs National Reserve</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Located on the southern banks of the Ewaso Nyiro River, Buffalo Springs is a scenic and wildlife-rich reserve in Kenya's Northern Frontier.
          Known for its clear natural springs, diverse fauna, and unique landscapes.
        </p>
      </div>

      <div className="image-gallery">
        {[
          'https://upload.wikimedia.org/wikipedia/commons/3/3e/Buffalo_Springs_National_Reserve_001.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/7/71/Gerenu_River_Buffalo_Springs_National_Reserve.jpg',
          'https://www.expertafrica.com/images/info/kenya/samburu-area/buffalo-springs/buffalo-springs-1.jpg',
          'https://www.yellowzebrasafaris.com/media/1950/buffalo-springs-elephants.jpg',
          'https://cdn.getyourguide.com/img/tour/617ba8df4a6c9.jpeg/99.jpg',
          'https://static1.squarespace.com/static/5d663e9b99e2c846a18b479c/5d7f304a5c9bcd23f973c534/5d7f334f6e122f38a2d652e8/1568586579136/Buffalo+Springs+National+Reserve.jpg?format=1500w'
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
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🌿 Reserve Highlights</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Natural springs and riverine forests</li>
          <li>Elephants, Grevy’s zebras, lions & giraffes</li>
          <li>Game drives and bird watching safaris</li>
          <li>Scenic picnic spots and guided tours</li>
          <li>Perfect add-on to Samburu adventure</li>
        </ul>
      </div>

      <div className="mt-16 bg-white p-8 rounded-2xl shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">📅 Book Your Safari</h2>
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
            <textarea name="interests" value={formData.interests} onChange={handleChange} rows="3" placeholder="e.g. safari, wildlife, nature photography" className="w-full border border-gray-300 rounded px-4 py-2" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full">
            Submit Booking
          </button>
        </form>
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Map to Buffalo Springs</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Buffalo Springs National Reserve Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2042993.6159393738!2d37.70222392805175!3d0.7488380460889535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x178827f7fa76b4c9%3A0x4cf893087f1a7b69!2sBuffalo%20Springs%20National%20Reserve!5e0!3m2!1sen!2ske!4v1628572004304!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">🦓 Upcoming Events</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🚙 <strong>Sept 8:</strong> Big Five Game Drive & Picnic</li>
          <li>📸 <strong>Sept 16:</strong> Wildlife Photography Safari</li>
          <li>🌄 <strong>Sept 23:</strong> Early Morning Nature Hike</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Buffalo%20Springs%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default BuffaloSpringsPackage;
