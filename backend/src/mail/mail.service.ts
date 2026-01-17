/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    async sendReminder(email: string, link: string) {
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
    }
}
