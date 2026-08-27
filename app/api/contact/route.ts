import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import {
  contactAdminTemplate,
  contactUserTemplate,
} from "@/lib/emailTemplates";

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      subject,
      message,
    } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and message are required.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // ADMIN EMAIL
    // ==========================================

    const adminEmail = await sendEmail({
      to: process.env.CONTACT_EMAIL!,
      subject:
        subject || `New Contact Message from ${name}`,
      replyTo: email,

      html: contactAdminTemplate({
        name,
        email,
        subject: subject || "No subject",
        message,
      }),

      config: {
        apiKey: process.env.BREVO_API_KEY,
        fromEmail: process.env.BREVO_SENDER_EMAIL!,
        fromName: process.env.BREVO_SENDER_NAME,
      },
    });

    if (!adminEmail.ok) {
      console.error(
        "Admin email failed:",
        adminEmail.error
      );

      return NextResponse.json(
        {
          success: false,
          message: adminEmail.error || "Failed to send email.",
        },
        { status: 500 }
      );
    }

    // ==========================================
    // USER CONFIRMATION EMAIL
    // ==========================================

    const userEmail = await sendEmail({
      to: email,

      subject:
        "We received your message - ExpenseAll",

      html: contactUserTemplate({
        name,
        message,
      }),

      config: {
        apiKey: process.env.BREVO_API_KEY,
        fromEmail: process.env.BREVO_SENDER_EMAIL!,
        fromName: process.env.BREVO_SENDER_NAME,
      },
    });

    if (!userEmail.ok) {
      console.error(
        "User email failed:",
        userEmail.error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Your message was received, but the confirmation email could not be sent.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send your message.",
      },
      { status: 500 }
    );
  }
}