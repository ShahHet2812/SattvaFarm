import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Upload, BookOpen, BarChart4, Leaf, Sun, Cloud, Droplets, Wind } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'; // Make sure this path is correct

// WeatherCard component
const WeatherCard = ({ icon, value, label }) => (
  <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow p-4">
    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
      {icon}
    </div>
    <div>
      <p className="text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  </div>
);

const Home = () => {
  // Get the location directly from the authentication context
  const { isAuthenticated, location } = useAuth(); 
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Ahmedabad');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async (cityName) => {
      if (!cityName) {
        console.error("No city name provided to fetch weather.");
        setLoading(false);
        setWeatherData(null); // Ensure no stale data is shown
        return;
      }
      
      setLoading(true);
      const apiKey = 'a43d48e2c6398946dd5515d9a1e4a208';
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
          setCity(data.name);
        } else {
          console.error(`Failed to fetch weather for ${cityName}`);
          setWeatherData(null); 
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    // **SIMPLIFIED LOGIC:**
    // If the user is authenticated and has a location, use it.
    // Otherwise, default to Ahmedabad.
    const cityToFetch = isAuthenticated && location ? location : 'Ahmedabad';
    fetchWeatherData(cityToFetch);

  }, [isAuthenticated, location]); // Depend on the location from the auth context

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
                Empowering Farmers for a <span className="text-yellow-300">Sustainable Future</span>
              </h1>
              <p className="text-lg sm:text-xl mb-8">
                Access resources, knowledge, and support to improve your farming practices and increase productivity.
              </p>
              <div className="flex flex-wrap gap-4">
                {!isAuthenticated && (
                  <Link
                    to="/register"
                    className="bg-white text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1 shadow-lg flex items-center"
                  >
                    Get Started
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                )}
                <Link
                  to="/knowledge"
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-green-700 transition duration-300 transform hover:-translate-y-1 flex items-center"
                >
                  Learn More
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block lg:w-1/2 mt-8 lg:mt-0">
              <img
                src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg"
                alt="Farmer in field"
                className="rounded-lg shadow-2xl max-h-96 object-cover mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Weather Section */}
      <section className="bg-gray-100 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Today's Weather</h2>
              <p className="text-white text-sm">{city}</p>
            </div>
            {loading ? (
                <p className="text-white text-center">Loading weather...</p>
            ) : weatherData ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <WeatherCard
                  icon={<Sun className="h-6 w-6 text-yellow-500" />}
                  value={`${weatherData.main.temp.toFixed(1)}°C`}
                  label="Temperature"
                />
                <WeatherCard
                  icon={<Cloud className="h-6 w-6 text-blue-500" />}
                  value={`${weatherData.main.humidity}%`}
                  label="Humidity"
                />
                <WeatherCard
                  icon={<Droplets className="h-6 w-6 text-blue-500" />}
                  value={`${weatherData.clouds.all}%`}
                  label="Rain Chance"
                />
                <WeatherCard
                  icon={<Wind className="h-6 w-6 text-blue-500" />}
                  value={`${(weatherData.wind.speed * 2.237).toFixed(1)} mph`}
                  label="Wind Speed"
                />
              </div>
            ) : (
                <p className="text-white text-center">Could not load weather data.</p>
            )}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How AgriFarm Helps You</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform provides farmers with the tools and resources they need to thrive in modern agriculture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Upload className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Image Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Upload photos of your crops and receive instant analysis for disease identification and treatment recommendations.
              </p>
              <Link
                to="/image-upload"
                className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 flex items-center"
              >
                Try It Now
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <BarChart4 className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Agricultural Schemes</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Discover government, bank, and corporate schemes designed to support farmers with subsidies and resources.
              </p>
              <Link
                to="/schemes"
                className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 flex items-center"
              >
                Explore Schemes
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <BookOpen className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Knowledge Base</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Access comprehensive guides on plant growth, seasonal advice, and best cultivation practices.
              </p>
              <Link
                to="/knowledge"
                className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 flex items-center"
              >
                Learn More
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Making a Difference</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform has helped thousands of farmers improve their productivity and sustainability.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">10,000+</p>
              <p className="text-gray-600 dark:text-gray-300">Registered Farmers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">500+</p>
              <p className="text-gray-600 dark:text-gray-300">Agricultural Schemes</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">1,000+</p>
              <p className="text-gray-600 dark:text-gray-300">Knowledge Articles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Farmers Say</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Hear from farmers who have transformed their agricultural practices with our platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-200 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">John Smith</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Wheat Farmer, USA</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "The knowledge base has helped me optimize my irrigation practices, resulting in a 20% increase in yield this season."
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-200 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Maria Garcia</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Vegetable Grower, Mexico</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "I identified a fungal infection early thanks to the image upload feature, saving my entire tomato crop from being lost."
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-200 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Rajesh Patel</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Rice Farmer, India</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "Through the schemes portal, I accessed a government subsidy for solar-powered equipment that has reduced my costs significantly."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {isAuthenticated ? (
            <>
              <h2 className="text-3xl font-bold mb-4">Explore Agricultural Schemes</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Find the perfect government and corporate schemes to support your farm's growth and sustainability.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">Join Our Farming Community Today</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Take the first step towards improving your agricultural practices and connecting with resources that matter.
              </p>
            </>
          )}
          <div className="flex flex-wrap justify-center gap-4">
            {!isAuthenticated && (
              <Link
                to="/register"
                className="bg-white text-green-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300 shadow-lg"
              >
                Register Now
              </Link>
            )}
            <Link
              to="/schemes"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-green-700 transition duration-300"
            >
              Explore Schemes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;