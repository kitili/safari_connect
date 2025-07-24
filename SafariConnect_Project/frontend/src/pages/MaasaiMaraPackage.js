import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ImageComponent from '../components/ImageComponent';
import '../styles/images.css';

const MaasaiMaraPackage = () => {
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    startDate: '',
    endDate: '',
    groupSize: '',
    interests: '',
    email: '',
    phone: '',
    lookingForCompanion: true,
    travelStyle: 'mixed',
    accommodationPreference: 'any',
    addToCalendar: true,
    autoMatchmaking: true,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tripDuration, setTripDuration] = useState(1);

  // Passport/ID validation function
  const validatePassport = (passportNumber) => {
    const cleanPassport = passportNumber.replace(/\s/g, '').toUpperCase();
    const kenyanPassportRegex = /^[A-Z]\d{8}$/;
    const kenyanIdRegex = /^\d{8}$/;
    const internationalPassportRegex = /^\d{9}$/;
    
    if (kenyanPassportRegex.test(cleanPassport)) {
      return { isValid: true, type: 'Kenyan Passport', formatted: cleanPassport };
    } else if (kenyanIdRegex.test(cleanPassport)) {
      return { isValid: true, type: 'Kenyan ID', formatted: cleanPassport };
    } else if (internationalPassportRegex.test(cleanPassport)) {
      return { isValid: true, type: 'International Passport', formatted: cleanPassport };
    } else {
      return { 
        isValid: false, 
        message: 'Please enter a valid passport/ID number (8-9 digits or letter + 8 digits)' 
      };
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleStartDateChange = (e) => {
    const startDate = e.target.value;
    setFormData(prev => ({ ...prev, startDate }));
    
    // Auto-calculate end date based on trip duration
    if (startDate && tripDuration > 0) {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + tripDuration - 1);
      setFormData(prev => ({ 
        ...prev, 
        endDate: endDate.toISOString().split('T')[0] 
      }));
    }
  };

  const handleDurationChange = (e) => {
    const duration = parseInt(e.target.value);
    setTripDuration(duration);
    
    // Update end date if start date is set
    if (formData.startDate && duration > 0) {
      const endDate = new Date(formData.startDate);
      endDate.setDate(endDate.getDate() + duration - 1);
      setFormData(prev => ({ 
        ...prev, 
        endDate: endDate.toISOString().split('T')[0] 
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Passport/ID validation
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'Passport/ID number is required';
    } else {
      const passportValidation = validatePassport(formData.idNumber);
      if (!passportValidation.isValid) {
        newErrors.idNumber = passportValidation.message;
      }
    }
    
    // Date validation
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    } else {
      const selectedDate = new Date(formData.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.startDate = 'Start date cannot be in the past';
      }
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      if (endDate < startDate) {
        newErrors.endDate = 'End date cannot be before start date';
      }
    }
    
    // Group size validation
    if (!formData.groupSize) {
      newErrors.groupSize = 'Group size is required';
    } else if (formData.groupSize < 1 || formData.groupSize > 50) {
      newErrors.groupSize = 'Group size must be between 1 and 50';
    }

    // Email validation (if provided)
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addToGoogleCalendar = async (tripData) => {
    try {
      const event = {
        summary: `Safari Trip: ${tripData.destination}`,
        description: `Safari adventure to ${tripData.destination}\nGroup Size: ${tripData.groupSize}\nInterests: ${tripData.interests || 'Not specified'}`,
        start: {
          date: tripData.startDate,
          timeZone: 'Africa/Nairobi',
        },
        end: {
          date: tripData.endDate,
          timeZone: 'Africa/Nairobi',
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 1 day before
            { method: 'popup', minutes: 60 }, // 1 hour before
          ],
        },
      };

      // For now, we'll create a Google Calendar link that users can click
      const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.summary)}&dates=${tripData.startDate}/${tripData.endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(tripData.destination)}&sf=true&output=xml`;
      
      return calendarUrl;
    } catch (error) {
      console.error('Calendar error:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    const passportValidation = validatePassport(formData.idNumber);
    const bookingData = {
      ...formData,
      idNumber: passportValidation.formatted,
      idType: passportValidation.type,
      destination: 'Maasai Mara National Reserve',
      createdAt: new Date(),
    };
    
    try {
      // Save trip to database
      const response = await axios.post('http://localhost:5000/api/trips', bookingData);
      
      // Create Google Calendar event
      if (formData.addToCalendar) {
        const calendarUrl = await addToGoogleCalendar(bookingData);
        if (calendarUrl) {
          // Open calendar in new tab
          window.open(calendarUrl, '_blank');
          toast.info('📅 Google Calendar event created! Check your browser for the calendar page.');
        }
      }

      // Auto-enroll in matchmaking if selected
      if (formData.autoMatchmaking) {
        toast.info('🔍 You\'ve been enrolled in matchmaking! We\'ll notify you of compatible travelers.');
      }
      
      toast.success('🦓 Trip booked successfully! Check your dashboard for details.');
      setFormData({ 
        name: '', 
        idNumber: '', 
        startDate: '', 
        endDate: '', 
        groupSize: '', 
        interests: '', 
        email: '', 
        phone: '',
        lookingForCompanion: true,
        travelStyle: 'mixed',
        accommodationPreference: 'any',
        addToCalendar: true,
        autoMatchmaking: true,
      });
      setErrors({});
      setTripDuration(1);
    } catch (error) {
      console.error('Booking error:', error);
      if (error.response?.status === 400) {
        toast.error('❌ Invalid booking data. Please check your information.');
      } else if (error.response?.status === 409) {
        toast.error('❌ Booking already exists for this date.');
      } else {
        toast.error('❌ Booking failed. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Maasai Mara National Reserve</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Experience Kenya's most iconic safari destination — home to the Great Migration, the Big Five, and a landscape rich in Maasai culture and wildlife encounters.
        </p>
      </div>

      <div className="image-gallery">
        {[
          'https://upload.wikimedia.org/wikipedia/commons/9/90/Masai_Mara_Kenya_Landscape.jpg',
          'https://images.unsplash.com/photo-1555507036-6c1e092195f6',
          'https://images.unsplash.com/photo-1583303702549-98a3dc8c90da',
          'https://images.unsplash.com/photo-1615222946435-ea2458d6dd61',
          'https://images.unsplash.com/photo-1554213520-2d65aa3b5b51',
          'https://upload.wikimedia.org/wikipedia/commons/e/e4/Masai_Mara_Great_Migration.jpg'
        ].map((img, i) => (
          <ImageComponent
            key={i}
            src={img}
            alt={`Maasai Mara image ${i + 1}`}
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
        ))}
      </div>

      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🦁 Highlights & Activities</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Witness the Great Wildebeest Migration (Jul–Oct)</li>
          <li>Game drives to spot lions, elephants, cheetahs, and rhinos</li>
          <li>Hot air balloon safaris at sunrise</li>
          <li>Visit Maasai villages for cultural immersion</li>
          <li>Luxury tents and eco-friendly lodges available</li>
        </ul>
      </div>

      <div className="mt-16 bg-white p-8 rounded-2xl shadow-md max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">📅 Book Your Safari Adventure</h2>
        
        {/* Passport Info */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">📋 Passport/ID Requirements</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Kenyan Passport: A12345678 (letter + 8 digits)</li>
            <li>• Kenyan ID: 12345678 (8 digits)</li>
            <li>• International Passport: 123456789 (9 digits)</li>
            <li>• We accept any valid government-issued ID</li>
          </ul>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Full Name *</label>
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                type="text" 
                className={`w-full border rounded px-4 py-2 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`} 
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">ID / Passport Number *</label>
              <input 
                name="idNumber" 
                value={formData.idNumber} 
                onChange={handleChange} 
                type="text" 
                className={`w-full border rounded px-4 py-2 ${
                  errors.idNumber ? 'border-red-500' : 'border-gray-300'
                }`} 
                placeholder="e.g., A12345678 or 12345678"
              />
              {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>}
              {formData.idNumber && !errors.idNumber && (
                <p className="text-green-600 text-sm mt-1">
                  ✅ Valid {validatePassport(formData.idNumber).type || 'ID'} format
                </p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Email</label>
              <input 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                type="email" 
                className={`w-full border rounded px-4 py-2 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`} 
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Phone Number</label>
              <input 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                type="tel" 
                className="w-full border border-gray-300 rounded px-4 py-2" 
                placeholder="+254 700 000 000"
              />
            </div>
          </div>

          {/* Trip Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Trip Duration (Days) *</label>
              <select 
                value={tripDuration} 
                onChange={handleDurationChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                <option value={1}>1 Day</option>
                <option value={2}>2 Days</option>
                <option value={3}>3 Days</option>
                <option value={4}>4 Days</option>
                <option value={5}>5 Days</option>
                <option value={6}>6 Days</option>
                <option value={7}>1 Week</option>
                <option value={14}>2 Weeks</option>
                <option value={21}>3 Weeks</option>
                <option value={30}>1 Month</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Start Date *</label>
              <input 
                name="startDate" 
                value={formData.startDate} 
                onChange={handleStartDateChange} 
                type="date" 
                className={`w-full border rounded px-4 py-2 ${
                  errors.startDate ? 'border-red-500' : 'border-gray-300'
                }`} 
              />
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">End Date *</label>
              <input 
                name="endDate" 
                value={formData.endDate} 
                onChange={handleChange} 
                type="date" 
                className={`w-full border rounded px-4 py-2 ${
                  errors.endDate ? 'border-red-500' : 'border-gray-300'
                }`} 
              />
              {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
            </div>
          </div>

          {/* Trip Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Group Size *</label>
              <input 
                name="groupSize" 
                value={formData.groupSize} 
                onChange={handleChange} 
                type="number" 
                min="1" 
                max="50" 
                className={`w-full border rounded px-4 py-2 ${
                  errors.groupSize ? 'border-red-500' : 'border-gray-300'
                }`} 
                placeholder="Number of people"
              />
              {errors.groupSize && <p className="text-red-500 text-sm mt-1">{errors.groupSize}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Travel Style</label>
              <select 
                name="travelStyle" 
                value={formData.travelStyle} 
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                <option value="mixed">Mixed</option>
                <option value="budget">Budget</option>
                <option value="luxury">Luxury</option>
                <option value="adventure">Adventure</option>
                <option value="relaxation">Relaxation</option>
                <option value="cultural">Cultural</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Safari Interests</label>
            <textarea 
              name="interests" 
              value={formData.interests} 
              onChange={handleChange} 
              rows="3" 
              placeholder="e.g. Big Five, hot air balloon, photography, cultural visits, bird watching" 
              className="w-full border border-gray-300 rounded px-4 py-2" 
            />
          </div>

          {/* Preferences */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <h3 className="font-semibold text-gray-800">🎯 Trip Preferences</h3>
            
            <div className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                name="lookingForCompanion" 
                checked={formData.lookingForCompanion} 
                onChange={handleChange}
                className="rounded"
              />
              <label className="text-gray-700">Looking for travel companions</label>
            </div>
            
            <div className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                name="addToCalendar" 
                checked={formData.addToCalendar} 
                onChange={handleChange}
                className="rounded"
              />
              <label className="text-gray-700">Add to Google Calendar</label>
            </div>
            
            <div className="flex items-center space-x-3">
              <input 
                type="checkbox" 
                name="autoMatchmaking" 
                checked={formData.autoMatchmaking} 
                onChange={handleChange}
                className="rounded"
              />
              <label className="text-gray-700">Auto-enroll in matchmaking</label>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full font-bold py-3 rounded-full transition-colors ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {isSubmitting ? 'Booking Your Safari...' : 'Book Safari Adventure'}
          </button>
        </form>
      </div>

      <div className="mt-20 mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Find Maasai Mara on Map</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Maasai Mara Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4069517.522707167!2d33.96349387084819!3d-1.5305718272915554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f08b898061aaa%3A0xded847b8998fdb6f!2sMaasai%20Mara%20National%20Reserve!5e0!3m2!1sen!2ske!4v1628617740956!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">🗓️ Upcoming Safari Events</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🐃 <strong>Oct 1:</strong> Great Migration Finale Safari</li>
          <li>📸 <strong>Oct 10:</strong> Wildlife Photography Workshop</li>
          <li>🎪 <strong>Oct 20:</strong> Maasai Cultural Dance & Campfire Night</li>
        </ul>
      </div>

      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Maasai%20Mara%20safari%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default MaasaiMaraPackage;
