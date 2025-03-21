import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { useStore } from '../../store/useStore';

interface AddReviewProps {
  productId: string;
  onReviewSubmit: () => void;
}

export const AddReview: React.FC<AddReviewProps> = ({ productId, onReviewSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { auth, addReview } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.user) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await addReview({
        productId,
        userId: auth.user.id,
        userName: auth.user.name,
        rating,
        comment,
        createdAt: new Date().toISOString()
      });

      setComment('');
      setRating(5);
      onReviewSubmit();
    } catch (error) {
      setError('Failed to submit review. Please try again.');
      console.error('Failed to submit review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">Write a Review</h3>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className={`${
                value <= rating ? 'text-yellow-400' : 'text-gray-300'
              } hover:scale-110 transition-transform`}
              data-testid={`rating-star-${value}`}
            >
              <Star className="w-6 h-6" fill="currentColor" />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Your Review
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Share your thoughts about this product..."
          required
          data-testid="review-comment"
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm" data-testid="review-error">
          {error}
        </p>
      )}

      <Button
        type="submit"
        isLoading={isSubmitting}
        className="w-full"
        data-testid="submit-review"
      >
        Submit Review
      </Button>
    </form>
  );
};