/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { BookingMailPayload } from 'src/appointment/appointment.dto';



@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  async sendReminder(email: string, link: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Complete Your Appointment Booking',
        html: `
                <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
                    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden;">
                    
                    <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
                        <h2 style="margin: 0;">Appointment Reminder</h2>
                    </div>

                    <div style="padding: 25px; color: #333;">
                        <p style="font-size: 16px;">Hi 👋,</p>

                        <p style="font-size: 15px;">
                        You started booking an appointment but didn’t complete it.
                        Please complete your booking within <b>24 hours</b>.
                        </p>

                        <div style="text-align: center; margin: 30px 0;">
                        <a href="${link}" target="_blank"
                            style="
                            background: #2563eb;
                            color: white;
                            padding: 12px 24px;
                            text-decoration: none;
                            border-radius: 6px;
                            font-size: 16px;
                            display: inline-block;
                            ">
                            Complete Booking
                        </a>
                        </div>

                        <p style="font-size: 14px; color: #666;">
                        If you do not complete your booking within 24 hours,
                        it will be cancelled automatically.
                        </p>

                        <p style="font-size: 14px; margin-top: 30px;">
                        Thanks,<br/>
                        <b>Your ${process.env.COMPANY_NAME}</b>
                        </p>
                    </div>

                    <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #777;">
                        © 2026 ${process.env.COMPANY_NAME}. All rights reserved.
                    </div>

                    </div>
                </div>
                `,
      });
    } catch (error) {
      console.error('Mail sending failed:', error);
    }
  }

  async sendBookingConfirmation(payload: { appointment: BookingMailPayload }) {
    const { appointment } = payload;
    try {
      await this.mailerService.sendMail({
        to: appointment.patientEmail,
        subject: 'Appointment Confirmed - Your Booking Details',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f8;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f4f8; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 40px 30px; text-align: center;">
                      <div style="width: 80px; height: 80px; background-color: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 40px;">✅</span>
                      </div>
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Booking Confirmed!</h1>
                      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Your appointment has been successfully scheduled</p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="color: #1f2937; font-size: 16px; margin: 0 0 30px;">Dear <strong>${appointment.patientName}</strong>,</p>
                      
                      <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 30px;">
                        Great news! Your appointment has been confirmed. We look forward to seeing you. Please find your booking details below:
                      </p>

                      <!-- Booking Details Card -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 12px; overflow: hidden; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 25px;">
                            <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 20px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Appointment Details</h3>
                            
                            <table width="100%" cellpadding="8" cellspacing="0">
                              <tr>
                                <td style="color: #6b7280; font-size: 14px; width: 40%;">📋 Booking ID</td>
                                <td style="color: #1f2937; font-size: 14px; font-weight: 600;">#${appointment.appointmentId}</td>
                              </tr>
                              ${appointment.doctorName ? `
                              <tr>
                                <td style="color: #6b7280; font-size: 14px;">👨‍⚕️ Doctor</td>
                                <td style="color: #1f2937; font-size: 14px; font-weight: 600;">Dr. ${appointment.doctorName}</td>
                              </tr>
                              ` : ''}
                              <tr>
                                <td style="color: #6b7280; font-size: 14px;">📅 Date</td>
                                <td style="color: #1f2937; font-size: 14px; font-weight: 600;">${appointment.date}</td>
                              </tr>
                              <tr>
                                <td style="color: #6b7280; font-size: 14px;">🕐 Time</td>
                                <td style="color: #1f2937; font-size: 14px; font-weight: 600;">${appointment.time}</td>
                              </tr>
                              ${appointment.hospitalName ? `
                              <tr>
                                <td style="color: #6b7280; font-size: 14px;">🏥 Hospital</td>
                                <td style="color: #1f2937; font-size: 14px; font-weight: 600;">${appointment.hospitalName}</td>
                              </tr>
                              ` : ''}
                              ${appointment.hospitalAddress ? `
                              <tr>
                                <td style="color: #6b7280; font-size: 14px;">📍 Address</td>
                                <td style="color: #1f2937; font-size: 14px; font-weight: 600;">${appointment.hospitalAddress}</td>
                              </tr>
                              ` : ''}
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Payment Summary -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ecfdf5; border-radius: 12px; overflow: hidden; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 25px;">
                            <h3 style="color: #065f46; font-size: 18px; margin: 0 0 20px;">💳 Payment Summary</h3>
                            
                            <table width="100%" cellpadding="8" cellspacing="0">
                              <tr>
                                <td style="color: #059669; font-size: 14px;">Consultation Fee</td>
                                <td align="right" style="color: #065f46; font-size: 14px; font-weight: 600;">₹${appointment.appointmentFees}</td>
                              </tr>
                              ${Number(appointment.discountAmount) > 0 ? `
                              <tr>
                                <td style="color: #059669; font-size: 14px;">Discount Applied</td>
                                <td align="right" style="color: #10b981; font-size: 14px; font-weight: 600;">- ₹${appointment.discountAmount}</td>
                              </tr>
                              ` : ''}
                              <tr style="border-top: 2px solid #a7f3d0;">
                                <td style="color: #065f46; font-size: 16px; font-weight: 700; padding-top: 12px;">Total Amount</td>
                                <td align="right" style="color: #065f46; font-size: 16px; font-weight: 700; padding-top: 12px;">₹${appointment.finalAmount}</td>
                              </tr>
                              <tr>
                                <td style="color: #059669; font-size: 14px;">Payment Method</td>
                                <td align="right" style="color: #065f46; font-size: 14px; font-weight: 600;">${appointment.paymentType}</td>
                              </tr>
                              <tr>
                                <td style="color: #059669; font-size: 14px;">Payment Status</td>
                                <td align="right">
                                  <span style="background-color: #10b981; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">${appointment.paymentStatus}</span>
                                </td>
                              </tr>
                              ${appointment.transactionId ? `
                              <tr>
                                <td style="color: #059669; font-size: 14px;">Transaction ID</td>
                                <td align="right" style="color: #065f46; font-size: 14px; font-weight: 600;">${appointment.transactionId}</td>
                              </tr>
                              ` : ''}
                            </table>
                          </td>
                        </tr>
                      </table>

                      ${appointment.zoomUrl ? `
                      <!-- Online Consultation -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #eff6ff; border-radius: 12px; overflow: hidden; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 20px; text-align: center;">
                            <p style="color: #1e40af; font-size: 14px; margin: 0 0 15px;">🎥 Online Consultation Link</p>
                            <a href="${appointment.zoomUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600;">Join Meeting</a>
                          </td>
                        </tr>
                      </table>
                      ` : ''}

                      <!-- Important Notes -->
                      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                        <h4 style="color: #92400e; font-size: 16px; margin: 0 0 12px;">⚠️ Important Notes</h4>
                        <ul style="color: #78350f; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8;">
                          <li>Please arrive 15 minutes before your appointment</li>
                          <li>Bring your previous medical records if any</li>
                          <li>Carry a valid ID proof for verification</li>
                          <li>For cancellation, contact us 24 hours in advance</li>
                        </ul>
                      </div>

                      <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0;">
                        If you have any questions or need to reschedule, please don't hesitate to contact us.
                      </p>

                      <p style="color: #1f2937; font-size: 15px; margin: 30px 0 0;">
                        Best regards,<br/>
                        <strong style="color: #2563eb;">${process.env.COMPANY_NAME || 'Healthcare Team'}</strong>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="color: #6b7280; font-size: 13px; margin: 0 0 10px;">
                        Need help? Contact us at <a href="mailto:support@healthcare.com" style="color: #2563eb; text-decoration: none;">support@healthcare.com</a>
                      </p>
                      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                        © ${new Date().getFullYear()} ${process.env.COMPANY_NAME || 'Healthcare'}. All rights reserved.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
        `,
      });
    } catch (error) {
      console.error('Mail sending failed:', error);
    }
  }


  async sendBookingCancellation(payload: { appointment: BookingMailPayload }) {
    const { appointment } = payload;

    try {
      await this.mailerService.sendMail({
        to: appointment.patientEmail,
        subject: '❌ Appointment Cancelled - Cancellation Confirmation',
        html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f8;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f4f8; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 40px 30px; text-align: center;">
                      <div style="width: 80px; height: 80px; background-color: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px;">
                        <span style="font-size: 40px; line-height: 80px;">❌</span>
                      </div>
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Appointment Cancelled</h1>
                      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Your booking has been cancelled</p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="color: #1f2937; font-size: 16px; margin: 0 0 20px;">Dear <strong>${appointment.patientName}</strong>,</p>
                      
                      <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 30px;">
                        We're writing to confirm that your appointment has been cancelled as requested.
                      </p>

                      <!-- Cancelled Appointment Details -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef2f2; border-radius: 12px; overflow: hidden; margin-bottom: 30px; border: 2px solid #fecaca;">
                        <tr>
                          <td style="padding: 25px;">
                            <h3 style="color: #991b1b; font-size: 18px; margin: 0 0 20px;">Cancelled Appointment Details</h3>
                            
                            <table width="100%" cellpadding="8" cellspacing="0">
                              <tr>
                                <td style="color: #dc2626; font-size: 14px; width: 40%;">Booking ID</td>
                                <td style="color: #991b1b; font-size: 14px; font-weight: 600;">#${appointment.appointmentId}</td>
                              </tr>
                              ${appointment.doctorName ? `
                              <tr>
                                <td style="color: #dc2626; font-size: 14px;">Doctor</td>
                                <td style="color: #991b1b; font-size: 14px; font-weight: 600;">Dr. ${appointment.doctorName}</td>
                              </tr>
                              ` : ''}
                              <tr>
                                <td style="color: #dc2626; font-size: 14px;">Date</td>
                                <td style="color: #991b1b; font-size: 14px; font-weight: 600;">${appointment.date}</td>
                              </tr>
                              <tr>
                                <td style="color: #dc2626; font-size: 14px;">Time</td>
                                <td style="color: #991b1b; font-size: 14px; font-weight: 600;">${appointment.time}</td>
                              </tr>
                              <tr>
                                <td style="color: #dc2626; font-size: 14px;">Cancelled By</td>
                                <td style="color: #991b1b; font-size: 14px; font-weight: 600;">${appointment.cancelBy || 'Patient'}</td>
                              </tr>
                              ${appointment.cancelReason ? `
                              <tr>
                                <td style="color: #dc2626; font-size: 14px; vertical-align: top;">Reason</td>
                                <td style="color: #991b1b; font-size: 14px; font-weight: 600;">${appointment.cancelReason}</td>
                              </tr>
                              ` : ''}
                            </table>
                          </td>
                        </tr>
                      </table>

                      ${appointment.paymentStatus === 'Paid' ? `
                      <!-- Refund Information -->
                      <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                        <h4 style="color: #065f46; font-size: 16px; margin: 0 0 12px;">💰 Refund Information</h4>
                        <p style="color: #047857; font-size: 14px; margin: 0; line-height: 1.6;">
                          Your refund of <strong>₹${appointment.refundAmount || appointment.finalAmount}</strong> will be processed within 5-7 business days to your original payment method.
                          ${appointment.transactionId ? `<br/>Transaction ID: <strong>${appointment.transactionId}</strong>` : ''}
                        </p>
                      </div>
                      ` : ''}

                      <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
                        We're sorry to see you go. If you'd like to reschedule or book a new appointment, we're here to help.
                      </p>

                      <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.APP_URL || 'https://healthcare.com'}/book-appointment" style="display: inline-block; background-color: #2563eb; color: white; padding: 14px 35px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">Book New Appointment</a>
                      </div>

                      <p style="color: #1f2937; font-size: 15px; margin: 30px 0 0;">
                        Best regards,<br/>
                        <strong style="color: #2563eb;">${process.env.COMPANY_NAME || 'Healthcare Team'}</strong>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="color: #6b7280; font-size: 13px; margin: 0 0 10px;">
                        Questions? Contact us at <a href="mailto:support@healthcare.com" style="color: #2563eb; text-decoration: none;">support@healthcare.com</a>
                      </p>
                      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                        © ${new Date().getFullYear()} ${process.env.COMPANY_NAME || 'Healthcare'}. All rights reserved.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
        `,
      });
    } catch (error) {
      console.error('Cancellation mail sending failed:', error);
    }
  }


  async sendPaymentFailed(payload: { appointment: BookingMailPayload }) {
    const { appointment } = payload;

    try {
      await this.mailerService.sendMail({
        to: appointment.patientEmail,
        subject: '⚠️ Payment Failed - Action Required',
        html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f8;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f4f8; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px 30px; text-align: center;">
                      <div style="width: 80px; height: 80px; background-color: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px;">
                        <span style="font-size: 40px; line-height: 80px;">⚠️</span>
                      </div>
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Payment Failed</h1>
                      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Your payment could not be processed</p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="color: #1f2937; font-size: 16px; margin: 0 0 20px;">Dear <strong>${appointment.patientName}</strong>,</p>
                      
                      <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 30px;">
                        We're writing to inform you that your payment for the appointment could not be processed. Please review the details below and try again.
                      </p>

                      <!-- Failed Payment Details -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef3c7; border-radius: 12px; overflow: hidden; margin-bottom: 30px; border: 2px solid #fbbf24;">
                        <tr>
                          <td style="padding: 25px;">
                            <h3 style="color: #92400e; font-size: 18px; margin: 0 0 20px;">Payment Details</h3>
                            
                            <table width="100%" cellpadding="8" cellspacing="0">
                              <tr>
                                <td style="color: #d97706; font-size: 14px; width: 40%;">Booking ID</td>
                                <td style="color: #92400e; font-size: 14px; font-weight: 600;">#${appointment.appointmentId}</td>
                              </tr>
                              <tr>
                                <td style="color: #d97706; font-size: 14px;">Appointment Date</td>
                                <td style="color: #92400e; font-size: 14px; font-weight: 600;">${appointment.date}</td>
                              </tr>
                              <tr>
                                <td style="color: #d97706; font-size: 14px;">Appointment Time</td>
                                <td style="color: #92400e; font-size: 14px; font-weight: 600;">${appointment.time}</td>
                              </tr>
                              <tr>
                                <td style="color: #d97706; font-size: 14px;">Amount</td>
                                <td style="color: #92400e; font-size: 14px; font-weight: 600;">₹${appointment.finalAmount}</td>
                              </tr>
                              <tr>
                                <td style="color: #d97706; font-size: 14px;">Payment Status</td>
                                <td>
                                  <span style="background-color: #dc2626; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">Failed</span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Action Required -->
                      <div style="background-color: #dbeafe; border-left: 4px solid #2563eb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                        <h4 style="color: #1e40af; font-size: 16px; margin: 0 0 12px;">🔔 Action Required</h4>
                        <p style="color: #1e3a8a; font-size: 14px; margin: 0; line-height: 1.6;">
                          To confirm your appointment, please complete the payment. You can retry the payment or contact our support team for assistance.
                        </p>
                      </div>

                      <!-- Common Reasons -->
                      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                        <h4 style="color: #374151; font-size: 15px; margin: 0 0 12px;">Common Reasons for Payment Failure:</h4>
                        <ul style="color: #6b7280; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8;">
                          <li>Insufficient funds in account</li>
                          <li>Incorrect card details entered</li>
                          <li>Card expired or blocked</li>
                          <li>Network connectivity issues</li>
                          <li>Bank declined the transaction</li>
                        </ul>
                      </div>

                      <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.APP_URL || 'https://healthcare.com'}/retry-payment/${appointment.appointmentId}" style="display: inline-block; background-color: #2563eb; color: white; padding: 14px 35px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; margin-right: 10px;">Retry Payment</a>
                        <a href="mailto:support@healthcare.com" style="display: inline-block; background-color: #6b7280; color: white; padding: 14px 35px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">Contact Support</a>
                      </div>

                      <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 20px 0 0; text-align: center;">
                        <strong>Note:</strong> Your appointment slot will be held for 24 hours. Please complete payment to confirm your booking.
                      </p>

                      <p style="color: #1f2937; font-size: 15px; margin: 30px 0 0;">
                        Best regards,<br/>
                        <strong style="color: #2563eb;">${process.env.COMPANY_NAME || 'Healthcare Team'}</strong>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="color: #6b7280; font-size: 13px; margin: 0 0 10px;">
                        Need help? Contact us at <a href="mailto:support@healthcare.com" style="color: #2563eb; text-decoration: none;">support@healthcare.com</a>
                      </p>
                      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                        © ${new Date().getFullYear()} ${process.env.COMPANY_NAME || 'Healthcare'}. All rights reserved.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
        `,
      });
    } catch (error) {
      console.error('Payment failed mail sending error:', error);
    }
  }


  async sendRefundProcessed(payload: { appointment: BookingMailPayload }) {
    const { appointment } = payload;

    try {
      await this.mailerService.sendMail({
        to: appointment.patientEmail,
        subject: '💰 Refund Processed - Payment Returned',
        html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f8;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f4f8; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
                      <div style="width: 80px; height: 80px; background-color: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px;">
                        <span style="font-size: 40px; line-height: 80px;">💰</span>
                      </div>
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Refund Processed</h1>
                      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Your payment has been refunded</p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="color: #1f2937; font-size: 16px; margin: 0 0 20px;">Dear <strong>${appointment.patientName}</strong>,</p>
                      
                      <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 30px;">
                        Good news! Your refund has been successfully processed. The amount will be credited to your original payment method within 5-7 business days.
                      </p>

                      <!-- Refund Details -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ecfdf5; border-radius: 12px; overflow: hidden; margin-bottom: 30px; border: 2px solid #6ee7b7;">
                        <tr>
                          <td style="padding: 25px;">
                            <h3 style="color: #065f46; font-size: 18px; margin: 0 0 20px;">Refund Details</h3>
                            
                            <table width="100%" cellpadding="8" cellspacing="0">
                              <tr>
                                <td style="color: #059669; font-size: 14px; width: 40%;">Booking ID</td>
                                <td style="color: #065f46; font-size: 14px; font-weight: 600;">#${appointment.appointmentId}</td>
                              </tr>
                              <tr>
                                <td style="color: #059669; font-size: 14px;">Original Amount Paid</td>
                                <td style="color: #065f46; font-size: 14px; font-weight: 600;">₹${appointment.finalAmount}</td>
                              </tr>
                              <tr>
                                <td style="color: #059669; font-size: 14px;">Refund Amount</td>
                                <td style="color: #065f46; font-size: 18px; font-weight: 700;">₹${appointment.refundAmount || appointment.finalAmount}</td>
                              </tr>
                              <tr>
                                <td style="color: #059669; font-size: 14px;">Payment Method</td>
                                <td style="color: #065f46; font-size: 14px; font-weight: 600;">${appointment.paymentType}</td>
                              </tr>
                              ${appointment.transactionId ? `
                              <tr>
                                <td style="color: #059669; font-size: 14px;">Transaction ID</td>
                                <td style="color: #065f46; font-size: 14px; font-weight: 600;">${appointment.transactionId}</td>
                              </tr>
                              ` : ''}
                              <tr>
                                <td style="color: #059669; font-size: 14px;">Refund Status</td>
                                <td>
                                  <span style="background-color: #10b981; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">Processed</span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Timeline -->
                      <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                        <h4 style="color: #1e40af; font-size: 16px; margin: 0 0 12px;">⏱️ Refund Timeline</h4>
                        <p style="color: #1e3a8a; font-size: 14px; margin: 0; line-height: 1.6;">
                          The refund amount will be credited within <strong>5-7 business days</strong> depending on your bank's processing time. You'll receive a notification once the amount is credited to your account.
                        </p>
                      </div>

                      <!-- Cancelled Appointment Info -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 12px; overflow: hidden; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 25px;">
                            <h3 style="color: #374151; font-size: 16px; margin: 0 0 15px;">Cancelled Appointment</h3>
                            
                            <table width="100%" cellpadding="6" cellspacing="0">
                              ${appointment.doctorName ? `
                              <tr>
                                <td style="color: #6b7280; font-size: 14px; width: 35%;">Doctor</td>
                                <td style="color: #1f2937; font-size: 14px;">Dr. ${appointment.doctorName}</td>
                              </tr>
                              ` : ''}
                              <tr>
                                <td style="color: #6b7280; font-size: 14px;">Date</td>
                                <td style="color: #1f2937; font-size: 14px;">${appointment.date}</td>
                              </tr>
                              <tr>
                                <td style="color: #6b7280; font-size: 14px;">Time</td>
                                <td style="color: #1f2937; font-size: 14px;">${appointment.time}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
                        If you don't see the refund in your account after 7 business days, please contact your bank or reach out to our support team.
                      </p>

                      <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.APP_URL || 'https://healthcare.com'}/book-appointment" style="display: inline-block; background-color: #2563eb; color: white; padding: 14px 35px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">Book New Appointment</a>
                      </div>

                      <p style="color: #1f2937; font-size: 15px; margin: 30px 0 0;">
                        Best regards,<br/>
                        <strong style="color: #2563eb;">${process.env.COMPANY_NAME || 'Healthcare Team'}</strong>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="color: #6b7280; font-size: 13px; margin: 0 0 10px;">
                        Questions? Contact us at <a href="mailto:support@healthcare.com" style="color: #2563eb; text-decoration: none;">support@healthcare.com</a>
                      </p>
                      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                        © ${new Date().getFullYear()} ${process.env.COMPANY_NAME || 'Healthcare'}. All rights reserved.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
        `,
      });
    } catch (error) {
      console.error('Refund email sending failed:', error);
    }
  }

  async sendAppointmentReminder(payload: { appointment: BookingMailPayload }) {
    const { appointment } = payload;

    try {
      await this.mailerService.sendMail({
        to: appointment.patientEmail,
        subject: '🔔 Reminder: Your Appointment Tomorrow',
        html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f8;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f4f8; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 40px 30px; text-align: center;">
                      <div style="width: 80px; height: 80px; background-color: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px;">
                        <span style="font-size: 40px; line-height: 80px;">🔔</span>
                      </div>
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Appointment Reminder</h1>
                      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Your appointment is tomorrow!</p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="color: #1f2937; font-size: 16px; margin: 0 0 20px;">Dear <strong>${appointment.patientName}</strong>,</p>
                      
                      <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 30px;">
                        This is a friendly reminder that you have an appointment scheduled for tomorrow. Please review the details below:
                      </p>

                      <!-- Appointment Quick View -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%); border-radius: 12px; overflow: hidden; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 25px; text-align: center;">
                            <div style="font-size: 48px; margin-bottom: 15px;">📅</div>
                            <h2 style="color: #5b21b6; margin: 0 0 10px; font-size: 24px;">${appointment.date}</h2>
                            <p style="color: #7c3aed; margin: 0; font-size: 20px; font-weight: 600;">⏰ ${appointment.time}</p>
                          </td>
                        </tr>
                      </table>

                      <!-- Complete Details -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 12px; overflow: hidden; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 25px;">
                            <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 20px;">Appointment Details</h3>
                            
                            <table width="100%" cellpadding="8" cellspacing="0">
                              <tr>
                                <td style="color: #6b7280; font-size: 14px; width: 35%;">Booking ID</td>
                                <td style="color: #1f2937; font-size: 14px; font-weight: 600;">#${appointment.appointmentId}</td>
                              </tr>
                              ${appointment.doctorName ? `
                              <tr>
                                <td style="color: #6b7280; font-size: 14px;">Doctor</td>
                                <td style="color: #1f2937; font-size: 14px; font-weight: 600;">Dr. ${appointment.doctorName}</td>
                              </tr>
                              ` : ''}
                              ${appointment.hospitalName ? `
                              <tr>
                                <td style="color: #6b7280; font-size: 14px;">Hospital</td>
                                <td style="color: #1f2937; font-size: 14px; font-weight: 600;">${appointment.hospitalName}</td>
                              </tr>
                              ` : ''}
                              ${appointment.hospitalAddress ? `
                              <tr>
                                <td style="color: #6b7280; font-size: 14px; vertical-align: top;">Address</td>
                                <td style="color: #1f2937; font-size: 14px; font-weight: 600;">${appointment.hospitalAddress}</td>
                              </tr>
                              ` : ''}
                              <tr>
                                <td style="color: #6b7280; font-size: 14px;">Contact</td>
                                <td style="color: #1f2937; font-size: 14px; font-weight: 600;">${appointment.patientNumber}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      ${appointment.zoomUrl ? `
                      <!-- Online Meeting Link -->
                      <div style="background-color: #eff6ff; border: 2px solid #93c5fd; border-radius: 12px; padding: 20px; margin-bottom: 30px; text-align: center;">
                        <p style="color: #1e40af; font-size: 15px; margin: 0 0 15px; font-weight: 600;">🎥 Online Consultation</p>
                        <a href="${appointment.zoomUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600;">Join Video Call</a>
                        <p style="color: #3b82f6; font-size: 13px; margin: 15px 0 0;">Join 5 minutes before your appointment time</p>
                      </div>
                      ` : ''}

                      <!-- Checklist -->
                      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                        <h4 style="color: #92400e; font-size: 16px; margin: 0 0 15px;">✅ Before You Come</h4>
                        <ul style="color: #78350f; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8;">
                          <li>Arrive 15 minutes early</li>
                          <li>Bring previous medical records</li>
                          <li>Carry valid ID proof</li>
                          <li>List of current medications</li>
                          <li>Insurance card (if applicable)</li>
                        </ul>
                      </div>

                      <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.APP_URL || 'https://healthcare.com'}/appointments/${appointment.appointmentId}" style="display: inline-block; background-color: #2563eb; color: white; padding: 14px 35px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; margin-right: 10px;">View Details</a>
                        <a href="${process.env.APP_URL || 'https://healthcare.com'}/reschedule/${appointment.appointmentId}" style="display: inline-block; background-color: #6b7280; color: white; padding: 14px 35px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">Reschedule</a>
                      </div>

                      <p style="color: #4b5563; font-size: 13px; line-height: 1.6; margin: 20px 0 0; text-align: center; font-style: italic;">
                        Need to cancel? Please do so at least 24 hours in advance to avoid cancellation fees.
                      </p>

                      <p style="color: #1f2937; font-size: 15px; margin: 30px 0 0;">
                        See you soon!<br/>
                        <strong style="color: #2563eb;">${process.env.COMPANY_NAME || 'Healthcare Team'}</strong>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="color: #6b7280; font-size: 13px; margin: 0 0 10px;">
                        Questions? Contact us at <a href="mailto:support@healthcare.com" style="color: #2563eb; text-decoration: none;">support@healthcare.com</a>
                      </p>
                      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                        © ${new Date().getFullYear()} ${process.env.COMPANY_NAME || 'Healthcare'}. All rights reserved.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
        `,
      });
    } catch (error) {
      console.error('Reminder email sending failed:', error);
    }
  }

  async sendAppointmentRescheduled(payload: { appointment: BookingMailPayload, oldDate?: string, oldTime?: string }) {
    const { appointment, oldDate, oldTime } = payload;
    try {
      await this.mailerService.sendMail({
        to: appointment?.patientEmail,
        subject: '📅 Appointment Rescheduled - New Date & Time',
        html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f8;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f4f8; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); padding: 40px 30px; text-align: center;">
                      <div style="width: 80px; height: 80px; background-color: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px;">
                        <span style="font-size: 40px; line-height: 80px;">📅</span>
                      </div>
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Appointment Rescheduled</h1>
                      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Your appointment has been moved to a new date</p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="color: #1f2937; font-size: 16px; margin: 0 0 20px;">Dear <strong>${appointment.patientName}</strong>,</p>
                      
                      <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 30px;">
                        Your appointment has been successfully rescheduled. Please note your new appointment date and time below:
                      </p>

                      ${oldDate && oldTime ? `
                      <!-- Old vs New Comparison -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                        <tr>
                          <td width="48%" style="vertical-align: top;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fee2e2; border-radius: 12px; overflow: hidden;">
                              <tr>
                                <td style="padding: 20px; text-align: center;">
                                  <p style="color: #991b1b; font-size: 13px; margin: 0 0 10px; font-weight: 600;">Previous</p>
                                  <p style="color: #dc2626; font-size: 18px; margin: 0; text-decoration: line-through;">${oldDate}</p>
                                  <p style="color: #dc2626; font-size: 16px; margin: 5px 0 0; text-decoration: line-through;">${oldTime}</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td width="4%" style="text-align: center; vertical-align: middle;">
                            <span style="font-size: 24px;">→</span>
                          </td>
                          <td width="48%" style="vertical-align: top;">
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #d1fae5; border-radius: 12px; overflow: hidden;">
                              <tr>
                                <td style="padding: 20px; text-align: center;">
                                  <p style="color: #065f46; font-size: 13px; margin: 0 0 10px; font-weight: 600;">New</p>
                                  <p style="color: #059669; font-size: 18px; margin: 0; font-weight: 700;">${appointment.date}</p>
                                  <p style="color: #059669; font-size: 16px; margin: 5px 0 0; font-weight: 700;">${appointment.time}</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      ` : `
                      <!-- New Appointment Time -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); border-radius: 12px; overflow: hidden; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 25px; text-align: center;">
                            <p style="color: #065f46; font-size: 14px; margin: 0 0 10px; font-weight: 600;">New Appointment</p>
                            <h2 style="color: #047857; margin: 0 0 10px; font-size: 24px;">${appointment.date}</h2>
                            <p style="color: #059669; margin: 0; font-size: 20px; font-weight: 600;">⏰ ${appointment.time}</p>
                          </td>
                        </tr>
                      </table>
                      `}

                      <!-- Full Details -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 12px; overflow: hidden; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 25px;">
                            <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 20px;">Updated Appointment Details</h3>
                            
                            <table width="100%" cellpadding="8" cellspacing="0">
                              <tr>
                                <td style="color: #6b7280; font-size: 14px; width: 35%;">Booking ID</td>
                                <td style="color: #1f2937; font-size: 14px; font-weight: 600;">#${appointment.appointmentId}</td>
                              </tr>
                              ${appointment.doctorName ? `
                              <tr>
                                <td style="color: #6b7280; font-size: 14px;">Doctor</td>
                                <td style="color: #1f2937; font-size: 14px; font-weight: 600;">Dr. ${appointment.doctorName}</td>
                              </tr>
                              ` : ''}
                              ${appointment.hospitalName ? `
                              <tr>
                                <td style="color: #6b7280; font-size: 14px;">Hospital</td>
                                <td style="color: #1f2937; font-size: 14px; font-weight: 600;">${appointment.hospitalName}</td>
                              </tr>
                              ` : ''}
                              ${appointment.hospitalAddress ? `
                              <tr>
                                <td style="color: #6b7280; font-size: 14px; vertical-align: top;">Address</td>
                                <td style="color: #1f2937; font-size: 14px; font-weight: 600;">${appointment.hospitalAddress}</td>
                              </tr>
                              ` : ''}
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Reminder -->
                      <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                        <h4 style="color: #1e40af; font-size: 16px; margin: 0 0 10px;">📌 Please Note</h4>
                        <p style="color: #1e3a8a; font-size: 14px; margin: 0; line-height: 1.6;">
                          Make sure to mark your calendar with the new appointment date and time. We'll send you a reminder 24 hours before your appointment.
                        </p>
                      </div>

                      <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.APP_URL || 'https://healthcare.com'}/appointments/${appointment.appointmentId}" style="display: inline-block; background-color: #2563eb; color: white; padding: 14px 35px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">View Appointment</a>
                      </div>

                      <p style="color: #1f2937; font-size: 15px; margin: 30px 0 0;">
                        Thank you,<br/>
                        <strong style="color: #2563eb;">${process.env.COMPANY_NAME || 'Healthcare Team'}</strong>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="color: #6b7280; font-size: 13px; margin: 0 0 10px;">
                        Questions? Contact us at <a href="mailto:support@healthcare.com" style="color: #  2563eb; text-decoration: none;">support@healthcare.com</a>
                      </p>
                      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                        © ${new Date().getFullYear()} ${process.env.COMPANY_NAME || 'Healthcare'}. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
        `,
      });
    } catch (error) {
      console.error('Rescheduled email sending failed:', error);
    }
  }

}