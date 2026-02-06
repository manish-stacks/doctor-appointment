/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }


  @Post('razorpay/appointment/create')
  createOrder(
    @Body() body: { appointmentId: string; amount: number },
  ) {
    return this.paymentService.createAppointment(body);
  }

  @Post('razorpay/appointment/verify')
  verifyPayment(
    @Body()
    body: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    },
  ) {
    return this.paymentService.verifyAppointment(body);
  }

  @Post('razorpay/appointment/webhook')
  webhook(@Req() req: Request) {
    return this.paymentService.webhookAppointment(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('razorpay/subscription/create')
  createSubscriptionOrder(
    @Req() req: { user: { id: number; }; },
    @Body() body: { subscriptionId: number; amount: number },
  ) {
    return this.paymentService.createSubscriptionOrder(body, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('razorpay/subscription/verify')
  verifySubscription(
    @Req() req: { user: { id: number; }; },
    @Body()
    body: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    },
  ) {
    return this.paymentService.verifySubscriptionPayment(body, req.user.id);
  }

}
