import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/images.css';

const sampleDestinations = [
  {
    name: 'National Museum Of Kenya',
    city: 'Nairobi',
    price: 12,
    priceRange: 'Budget',
    distance: '15km from JKIA',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    rating: 4.2,
    description: 'Discover Kenya\'s rich cultural heritage and natural history through fascinating exhibits and artifacts.',
    googleReviews: 'https://www.google.com/search?q=National+Museum+Of+Kenya+reviews'
  },
  {
    name: 'Diani Beach',
    city: 'Diani',
    price: 0,
    priceRange: 'Free',
    distance: '45km from Mombasa Airport',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
    rating: 4.8,
    description: 'Pristine white sand beaches with crystal clear waters, perfect for swimming and water sports.',
    googleReviews: 'https://www.google.com/search?q=Diani+Beach+Kenya+reviews'
  },
  {
    name: 'Hells Gate National Park',
    city: 'Nakuru',
    price: 35,
    priceRange: 'Mid-Range',
    distance: '120km from Nairobi',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&h=600&fit=crop',
    rating: 4.5,
    description: 'Unique geothermal park with dramatic cliffs, hot springs, and diverse wildlife.',
    googleReviews: 'https://www.google.com/search?q=Hells+Gate+National+Park+reviews'
  },
  {
    name: 'Tsavo West National Park',
    city: 'Tsavo',
    price: 67,
    priceRange: 'Premium',
    distance: '250km from Nairobi',
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop',
    rating: 4.6,
    description: 'Spectacular wildlife viewing with the iconic red elephants and volcanic landscapes.',
    googleReviews: 'https://www.google.com/search?q=Tsavo+West+National+Park+reviews'
  },
  {
    name: 'Karura Forest',
    city: 'Nairobi',
    price: 6,
    priceRange: 'Budget',
    distance: '8km from Nairobi CBD',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    rating: 4.3,
    description: 'Urban forest sanctuary perfect for hiking, cycling, and bird watching.',
    googleReviews: 'https://www.google.com/search?q=Karura+Forest+Nairobi+reviews'
  },
  {
    name: 'Giraffe Center',
    city: 'Nairobi',
    price: 15,
    priceRange: 'Budget',
    distance: '20km from Nairobi CBD',
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop',
    rating: 4.7,
    description: 'Get up close with endangered Rothschild giraffes and learn about conservation.',
    googleReviews: 'https://www.google.com/search?q=Giraffe+Center+Nairobi+reviews'
  },
  {
    name: 'Maasai Mara National Reserve',
    city: 'Narok',
    price: 130,
    priceRange: 'Premium',
    distance: '280km from Nairobi',
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop',
    rating: 4.9,
    description: 'World-famous wildlife reserve known for the Great Migration and Big Five.',
    googleReviews: 'https://www.google.com/search?q=Maasai+Mara+National+Reserve+reviews'
  },
  {
    name: 'Bomas Of Kenya',
    city: 'Nairobi',
    price: 15,
    priceRange: 'Budget',
    distance: '12km from Nairobi CBD',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    rating: 4.1,
    description: 'Experience traditional Kenyan culture through dance performances and village tours.',
    googleReviews: 'https://www.google.com/search?q=Bomas+Of+Kenya+reviews'
  },
  {
    name: 'Buffalo Springs National Reserve',
    city: 'Naivasha',
    price: 15,
    priceRange: 'Budget',
    distance: '180km from Nairobi',
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop',
    rating: 4.0,
    description: 'Scenic reserve with diverse wildlife and beautiful landscapes.',
    googleReviews: 'https://www.google.com/search?q=Buffalo+Springs+National+Reserve+reviews'
  },
  {
    name: 'Kisumu Museum',
    city: 'Kisumu',
    price: 3,
    priceRange: 'Budget',
    distance: '350km from Nairobi',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    rating: 3.8,
    description: 'Explore the rich history and culture of the Lake Victoria region.',
    googleReviews: 'https://www.google.com/search?q=Kisumu+Museum+reviews'
  },
  {
    name: 'Vasco Da Gama Pillar',
    city: 'Mombasa',
    price: 3,
    priceRange: 'Budget',
    distance: '15km from Mombasa Airport',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    rating: 3.9,
    description: 'Historic Portuguese monument with stunning ocean views.',
    googleReviews: 'https://www.google.com/search?q=Vasco+Da+Gama+Pillar+Mombasa+reviews'
  },
  {
    name: 'Wild Waters',
    city: 'Mombasa',
    price: 19,
    priceRange: 'Mid-Range',
    distance: '20km from Mombasa Airport',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
    rating: 4.2,
    description: 'Exciting water park with slides, pools, and family entertainment.',
    googleReviews: 'https://www.google.com/search?q=Wild+Waters+Mombasa+reviews'
  },
  {
    name: 'Gedi Ruins',
    city: 'Malindi',
    price: 5,
    priceRange: 'Budget',
    distance: '120km from Mombasa',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    rating: 4.0,
    description: 'Ancient Swahili ruins with fascinating archaeological history.',
    googleReviews: 'https://www.google.com/search?q=Gedi+Ruins+Malindi+reviews'
  },
  {
    name: 'Marafa Depression',
    city: 'Malindi',
    price: 8,
    priceRange: 'Budget',
    distance: '150km from Mombasa',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    rating: 4.1,
    description: 'Spectacular sandstone formations known as "Hell\'s Kitchen".',
    googleReviews: 'https://www.google.com/search?q=Marafa+Depression+Malindi+reviews'
  },
  {
    name: 'Maasai Market',
    city: 'Nairobi',
    price: 0,
    priceRange: 'Free',
    distance: '5km from Nairobi CBD',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    rating: 4.0,
    description: 'Vibrant market showcasing traditional Maasai crafts and souvenirs.',
    googleReviews: 'https://www.google.com/search?q=Maasai+Market+Nairobi+reviews'
  },
  {
    name: 'Dunga Beach',
    city: 'Kisumu',
    price: 2,
    priceRange: 'Budget',
    distance: '5km from Kisumu Airport',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
    rating: 4.2,
    description: 'Peaceful lakeside beach perfect for sunset views and fishing.',
    googleReviews: 'https://www.google.com/search?q=Dunga+Beach+Kisumu+reviews'
  },
  {
    name: 'Oserengoni Wildlife Sanctuary',
    city: 'Naivasha',
    price: 12,
    priceRange: 'Budget',
    distance: '100km from Nairobi',
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop',
    rating: 3.9,
    description: 'Private sanctuary offering intimate wildlife encounters.',
    googleReviews: 'https://www.google.com/search?q=Oserengoni+Wildlife+Sanctuary+reviews'
  },
  {
    name: 'Almasi Art Agency',
    city: 'Diani',
    price: 5,
    priceRange: 'Budget',
    distance: '45km from Mombasa Airport',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
    rating: 4.3,
    description: 'Contemporary art gallery showcasing local Kenyan artists.',
    googleReviews: 'https://www.google.com/search?q=Almasi+Art+Agency+Diani+reviews'
  },
  {
    name: 'Lichthaus',
    city: 'Watamu',
    price: 8,
    priceRange: 'Budget',
    distance: '110km from Mombasa',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    rating: 4.0,
    description: 'Historic lighthouse with panoramic coastal views.',
    googleReviews: 'https://www.google.com/search?q=Lichthaus+Watamu+reviews'
  },
  {
    name: 'Watamu Snake Farm',
    city: 'Watamu',
    price: 2.50,
    priceRange: 'Budget',
    distance: '110km from Mombasa',
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop',
    rating: 3.7,
    description: 'Educational facility showcasing various snake species and reptiles.',
    googleReviews: 'https://www.google.com/search?q=Watamu+Snake+Farm+reviews'
  },
  {
    name: 'Takawiri Island',
    city: 'Homabay',
    price: 15,
    priceRange: 'Mid-Range',
    distance: '400km from Nairobi',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
    rating: 4.1,
    description: 'Pristine island paradise on Lake Victoria with white sand beaches.',
    googleReviews: 'https://www.google.com/search?q=Takawiri+Island+Homabay+reviews'
  },
  {
    name: 'Chaka Ranch',
    city: 'Nyeri',
    price: 25,
    priceRange: 'Mid-Range',
    distance: '150km from Nairobi',
    image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop',
    rating: 4.2,
    description: 'Working ranch offering horseback riding and wildlife experiences.',
    googleReviews: 'https://www.google.com/search?q=Chaka+Ranch+Nyeri+reviews'
  },
  {
    name: 'Treetops Hotel',
    city: 'Nyeri',
    price: 75,
    priceRange: 'Premium',
    distance: '150km from Nairobi',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    rating: 4.4,
    description: 'Historic hotel where Queen Elizabeth II became queen, with wildlife viewing.',
    googleReviews: 'https://www.google.com/search?q=Treetops+Hotel+Nyeri+reviews'
  }
];

