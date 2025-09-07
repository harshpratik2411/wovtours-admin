import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Sidebar from '../../Components/Siderbar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import SettingsServices from './SettingServices';
import { FiSettings, FiGlobe, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaClock } from 'react-icons/fa';
import { MdAlternateEmail, MdWebAsset } from 'react-icons/md';

const Settings = () => {
  const [settings, setSettings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { settings } = await SettingsServices.getAll('', '', 1);
    setSettings(settings);
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="min-h-screen -mt-10 lg:ml-72 bg-gradient-to-br from-gray-100 to-gray-200 py-12 lg:px-6 px-4 font-rubik">
        <div className="max-w-6xl mx-auto  bg-white text-gray-800 shadow-xl  relative">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10 border-b pb-6">
            <h2 className="text-4xl mt-3 font-bold text-gray-800 flex items-center gap-3" data-aos="fade-down">
              <span className="text-3xl  text-blue-600" />
              Website Settings
            </h2>

            {/* Buttons */}
            <div className="flex lg:ml-0 ml-5 gap-4">
              {/* <button
                onClick={() => navigate('/settings/add')}
                className="text-gray-700 border border-gray-300 px-4 py-2 rounded-md text-md hover:bg-gray-100 transition"
              >
                Add
              </button> */}
              <button
                onClick={() => navigate('/Settings/update')}
                className="text-gray-700 border border-gray-300 px-4 py-2 mr-5 mt-3 rounded-md text-md hover:bg-gray-100 transition"
              >
                Update
              </button>
            </div>
          </div>

          {/* Settings Content */}
          {settings.length === 0 ? (
            <p className="text-center text-gray-600 text-xl font-medium">Loading settings...</p>
          ) : (
            settings.map((setting) => (
              <div
                key={setting.id}
                className="p-4 md:p-8 bg-gradient-to-br bg-custom-gray  shadow-2xl mb-12 border border-gray-100 hover:shadow-2xl transition-all duration-300"
                data-aos="fade-up"
              >
                {/* Title */}
                <h3 className="text-3xl font-semibold text-gray-700 mb-6 border-b pb-2 flex items-center gap-2">
                  <span className="text-blue-500" /> {setting.name}
                </h3>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                  <div className="flex items-start gap-2 p-2 rounded-md transition">
                    <FiGlobe className="text-blue-400 mt-1" />
                    <span><strong className='text-lg'>Tagline:</strong> {setting.tagline}</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-md transition">
                    <MdWebAsset className="text-blue-400 mt-1" />
                    <span><strong className='text-lg'>Description:</strong> {setting.description}</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-md transition">
                    <FiMapPin className="text-blue-400 mt-1" />
                    <span><strong className='text-lg'>Address Line 1:</strong> {setting.address_line_1}</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-md transition">
                    <FiMapPin className="text-blue-400 mt-1" />
                    <span><strong className='text-lg'>Address Line 2:</strong> {setting.address_line_2}</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-md transition">
                    <FiMapPin className="text-blue-400 mt-1" />
                    <span><strong className='text-lg'>City:</strong> {setting.city}</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-md transition">
                    <FiMapPin className="text-blue-400 mt-1" />
                    <span><strong className='text-lg'>State:</strong> {setting.state}</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-md transition">
                    <FiPhone className="text-blue-400 mt-1" />
                    <div>
                      <div><strong className='text-lg'>Mobile 1:</strong> {setting.mobile_1}</div>
                      <div><strong className='text-lg'>Mobile 2:</strong> {setting.mobile_2}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-md transition">
                    <MdAlternateEmail className="text-blue-400 mt-1" />
                    <span><strong className='text-lg'>Email:</strong> {setting.email}</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-md transition">
                    <FiMail className="text-blue-400 mt-1" />
                    <span><strong className='text-lg'>Email Password:</strong> {setting.email_password}</span>
                  </div>
                  <div className="flex items-start lg:ml-6 gap-2 p-2 rounded-md transition">
                    <span><strong className='text-lg'>Host:</strong> {setting.host}</span>
                  </div>
                  <div className="flex items-start lg:ml-6 gap-2 p-2 rounded-md transition">
                    <span><strong className='text-lg'>Port:</strong> {setting.port}</span>
                  </div>
                  <div className="flex lg:ml-6 items-start gap-2 p-2 rounded-md transition">
                    <span><strong className='text-lg'>Website:</strong></span>
                    <a
                      href={setting.website}
                      className="text-blue-600 hover:text-blue-800 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {setting.website}
                    </a>
                  </div>
                </div>

                {/* Timestamps - BELOW INFO GRID */}
                <div className="mt-6 ml-6">
                  <div className="flex items-center  gap-2 p-2 rounded-md transition">
                    <FaClock className="text-gray-500" />
                    <span><strong className='text-lg'>Created:</strong> {new Date(setting.created_at).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md transition">
                    <FaClock className="text-gray-500" />
                    <span><strong className='text-lg'>Updated:</strong> {new Date(setting.updated_at).toLocaleString()}</span>
                  </div>
                </div>

                {/* Logo */}
                <div className="mt-6 ml-6">
                  <strong className="block text-lg mb-2">Logo:</strong>
                  <img
                    src={setting.logo}
                    alt="Logo"
                    className="w-28 h-28 object-contain border rounded-lg shadow-sm"
                  />
                </div>

                {/* Social Media */}
                <div className="mt-8 ml-6">
                  <strong className="block text-lg mb-2">Social Media:</strong>
                  <ul className="list-disc pl-6 space-y-2 text-base">
                    {setting.social_media.map((sm) => (
                      <li key={sm.id}>
                        <strong>{sm.name}:</strong>{' '}
                        <a
                          href={sm.url}
                          className="text-blue-600 hover:text-blue-800 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {sm.url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
