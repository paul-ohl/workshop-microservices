import { Injectable, OnModuleInit } from '@nestjs/common';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService implements OnModuleInit {
  private stripe: Stripe;

  async onModuleInit() {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error(
        'Missing Stripe secret key, please define STRIPE_SECRET_KEY in your environment variables',
      );
    }
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  get stripeInstance(): Stripe {
    return this.stripe;
  }
}
