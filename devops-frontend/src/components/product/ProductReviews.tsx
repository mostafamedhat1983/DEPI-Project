import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { AddReview } from './AddReview';
import { Review } from '../../types';

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const { auth, getProductReviews } = useStore();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const productReviews = await getProductReviews(productId);
        setReviews(productReviews);
      } catch (error) {
        console.error('Failed to load reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, [productId, getProductReviews]);

  const handleReviewSubmit = async () => {
    const updatedReviews = await getProductReviews(productId);
    setReviews(updatedReviews);
  };

  const StarRating = ({ value }: { value: number }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${star <= value ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
        />
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="product-reviews">
      <h2 className="text-2xl font-bold">Customer Reviews</h2>

      {auth.user ? (
        <AddReview productId={productId} onReviewSubmit={handleReviewSubmit} />
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-gray-600">
            Please{' '}
            <a href="/test-shop/login#/login" className="text-blue-600 hover:underline">
              log in
            </a>{' '}
            to write a review.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-lg shadow-sm"
              data-testid={`review-${review.id}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-medium">{review.userName}</p>
                  <StarRating value={review.rating} />
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">
            No reviews yet. Be the first to review this product!
          </p>
        )}
      </div>
    </div>
  );
};