import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailData {
  name: string;
  email: string;
  phone: string;
  country: string;
  company?: string;
  products: string[];
  quantity?: string;
  message: string;
}

export async function sendInquiryNotification(data: EmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.log('Email notification skipped: RESEND_API_KEY not configured');
    return null;
  }

  const notificationEmail = process.env.NOTIFICATION_EMAIL || '5429752@qq.com';

  try {
    const { data: result, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@arabgoldfactory.com',
      to: notificationEmail,
      subject: `New Inquiry from ${data.name} - ${data.country}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #D4A821;">New Inquiry Received</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="mailto:${data.email}">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="https://wa.me/${data.phone.replace(/\D/g, '')}">${data.phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Country:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.country}</td>
            </tr>
            ${data.company ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.company}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Products:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.products.join(', ')}</td>
            </tr>
            ${data.quantity ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Quantity:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.quantity}</td>
            </tr>
            ` : ''}
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 5px;">
            <strong>Message:</strong>
            <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${data.message}</p>
          </div>
          
          <div style="margin-top: 20px;">
            <a href="https://wa.me/${data.phone.replace(/\D/g, '')}?text=Hi ${data.name}, thank you for your inquiry about ${data.products[0]}." 
               style="display: inline-block; padding: 12px 24px; background: #25D366; color: white; text-decoration: none; border-radius: 5px;">
              Reply on WhatsApp
            </a>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px;">
            This email was sent from ArabGold Factory website inquiry form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return null;
    }

    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    return null;
  }
}
