/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Request } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post('razorpay/create-order')
  createOrder(
    @Body() body: { appointmentId: string; amount: number },
  ) {
    console.log(body);
    return this.paymentService.createOrder(body);
  }

  @Post('razorpay/verify')
  verifyPayment(
    @Body()
    body: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    },
  ) {
    console.log('razorpay/verify', body);
    return this.paymentService.verify(body);
  }

  @Post('razorpay/webhook')
  webhook(@Req() req: Request) {
    return this.paymentService.webhook(req);
  }
}