const Explore = () => {
  const [search, setSearch] = useState('');
  const [priceFilter, setPriceFilter] = useState('All');
  const [distanceFilter, setDistanceFilter] = useState('All');

  const renderStars = (count) => {
    const fullStars = Math.floor(count);
    const hasHalfStar = count % 1 >= 0.5;
    return '⭐'.repeat(fullStars) + (hasHalfStar ? '⭐' : '');
  };

  const getExploreLink = (destName) => {
    const name = destName.trim().toLowerCase();
    const linkMap = {
      'national museum of kenya': '/nairobi-museum',
      'diani beach': '/diani',
      'hells gate national park': '/hells-gate',
      'tsavo west national park': '/tsavo-west',
      'karura forest': '/karura-forest',
      'gedi ruins': '/gedi-ruins',
      'vasco da gama pillar': '/vascodagama',
      'wild waters': '/wildwaters',
      'bomas of kenya': '/bomasofkenya',
      'buffalo springs national reserve': '/buffalosprings',
      'kisumu museum': '/kisumumuseum',
      'giraffe center': '/giraffecenter',
      'maasai mara national reserve': '/maasai-mara',
      'marafa depression': '/marafa',
      'maasai market': '/maasai-mkt',
      'dunga beach': '/dunga-beach',
      'oserengoni wildlife sanctuary': '/oserengoni',
      'almasi art agency': '/almasi',
      'lichthaus': '/lichthaus'
    };
    return linkMap[name] || null;
  };

  const filteredDestinations = sampleDestinations.filter((dest) => {
    const searchTerm = search.toLowerCase();
    
    const matchesSearch = 
      dest.name.toLowerCase().includes(searchTerm) ||
      dest.city.toLowerCase().includes(searchTerm) ||
      dest.description.toLowerCase().includes(searchTerm) ||
      dest.priceRange.toLowerCase().includes(searchTerm) ||
      dest.distance.toLowerCase().includes(searchTerm);
    
    const matchesPrice = priceFilter === 'All' || dest.priceRange === priceFilter;
    
    const matchesDistance = distanceFilter === 'All' || 
                           (distanceFilter === 'Near' && dest.distance.includes('km') && parseInt(dest.distance) <= 50) ||
                           (distanceFilter === 'Mid' && dest.distance.includes('km') && parseInt(dest.distance) > 50 && parseInt(dest.distance) <= 150) ||
                           (distanceFilter === 'Far' && dest.distance.includes('km') && parseInt(dest.distance) > 150);
    
    return matchesSearch && matchesPrice && matchesDistance;
  });

  const clearAllFilters = () => {
    setSearch('');
    setPriceFilter('All');
    setDistanceFilter('All');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Explore Kenya
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing destinations and plan your perfect adventure
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-6xl mx-auto mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search destinations, cities, activities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 pl-12 pr-20 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Price Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Price:</label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="All">All Prices</option>
                <option value="Free">Free</option>
                <option value="Budget">Budget ($0-25)</option>
                <option value="Mid-Range">Mid-Range ($25-75)</option>
                <option value="Premium">Premium ($75+)</option>
              </select>
            </div>

            {/* Distance Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Distance:</label>
              <select
                value={distanceFilter}
                onChange={(e) => setDistanceFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="All">All Distances</option>
                <option value="Near">Near (0-50km)</option>
                <option value="Mid">Mid (50-150km)</option>
                <option value="Far">Far (150km+)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="explore-grid">
          {filteredDestinations.map((dest, index) => {
            const exploreLink = getExploreLink(dest.name);
            
            return (
              <div key={index} className="explore-card">
                <div className="relative overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="explore-card-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                    }}
                  />
                  <div className="price-badge">
                    {dest.price === 0 ? 'Free' : `$${dest.price} USD`}
                  </div>
                </div>
                <div className="explore-card-content">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {dest.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{dest.city}</p>
                    <p className="text-xs text-gray-600 mb-2">{dest.distance}</p>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                      {dest.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-yellow-500 text-sm">
                        {renderStars(dest.rating)} ({dest.rating})
                      </div>
                      <a
                        href={dest.googleReviews}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                      >
                        Read Reviews
                      </a>
                    </div>
                  </div>
                  
                  {exploreLink ? (
                    <Link to={exploreLink} className="explore-btn">
                      Explore
                    </Link>
                  ) : (
                    <span className="explore-btn-disabled">
                      Explore Packages
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results Message */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No destinations found matching your criteria.</p>
            <button
              onClick={clearAllFilters}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Search Results Summary */}
        {filteredDestinations.length > 0 && (search || priceFilter !== 'All' || distanceFilter !== 'All') && (
          <div className="text-center py-4">
            <p className="text-gray-600">
              Found {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''}
              {(search || priceFilter !== 'All' || distanceFilter !== 'All') && (
                <button
                  onClick={clearAllFilters}
                  className="ml-2 text-green-600 hover:text-green-800 underline"
                >
                  Clear filters
                </button>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore; 