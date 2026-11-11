import {
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, timingSafeEqual } from 'node:crypto';
import Razorpay from 'razorpay';

export interface CreateRazorpayOrderOptions {
  /** Amount in the smallest currency unit (paise for INR). */
  amount: number;
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
}

@Injectable()
export class RazorpayService {
  private client?: Razorpay;

  constructor(private readonly configService: ConfigService) {}

  getKeyId(): string {
    return this.getCredentials().keyId;
  }

  async createOrder(options: CreateRazorpayOrderOptions) {
    if (!Number.isSafeInteger(options.amount) || options.amount <= 0) {
      throw new InternalServerErrorException(
        'Razorpay order amount must be a positive integer in the smallest currency unit',
      );
    }

    try {
      return await this.getClient().orders.create({
        amount: options.amount,
        currency: options.currency ?? 'INR',
        ...(options.receipt ? { receipt: options.receipt } : {}),
        ...(options.notes ? { notes: options.notes } : {}),
      });
    } catch (error) {
      throw new ServiceUnavailableException(
        'Could not create a Razorpay order',
        { cause: error },
      );
    }
  }

  verifyPaymentSignature(
    orderId: string,
    paymentId: string,
    signature: string,
  ): boolean {
    const { keySecret } = this.getCredentials();
    const expectedSignature = createHmac('sha256', keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest();

    let receivedSignature: Buffer;
    try {
      receivedSignature = Buffer.from(signature, 'hex');
    } catch {
      return false;
    }

    return (
      receivedSignature.length === expectedSignature.length &&
      timingSafeEqual(receivedSignature, expectedSignature)
    );
  }

  private getClient(): Razorpay {
    if (!this.client) {
      const { keyId, keySecret } = this.getCredentials();
      this.client = new Razorpay({ key_id: keyId, key_secret: keySecret });
    }

    return this.client;
  }

  private getCredentials(): { keyId: string; keySecret: string } {
    const keyId = this.configService.get<string>('razorpay.keyId');
    const keySecret = this.configService.get<string>('razorpay.keySecret');

    if (!keyId || !keySecret) {
      throw new ServiceUnavailableException(
        'Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.',
      );
    }

    return { keyId, keySecret };
  }
}