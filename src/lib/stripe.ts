import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
export const stripePromise = loadStripe(stripePublishableKey);

// Create payment intent on server
export async function createPaymentIntent(amount: number, currency: string = 'cny') {
  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const data = await response.json();
    return data.clientSecret;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}

// Format price from cents to display string
export function formatPrice(cents: number): string {
  return `¥${(cents / 100).toFixed(0)}`;
}

// Format price for Stripe (in smallest currency unit)
export function formatPriceForStripe(cents: number): number {
  return cents;
}
