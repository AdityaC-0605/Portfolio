# Email Setup Guide

## EmailJS Configuration

Your contact form is ready for real email sending! Follow these steps:

### 1. Create EmailJS Account
- Go to [emailjs.com](https://www.emailjs.com/)
- Sign up for a free account (200 emails/month)

### 2. Add Email Service
1. In EmailJS dashboard → "Email Services"
2. Click "Add New Service"
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook/Hotmail**
   - **Yahoo**
   - Or any SMTP service

### 3. Create Email Template
1. Go to "Email Templates" → "Create New Template"
2. Set template content:

```
Subject: New Contact Form Message from {{user_name}}

From: {{user_name}}
Email: {{user_email}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

3. Save the template

### 4. Get Your Credentials
After setup, you'll have:
- **Service ID**: `service_xxxxxxx`
- **Template ID**: `template_xxxxxxx`
- **Public Key**: Found in Account → API Keys

### 5. Update Environment Variables
Edit your `.env` file with your actual credentials:

```env
VITE_EMAILJS_SERVICE_ID=service_your_actual_id
VITE_EMAILJS_TEMPLATE_ID=template_your_actual_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

### 6. Test Your Setup
1. Restart your development server: `npm run dev`
2. Fill out the contact form
3. Check your email for the message!

## Alternative Solutions

If you prefer other email services:

### Resend API (Requires Backend)
- Modern email API with great deliverability
- 3,000 free emails/month
- Requires creating API routes

### Formspree (No Backend)
- Simple form handling service
- 50 free submissions/month
- Just change form action to Formspree endpoint

### Gmail SMTP (Requires Backend)
- Use your Gmail account directly
- Requires app-specific password
- Need to create API routes

## Troubleshooting

**Form shows "Setup Required" message:**
- Check that all three environment variables are set
- Restart your development server after adding .env variables

**Emails not sending:**
- Verify your EmailJS service is active
- Check template variable names match form field names
- Ensure your email service is properly connected

**Emails going to spam:**
- Use a professional email address in EmailJS service
- Add SPF/DKIM records if using custom domain

## Security Notes

- Environment variables starting with `VITE_` are exposed to the browser
- EmailJS public key is safe to expose (it's designed for frontend use)
- Never commit your `.env` file to version control