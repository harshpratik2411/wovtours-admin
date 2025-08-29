import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Sidebar from '../../Components/Siderbar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import SettingsServices from './SettingServices';
import { FiGlobe, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaClock } from 'react-icons/fa';
import { MdAlternateEmail, MdWebAsset } from 'react-icons/md';
import { useAlert } from '../../Context/AlertContext/AlertContext';

const Settings = () => {
  const [settings, setSettings] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { showalert } = useAlert();

  useEffect(() => {
    AOS.init({ duration: 800 });
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { settings } = await SettingsServices.getAll('', '', 1);
    setSettings(settings);
    if (settings.length > 0) {
      setFormData(settings[0]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        logo: file, // store file directly
      }));
    }
  };


  // const handleLogoChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setFormData((prev) => ({
  //         ...prev,
  //         logo: reader.result,
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSocialChange = (index, field, value) => {
    const updatedSocial = [...(formData.social_media || [])];
    updatedSocial[index] = { ...updatedSocial[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      social_media: updatedSocial,
    }));
  };

  const handleAddSocial = () => {
    const newEntry = { id: Date.now(), name: '', url: '' };
    setFormData((prev) => ({
      ...prev,
      social_media: [...(prev.social_media || []), newEntry],
    }));
  };

  const handleRemoveSocial = (index) => {
    const updated = [...(formData.social_media || [])];
    updated.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      social_media: updated,
    }));
  };

  const handleSave = async () => {
    try {
      // await SettingsServices.update(1, formData);
      const data = new FormData();

      // Append all fields
      Object.keys(formData).forEach((key) => {
        if (key === "social_media") {
          data.append(key, JSON.stringify(formData.social_media));
        } else if (key === "logo" && formData.logo instanceof File) {
          data.append("logo", formData.logo); // real file
        } else {
          data.append(key, formData[key]);
        }
      });

      await SettingsServices.update(1, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showalert('Settings updated successfully!');
      navigate('/settings');
      setEditMode(false);
      loadSettings();
    } catch (err) {
      console.error(err);
      showalert('Failed to update settings.');
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="min-h-screen -mt-10 lg:ml-72 bg-gradient-to-br from-gray-100 to-gray-200 py-12  px-6 font-rubik">
        <div className="max-w-6xl mx-auto bg-white text-gray-800 shadow-xl rounded-2xl lg:p-10 p-1 relative">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10 border-b pb-6">
            <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-3" data-aos="fade-down">
              Website Settings
            </h2>
            <div className="flex gap-4">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="text-white bg-blue-600 px-5 py-2 rounded-md text-md hover:bg-blue-700 transition"
                >
                  Edit
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="text-white bg-green-600 px-5 py-2 rounded-md text-md hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setFormData(settings[0]);
                    }}
                    className="text-gray-700 border border-gray-300 px-5 py-2 rounded-md text-md hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Settings Form */}
          {Object.keys(formData).length === 0 ? (
            <p className="text-center text-gray-600 text-xl font-medium">Loading settings...</p>
          ) : (
            <div
              className="p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-100 transition-all duration-300"
              data-aos="fade-up"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                <InputField icon={<FiGlobe />} label="Tagline" name="tagline" value={formData.tagline} onChange={handleInputChange} editable={editMode} />
                <InputField icon={<MdWebAsset />} label="Description" name="description" value={formData.description} onChange={handleInputChange} editable={editMode} />
                <InputField icon={<FiMapPin />} label="Address Line 1" name="address_line_1" value={formData.address_line_1} onChange={handleInputChange} editable={editMode} />
                <InputField icon={<FiMapPin />} label="Address Line 2" name="address_line_2" value={formData.address_line_2} onChange={handleInputChange} editable={editMode} />
                <InputField icon={<FiMapPin />} label="City" name="city" value={formData.city} onChange={handleInputChange} editable={editMode} />
                <InputField icon={<FiMapPin />} label="State" name="state" value={formData.state} onChange={handleInputChange} editable={editMode} />
                <InputField icon={<FiPhone />} label="Mobile 1" name="mobile_1" value={formData.mobile_1} onChange={handleInputChange} editable={editMode} />
                <InputField icon={<FiPhone />} label="Mobile 2" name="mobile_2" value={formData.mobile_2} onChange={handleInputChange} editable={editMode} />
                <InputField icon={<MdAlternateEmail />} label="Email" name="email" value={formData.email} onChange={handleInputChange} editable={editMode} />
                <InputField icon={<FiMail />} label="Email Password" name="email_password" value={formData.email_password} onChange={handleInputChange} editable={editMode} />
                <InputField icon={null} label="Host" name="host" value={formData.host} onChange={handleInputChange} editable={editMode} />
                <InputField icon={null} label="Port" name="port" value={formData.port} onChange={handleInputChange} editable={editMode} />
                <InputField icon={null} label="Website" name="website" value={formData.website} onChange={handleInputChange} editable={editMode} />
              </div>

              {/* Timestamps */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 p-2 text-gray-600">
                  <FaClock className="text-gray-500" />
                  <span><strong className='text-md'>Created:</strong> {new Date(formData.created_at).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 p-2 text-gray-600">
                  <FaClock className="text-gray-500" />
                  <span><strong className='text-md'>Updated:</strong> {new Date(formData.updated_at).toLocaleString()}</span>
                </div>
              </div>

              {/* Logo */}
              <div className="mt-10">
                <strong className="block text-lg mb-2">Logo:</strong>
                {editMode ? (
                  <div className="flex flex-col gap-3">
                    <input type="file" accept="image/*" onChange={handleLogoChange} />
                    {formData.logo && (
                      <img
                        src={formData.logo}
                        alt="Logo Preview"
                        className="w-28 h-28 object-contain border rounded-lg shadow-sm"
                      />
                    )}
                  </div>
                ) : (
                  <img
                    src={formData.logo}
                    alt="Logo"
                    className="w-28 h-28 object-contain border rounded-lg shadow-sm"
                  />
                )}
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <strong className="block text-lg mb-4">Social Media:</strong>
                {editMode ? (
                  <div className="space-y-4">
                    {(formData.social_media || []).map((sm, index) => (
                      <div key={sm.id} className="flex flex-col md:flex-row md:items-center gap-4">
                        <input
                          type="text"
                          placeholder="Name"
                          value={sm.name}
                          onChange={(e) => handleSocialChange(index, 'name', e.target.value)}
                          className="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none flex-1"
                        />
                        <input
                          type="text"
                          placeholder="URL"
                          value={sm.url}
                          onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                          className="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none flex-1"
                        />
                        <button
                          onClick={() => handleRemoveSocial(index)}
                          className="text-red-500  font-bold px-3 py-1 border border-red-600 rounded-md"
                          type="button"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={handleAddSocial}
                      className="mt-2 text-blue-500  font-semibold px-4 py-2 border border-blue-600 rounded-md"
                      type="button"
                    >
                      + Add Social Media
                    </button>
                  </div>
                ) : (
                  <ul className="list-disc pl-6 space-y-2 text-base text-blue-600">
                    {formData.social_media?.map((sm) => (
                      <li key={sm.id}>
                        <strong>{sm.name}:</strong>{' '}
                        <a
                          href={sm.url}
                          className="hover:text-blue-800 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {sm.url}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const InputField = ({ icon, label, name, value, onChange, editable }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
      {icon && <span className="text-blue-500">{icon}</span>}
      {label}:
    </label>
    {editable ? (
      <input
        type="text"
        name={name}
        value={value || ''}
        onChange={onChange}
        className="border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
    ) : (
      <div className="text-gray-700 bg-gray-50 border border-gray-200 px-3 py-2 rounded-md">{value}</div>
    )}
  </div>
);

export default Settings;
