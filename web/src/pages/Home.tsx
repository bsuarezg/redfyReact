import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

export function Home() {
  const { user } = useAuth();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Healthcare Services at Your Fingertips
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Connect with certified health professionals for in-person or online consultations.
            Manage your appointments, payments, and health records in one place.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {!user && (
              <>
                <Link to="/register">
                  <Button size="lg" variant="primary">Get Started</Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="ghost">Log In <span aria-hidden="true">→</span></Button>
                </Link>
              </>
            )}
            {user && (
              <Link to="/profile">
                <Button size="lg" variant="primary">Go to Dashboard</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Our Services</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for your health
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                { name: 'Physiotherapy', description: 'Rehabilitation and physical therapy sessions at home or clinic.' },
                { name: 'Nursing', description: 'Professional nursing care for elderly or post-op recovery.' },
                { name: 'Nutrition', description: 'Personalized diet plans and nutritional counseling.' },
              ].map((service) => (
                <div key={service.name} className="flex flex-col bg-white p-6 rounded-lg shadow-sm">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    {service.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{service.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
