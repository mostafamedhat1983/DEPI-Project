import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface SignupFormData {
  gender: 'male' | 'female';
  firstName: string;
  lastName: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  email: string;
  companyName: string;
  password: string;
  confirmPassword: string;
}

export const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { signup, auth } = useStore();
  const [formData, setFormData] = useState<SignupFormData>({
    gender: 'male',
    firstName: '',
    lastName: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    email: '',
    companyName: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<SignupFormData>>({});

  // Generate arrays for day, month, and year dropdowns
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const validateForm = () => {
    const newErrors: Partial<SignupFormData> = {};
    
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } 
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const fullName = `${formData.firstName} ${formData.lastName}`;
        await signup(formData.email, formData.password, fullName);
        navigate('/');
      } catch (error) {
	  console.log(error);
	  setErrors({ email: 'Email already exists' });
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-8 bg-white rounded-lg shadow"
        data-testid="signup-form"
      >
        <h2 className="text-2xl font-bold">Create Account</h2>

        {/* Personal Details Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Your Personal Details</h3>
          
          {/* Gender Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={(e) => setFormData({ ...formData, gender: 'male' })}
                  className="mr-2"
                  data-testid="gender-male"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={(e) => setFormData({ ...formData, gender: 'female' })}
                  className="mr-2"
                  data-testid="gender-female"
                />
                Female
              </label>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name *"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              error={errors.firstName}
              required
              data-testid="firstname-input"
            />
            <Input
              label="Last Name *"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              error={errors.lastName}
              required
              data-testid="lastname-input"
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <div className="grid grid-cols-3 gap-4">
              <select
                value={formData.birthDay}
                onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                data-testid="birth-day"
              >
                <option value="">Day</option>
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <select
                value={formData.birthMonth}
                onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                data-testid="birth-month"
              >
                <option value="">Month</option>
                {months.map((month, index) => (
                  <option key={month} value={index + 1}>{month}</option>
                ))}
              </select>
              <select
                value={formData.birthYear}
                onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                data-testid="birth-year"
              >
                <option value="">Year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <Input
            type="email"
            label="Email *"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            required
            data-testid="email-input"
          />
        </div>

        {/* Company Details Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Company Details</h3>
          <Input
            label="Company Name"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            data-testid="company-input"
          />
        </div>

        {/* Password Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Your Password</h3>
          <Input
            type="password"
            label="Password *"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
            required
            data-testid="password-input"
          />
          <Input
            type="password"
            label="Confirm Password *"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            error={errors.confirmPassword}
            required
            data-testid="confirm-password-input"
          />
        </div>

        {auth.error && (
          <p className="text-red-600 text-sm" data-testid="signup-error">
            {auth.error}
          </p>
        )}

        <div className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full"
            isLoading={auth.isLoading}
            data-testid="signup-button"
          >
            Create Account
          </Button>
          
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
