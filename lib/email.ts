export interface SendEmailInput {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  config?: {
    apiKey?: string;
    fromEmail: string;
    fromName?: string;
  };
}

export interface SendEmailResult {
  ok: boolean;
  skipped?: boolean;
  id?: string;
  error?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
  config,
}: SendEmailInput): Promise<SendEmailResult> {
  const recipients = (Array.isArray(to) ? to : [to]).filter(Boolean);

  if (!config?.apiKey || !config.fromEmail || recipients.length === 0) {
    return {
      ok: false,
      skipped: true,
      error: "Email configuration is missing.",
    };
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",

      headers: {
        "api-key": config.apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },

      body: JSON.stringify({
        sender: {
          email: config.fromEmail,
          name: config.fromName,
        },

        to: recipients.map((email) => ({
          email,
        })),

        subject,

        htmlContent: html,

        ...(replyTo
          ? {
              replyTo: {
                email: replyTo,
              },
            }
          : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");

      return {
        ok: false,
        error: `Brevo ${res.status}: ${detail.slice(0, 300)}`,
      };
    }

    const body = (await res.json().catch(() => null)) as {
      messageId?: string;
    } | null;

    return {
      ok: true,
      id: body?.messageId,
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to send email.",
    };
  }
}