import { Injectable } from '@nestjs/common';
import { PayCartDto } from './dtos/cart.dto';
import { StripeService } from './stripe/stripe.service';

@Injectable()
export class AppService {
  constructor(private readonly stripeService: StripeService) { }
  getHello(): string {
    return 'OK from Payment microservice';
  }

  async payCart(cart: PayCartDto): Promise<string> {
    const lineItems = cart.items.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.floor(item.price * 100), // amount in cents
      },
      quantity: item.quantity,
    }));

    // Create a checkout session
    const session =
      await this.stripeService.stripeInstance.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: process.env.THANK_YOU_URL,
        cancel_url: process.env.CANCEL_URL,
      });

    const returnJson = {
      sessionId: session.id,
      sessionUrl: session.url,
    };
    return JSON.stringify(returnJson);
  }
}
