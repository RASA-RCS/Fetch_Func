// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights reserved.
//  This software is the confidential and proprietary information of [Rasa Consultancy Services]. 
//  You shall not disclose such confidential information and shall use it only in accordance 
//with the terms of the license agreement you entered into with [Rasa Consultancy Services].
//  For more information, please contact: [Your Company Email/Legal Department Contact]

import nodemailer from "nodemailer";

/**
 * Function: sendEmailtoUser
 * Description: Sends a verification email to the user with the provided link.
 */
export const sendEmailtoUser = async (link, email) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `
        <!doctype html>
        <html lang="en-US">
        <head>
            <meta charset="UTF-8">
            <title>Verify Your Email</title>
            <style>a:hover{ text-decoration: underline !important; }</style>
        </head>
        <body style="margin:0;padding:0;background-color:#f2f3f8;font-family:'Open Sans',sans-serif;">
            <table width="100%" bgcolor="#f2f3f8">
                <tr><td align="center">
                    <table width="95%" max-width="670px" bgcolor="#fff" style="border-radius:3px;text-align:center;box-shadow:0 6px 18px rgba(0,0,0,.06);">
                        <tr><td height="40"></td></tr>
                        <tr>
                            <td style="padding:0 35px;">
                                <h1 style="color:#1e1e2d;font-weight:500;font-size:32px;">Thank you for registering!</h1>
                                <p style="color:#455056;font-size:15px;line-height:24px;">Click the link below to verify your email.</p>
                                <a href="${link}" style="background:#20e277;color:#fff;text-decoration:none;font-weight:500;font-size:14px;padding:10px 24px;border-radius:50px;display:inline-block;margin-top:20px;">Verify Email</a>
                            </td>
                        </tr>
                        <tr><td height="40"></td></tr>
                    </table>
                </td></tr>
            </table>
        </body>
        </html>
      `,
    };

    const info = await transport.sendMail(mailOptions);

    console.log("✅ Email sent:", info.response);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("❌ Email sending error:", error);
    return { success: false, message: error.message || "Email sending failed" };
  }
};




/**
 * Function: sendStatusEmail
 * Description: Sends job application status email (Shortlisted / Rejected)
 */
export const sendStatusEmail = async (email, name, jobTitle, status) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let subject = "";
    let message = "";

    if (status === "Shortlisted") {
      subject = `Congratulations! You are Shortlisted for ${jobTitle}`;
      message = `
        <h2>Hello ${name},</h2>
        <p>🎉 <strong>Congratulations!</strong></p>
        <p>You have been <strong>shortlisted</strong> for the <strong>${jobTitle}</strong> position.</p>
        <p>Our team will contact you soon with further interview details.</p>
        <br/>
         <p>Warm Regards,<br/>Priyanka Consultancy Services</p>
      `;
    } else if (status === "Rejected") {
      subject = `Update on your ${jobTitle} Application`;
      message = `
        <h2>Hello ${name},</h2>
        <p>Thank you for applying for the <strong>${jobTitle}</strong> position.</p>
        <p>Unfortunately, your application was <b>not selected</b>.</p>
        <p>We encourage you to apply again in the future.</p>
        <br/>
         <p>Regards,<br/>Priyanka Consultancy Services</p>
      `;
    }
    

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject,
      html: message,
    };

    const info = await transport.sendMail(mailOptions);

    console.log("Status Email Sent:", info.response);
    return { success: true };
  } catch (err) {
    console.log("Email Error:", err);
    return { success: false, error: err.message };
  }
};

/**
 * Function: sendAdminNotification
 * Description: Sends an email to admin when a new applicant applies
 */
export const sendApplicationEmail = async (name, email, phone, age, jobTitle) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.ADMIN_EMAIL, // ADD THIS IN .env FILE
      subject: `New Applicant Applied for ${jobTitle}`,
      html: `
        <h2>New Job Application Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Job Title:</strong> ${jobTitle}</p>
        <br/>
        <p>Login to your Admin Dashboard to review the applicant.</p>
      `,
    };

    const info = await transport.sendMail(mailOptions);

    console.log("📩 Admin Notification Sent:", info.response);
    return { success: true };
  } catch (err) {
    console.log("❌ Admin Email Error:", err);
    return { success: false, error: err.message };
  }
};
