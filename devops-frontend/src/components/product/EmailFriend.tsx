import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface EmailFriendProps {
  productName: string;
  productUrl: string;
}

interface FormData {
  friendEmail: string;
  yourEmail: string;
  message: string;
}

export const EmailFriend: React.FC<EmailFriendProps> = ({ productName, productUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    friendEmail: '',
    yourEmail: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.friendEmail) {
      newErrors.friendEmail = 'Friend\'s email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.friendEmail)) {
      newErrors.friendEmail = 'Invalid email format';
    }
    
    if (!formData.yourEmail) {
      newErrors.yourEmail = 'Your email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.yourEmail)) {
      newErrors.yourEmail = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSending(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setFormData({
        friendEmail: '',
        yourEmail: '',
        message: '',
      });
      
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 2000);
    } catch (error) {
      setErrors({ friendEmail: 'Failed to send email. Please try again.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div data-testid="email-friend">
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        data-testid="email-friend-button"
      >
        <Mail className="w-4 h-4 mr-2" />
        Email a Friend
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Share with a Friend</h3>
            
            {success ? (
              <div className="text-center py-4">
                <p className="text-green-600 font-medium">Email sent successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Friend's Email"
                  type="email"
                  value={formData.friendEmail}
                  onChange={(e) => setFormData({ ...formData, friendEmail: e.target.value })}
                  error={errors.friendEmail}
                  required
                  data-testid="friend-email-input"
                />

                <Input
                  label="Your Email Address"
                  type="email"
                  value={formData.yourEmail}
                  onChange={(e) => setFormData({ ...formData, yourEmail: e.target.value })}
                  error={errors.yourEmail}
                  required
                  data-testid="your-email-input"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal Message (optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={4}
                    data-testid="message-input"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    data-testid="cancel-email"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isSending}
                    data-testid="send-email"
                  >
                    {isSending ? 'Sending...' : 'Send Email'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};