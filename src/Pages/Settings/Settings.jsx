import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Sidebar from '../../Components/Siderbar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';

const Settings = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const [logo, setLogo] = useState(null);
  const [form, setForm] = useState({
    name: 'Wov Tours ',
    tagline: 'Walks Of Varanasi',
    description: 'Test description',
    mobile: '9999999999',
    email: 'test@gmail.com',
    email_password: 'Test@123',
    email_host: 'test',
    email_port: 200,
    website: 'https://wovtours.com',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="min-h-screen lg:ml-72 bg-custom-gray py-10 px-4 font-rubik">
        <div className="max-w-4xl mx-auto bg-white lg:-mt-10 -mt-16 text-gray-800 shadow-lg rounded-xl p-10">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800" data-aos="fade-down">
            Website Settings
          </h2>

          <form className="space-y-6" data-aos="fade-up">
            {/* Site Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Site Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg"
                placeholder="Enter site name"
              />
            </div>

            {/* Tagline */}
            <div>
              <label className="block text-sm font-medium mb-1">Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg"
                placeholder="Enter tagline"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg"
                placeholder="Enter site description"
              />
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">Logo</label>
              {logo && (
                <img src={logo} alt="Site Logo" className="w-16 h-16 mb-2 rounded-full object-cover border" />
              )}
              <input type="file" onChange={handleLogoUpload} className="text-sm text-gray-600" />
              {logo && (
                <button
                  onClick={() => setLogo(null)}
                  className="block text-red-600 mt-2 text-sm hover:underline"
                >
                  Remove Logo
                </button>
              )}
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium mb-1">Mobile</label>
              <input
                type="text"
                value={form.mobile}
                onChange={(e) => handleChange('mobile', e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg"
                placeholder="Enter mobile number"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg"
                placeholder="Enter email address"
              />
            </div>

            {/* Email Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Email Password</label>
              <input
                type="password"
                value={form.email_password}
                onChange={(e) => handleChange('email_password', e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg"
                placeholder="Enter email password"
              />
            </div>

            {/* Email Host */}
            <div>
              <label className="block text-sm font-medium mb-1">Email Host</label>
              <input
                type="text"
                value={form.email_host}
                onChange={(e) => handleChange('email_host', e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg"
                placeholder="Enter email host"
              />
            </div>

            {/* Email Port */}
            <div>
              <label className="block text-sm font-medium mb-1">Email Port</label>
              <input
                type="number"
                value={form.email_port}
                onChange={(e) => handleChange('email_port', Number(e.target.value))}
                className="w-full border border-gray-300 p-3 rounded-lg"
                placeholder="Enter email port"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium mb-1">Website URL</label>
              <input
                type="url"
                value={form.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg"
                placeholder="https://example.com"
              />
            </div>

            {/* Save Button */}
            <div className="text-right">
              <button
                type="button"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg shadow transition"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Settings;
