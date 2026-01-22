import nodemailer from "nodemailer";
import config from "../config";
import type { MailOptions } from "nodemailer/lib/smtp-transport";

// Base email sending function
const sendEmail = async (email: string, html: string, subject: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: config.sender_email,
        pass: config.sender_app_pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Email configuration
    const mailOptions: MailOptions = {
      from: "tempmail@gmail.com",
      to: email,
      subject,
      html,
    };

    // Sending the email
    const info = await transporter.sendMail(mailOptions);
    // console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

// Email for invitation
export const sendInviteEmail = async (
  email: string,
  inviteLink: string,
  inviterName?: string,
) => {
  const subject = `You're Invited to Invex`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="display: inline-flex; align-items: center;">
            <div style="width: 32px; height: 32px; background-color: #16a34a; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 10px;">
              <span style="color: white; font-size: 18px;">📦</span>
            </div>
            <h1 style="color: #16a34a; margin: 0; font-size: 28px; font-weight: bold;">
              Invex
            </h1>
          </div>
        </div>

        <h2 style="color: #1f2937; text-align: center;">You're Invited</h2>

        <p style="color: #4b5563;">
          Dear ${email.split("@")[0]},
        </p>

        <p style="color: #4b5563; line-height: 1.6;">
          ${inviterName || "An admin"} has invited you to join
          <strong>Invex</strong>. Use the invite code below to complete your registration. This invite is valid for 24 hours.
        </p>

        <!-- Invite Link -->
        <div style="text-align: center; margin: 30px 0;">
          <div style="background-color: #f8fafc; border: 2px dashed #16a34a; padding: 20px; border-radius: 10px; display: inline-block;">
            <p style="color: #6b7280; font-size: 14px; margin-bottom: 10px; text-transform: uppercase;">
              Your Invite Link
            </p>
            <div style="background-color: #16a34a; color: white; padding: 15px 25px; border-radius: 8px; font-family: monospace; font-size: 24px; font-weight: bold; letter-spacing: 3px;">
              ${inviteLink}
            </div>
          </div>
        </div>

        <!-- Info -->
        <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 25px 0;">
          <p style="margin: 0; color: #1e40af; font-size: 14px;">
            📋 Enter this code during signup to activate your account.
          </p>
        </div>

        <!-- Expiry -->
        <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 25px 0;">
          <p style="margin: 0; color: #92400e; font-size: 14px;">
            🔒 This invite may expire or be revoked by an administrator.
          </p>
        </div>

        <hr />

        <p style="font-size: 14px; color: #6b7280;">
          If you were not expecting this invitation, you can safely ignore this email.
        </p>

        <p style="text-align: center; color: #16a34a; font-weight: bold;">
          Invex Team
        </p>
      </div>

      <p style="text-align: center; font-size: 12px; color: #9ca3af; margin-top: 15px;">
        This email was sent to ${email}.
      </p>
    </div>
  `;

  return sendEmail(email, html, subject);
};
