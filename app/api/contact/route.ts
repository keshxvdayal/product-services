import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.MAKE_CONTACT_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("MAKE_CONTACT_WEBHOOK_URL is missing");

      return NextResponse.json(
        { error: "Contact system is not configured." },
        { status: 500 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "contact_form",
        name,
        email,
        subject,
        message,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error("Make webhook failed");
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Unable to send message." },
      { status: 500 }
    );
  }
}