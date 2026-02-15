import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import api from '../services/api';

export function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    surname: '',
    phone: '',
    dni: '',
    birthdate: '',
    address: '',
    province: '',
    city: '',
    zipcode: '',
    is_professional: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        const userProfile = response.data.profile || {};
        setProfile(userProfile);
        setFormData({
          surname: userProfile.surname || '',
          phone: userProfile.phone || '',
          dni: userProfile.dni || '',
          birthdate: userProfile.birthdate || '',
          address: userProfile.address || '',
          province: userProfile.province || '',
          city: userProfile.city || '',
          zipcode: userProfile.zipcode || '',
          is_professional: userProfile.is_professional || false,
        });
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.put('/profile', formData);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">User Profile</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="First Name"
              value={user?.name || ''}
              disabled
              className="bg-gray-100"
            />
             <Input
              label="Email"
              value={user?.email || ''}
              disabled
              className="bg-gray-100"
            />
            <Input
              label="Surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
            />
            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              label="DNI"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
            />
            <Input
              label="Date of Birth"
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
            />
          </div>

          <h3 className="text-lg font-medium mt-6">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="md:col-span-2"
            />
            <Input
              label="Province"
              name="province"
              value={formData.province}
              onChange={handleChange}
            />
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <Input
              label="Zip Code"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center mt-4">
            <input
              id="is_professional"
              name="is_professional"
              type="checkbox"
              checked={formData.is_professional}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
            />
            <label htmlFor="is_professional" className="ml-3 block text-sm font-medium text-gray-700">
              I am a Health Professional
            </label>
          </div>

          {message && (
            <div className={`p-4 rounded-md ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message}
            </div>
          )}

          <div className="flex justify-end">
            <Button type="submit" isLoading={loading}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
