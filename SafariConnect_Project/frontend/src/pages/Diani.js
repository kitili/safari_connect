import React from 'react';
import ImageComponent from '../components/ImageComponent';
import '../styles/images.css';

const DianiBeachPackage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-10 lg:px-20">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 uppercase">Diani Beach</h1>
        <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">
          Diani Beach is one of Kenya’s most beautiful coastal destinations. With soft white sands, palm-lined shores, and coral reefs,
          it’s the perfect getaway for relaxation and adventure.
        </p>
      </div>

      {/* Gallery */}
      <div className="image-gallery">
        {[
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/5b/64/91/aerial-view.jpg',
          'https://images.unsplash.com/photo-1616593960973-2ff93c560f7e',
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
          'https://images.unsplash.com/photo-1603720639928-247a1de1b894',
          'https://images.unsplash.com/photo-1604924033969-70b1235a6df1',
          'https://images.unsplash.com/photo-1616594131779-36576d92a69d'
        ].map((img, i) => (
          <ImageComponent
            key={i}
            src={img}
            alt={`${fileName.replace("Package.js", "").replace(".js", "")} image ${i + 1}`}
            className="rounded-xl shadow-lg w-full h-64 object-cover"
          />
        ))}
      </div>

      {/* Package Details */}
      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🏖️ Package Details</h2>
        <ul className="text-gray-700 text-lg list-disc list-inside space-y-2">
          <li>Accommodation in beachfront resort</li>
          <li>Breakfast & dinner included</li>
          <li>Marine park access & boat rides</li>
          <li>Beach volleyball, snorkeling & kayaking</li>
          <li>Sunset photography experience</li>
        </ul>
      </div>

      {/* SafariConnect */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 shadow-lg mb-12">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">🌐 Travel Smart with SafariConnect</h2>
        <p className="text-gray-700 text-lg mb-4">
          Connect with other travelers heading to Diani Beach. Share transportation, stay in touch via in-app chat, and enjoy group discounts.
        </p>
        <ul className="text-gray-700 text-base list-disc list-inside space-y-2">
          <li>💬 In-app group chat</li>
          <li>🚐 Shared van/shuttle coordination</li>
          <li>📸 Experience reviews from other travelers</li>
        </ul>
      </div>

      {/* Opening Times */}
      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">🕒 Booking Availability</h2>
        <p className="text-gray-700 text-lg">
          Book any day between <strong>6:00 AM – 8:00 PM</strong><br />
          Including weekends and public holidays.
        </p>
      </div>

      {/* Contact Info */}
      <div className="bg-white shadow-md rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">📞 Contact Details</h2>
        <p className="text-gray-700 text-lg">
          <strong>Phone:</strong> 0712 123456<br />
          <strong>Email:</strong> diani@safariconnect.ke<br />
          <strong>Location:</strong> Diani Beach Rd, Kwale County, Kenya
        </p>
      </div>

      {/* Google Map */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📍 Locate Diani on the Map</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Diani Beach Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.9478380026342!2d39.57775805104195!3d-4.311983749094316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1840134d52f0c60f%3A0xe09f7be0fc7a989a!2sDiani%20Beach!5e0!3m2!1sen!2ske!4v1656709092962!5m2!1sen!2ske"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <a
          href="/booking"
          className="inline-block bg-yellow-500 text-white text-lg font-bold px-6 py-3 rounded-full shadow hover:bg-yellow-600 transition"
        >
          Plan My Visit
        </a>
      </div>

      {/* Booking Form */}
      <div className="mt-16 bg-white p-8 rounded-2xl shadow-md max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">📅 Book Your Diani Trip</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Date of Travel</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">Number of People</label>
            <input
              type="number"
              min="1"
              max="50"
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="e.g. 4"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-full"
            >
              Submit Booking
            </button>
          </div>
        </form>
      </div>

      {/* Events */}
      <div className="mt-20 bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">🌅 Upcoming Beach Events</h2>
        <ul className="text-gray-700 space-y-4 text-lg">
          <li>🏖️ <strong>Aug 10:</strong> Diani Sunset Yoga & Bonfire</li>
          <li>🎶 <strong>Aug 15:</strong> Beachside DJ Party at Sands</li>
          <li>🐬 <strong>Aug 20:</strong> Dolphin Spotting Tour</li>
        </ul>
      </div>

      {/* WhatsApp Chat */}
      <a
        href="https://wa.me/254728454524?text=Hello%20SafariConnect%20-%20I'm%20interested%20in%20the%20Diani%20Beach%20package"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span>💬 Chat with us</span>
      </a>
    </div>
  );
};

export default DianiBeachPackage;
