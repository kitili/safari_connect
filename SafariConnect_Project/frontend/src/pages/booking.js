import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    date: '',
    interests: '',
    groupSize: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      name: formData.name,
      idNumber: formData.idNumber,
      destination: 'Nairobi National Museum',
      date: formData.date,
      interests: formData.interests,
      groupSize: parseInt(formData.groupSize),
      createdAt: new Date(),
    };

    try {
      await axios.post('http://localhost:5000/api/trips', bookingData); // Update if using hosted API
      toast.success('🎉 Booking submitted successfully!');
      setFormData({
        name: '',
        idNumber: '',
        date: '',
        interests: '',
        groupSize: '',
      });
    } catch (error) {
      console.error(error);
      toast.error('❌ Failed to submit booking. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl max-w-2xl w-full p-8">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Plan Your Visit to Nairobi National Museum
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Aisha Njeri"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-semibold">ID / Passport Number</label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              placeholder="e.g. A12345678"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Date of Travel</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Your Interests</label>
            <textarea
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              rows="3"
              placeholder="e.g. Art, Culture, Nature"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Number of People</label>
            <input
              type="number"
              name="groupSize"
              value={formData.groupSize}
              onChange={handleChange}
              min="1"
              max="50"
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="e.g. 3"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
