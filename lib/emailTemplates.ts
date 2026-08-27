interface ContactAdminTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactUserTemplateProps {
  name: string;
  message: string;
}

export const contactAdminTemplate = ({
  name,
  email,
  subject,
  message,
}: ContactAdminTemplateProps) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Contact Us Message</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    style="background-color:#f4f4f5;padding:48px 16px;"
  >
    <tr>
      <td align="center">

        <!-- Card -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="max-width:520px;background:#ffffff;border-radius:12px;border:1px solid #E4E4E7;overflow:hidden;"
        >

          <!-- Top accent bar -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#18181B,#52525B);"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px 48px 40px;">

              <!-- Logo -->
              <table
                cellpadding="0"
                cellspacing="0"
                style="margin-bottom:36px;"
              >
                <tr>
                  <td
                    style="width:32px;height:32px;background:#18181b;border-radius:8px;text-align:center;vertical-align:middle;"
                  >
                    <span
                      style="color:#ffffff;font-size:16px;font-weight:700;line-height:32px;"
                    >
                      E
                    </span>
                  </td>

                  <td
                    style="padding-left:10px;font-size:15px;font-weight:600;color:#18181b;vertical-align:middle;"
                  >
                    ExpenseAll
                  </td>
                </tr>
              </table>

              <!-- Heading -->
              <p
                style="margin:0 0 8px;font-size:22px;font-weight:600;color:#18181b;letter-spacing:-0.3px;"
              >
                New Contact Us Message
              </p>

              <p
                style="margin:0 0 28px;font-size:15px;color:#71717a;line-height:1.6;"
              >
                Someone has submitted a new message through the
                ExpenseAll contact form.
              </p>

              <!-- Divider -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="margin-bottom:28px;"
              >
                <tr>
                  <td style="height:1px;background:#f4f4f5;"></td>
                </tr>
              </table>

              <!-- Contact Details -->
              <p
                style="margin:0 0 16px;font-size:14px;font-weight:600;color:#18181b;"
              >
                Contact Details
              </p>

              <!-- Name -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="margin-bottom:12px;"
              >
                <tr>
                  <td
                    style="font-size:13px;color:#71717a;width:90px;vertical-align:top;"
                  >
                    Name
                  </td>

                  <td
                    style="font-size:14px;color:#18181b;font-weight:500;"
                  >
                    ${name}
                  </td>
                </tr>
              </table>

              <!-- Email -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="margin-bottom:12px;"
              >
                <tr>
                  <td
                    style="font-size:13px;color:#71717a;width:90px;vertical-align:top;"
                  >
                    Email
                  </td>

                  <td
                    style="font-size:14px;color:#18181b;font-weight:500;"
                  >
                    ${email}
                  </td>
                </tr>
              </table>

              <!-- Subject -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="margin-bottom:28px;"
              >
                <tr>
                  <td
                    style="font-size:13px;color:#71717a;width:90px;vertical-align:top;"
                  >
                    Subject
                  </td>

                  <td
                    style="font-size:14px;color:#18181b;font-weight:500;"
                  >
                    ${subject || "No subject"}
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <p
                style="margin:0 0 12px;font-size:14px;font-weight:600;color:#18181b;"
              >
                Message
              </p>

              <div
                style="background:#fafafa;border:1px solid #E4E4E7;border-radius:8px;padding:16px;margin-bottom:28px;"
              >
                <p
                  style="margin:0;font-size:14px;color:#52525b;line-height:1.7;"
                >
                  ${message.replace(/\n/g, "<br />")}
                </p>
              </div>

              <!-- Reply Button -->
              <table
                cellpadding="0"
                cellspacing="0"
                style="margin-bottom:8px;"
              >
                <tr>
                  <td
                    style="background:#18181b;border-radius:8px;"
                  >
                    <a
                      href="mailto:${email}"
                      style="display:inline-block;padding:13px 28px;font-size:14px;font-weight:500;color:#ffffff;text-decoration:none;letter-spacing:0.1px;"
                    >
                      Reply to ${name}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="height:1px;background:#f4f4f5;"></td>
          </tr>

        </table>

        <!-- Bottom note -->
        <p
          style="margin:20px 0 0;font-size:12px;color:#a1a1aa;"
        >
          © 2027 ExpenseAll · All rights reserved
        </p>

      </td>
    </tr>
  </table>

</body>
</html>
`;


// ==========================================
// USER CONFIRMATION EMAIL
// ==========================================

export const contactUserTemplate = ({
  name,
  message,
}: ContactUserTemplateProps) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>We received your message</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    style="background-color:#f4f4f5;padding:48px 16px;"
  >
    <tr>
      <td align="center">

        <!-- Card -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="max-width:520px;background:#ffffff;border-radius:12px;border:1px solid #E4E4E7;overflow:hidden;"
        >

          <!-- Top accent bar -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#18181B,#52525B);"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px 48px 40px;">

              <!-- Logo -->
              <table
                cellpadding="0"
                cellspacing="0"
                style="margin-bottom:36px;"
              >
                <tr>

                  <td
                    style="width:32px;height:32px;background:#18181b;border-radius:8px;text-align:center;vertical-align:middle;"
                  >
                    <span
                      style="color:#ffffff;font-size:16px;font-weight:700;line-height:32px;"
                    >
                      E
                    </span>
                  </td>

                  <td
                    style="padding-left:10px;font-size:15px;font-weight:600;color:#18181b;vertical-align:middle;"
                  >
                    ExpenseAll
                  </td>

                </tr>
              </table>

              <!-- Heading -->
              <p
                style="margin:0 0 8px;font-size:22px;font-weight:600;color:#18181b;letter-spacing:-0.3px;"
              >
                Thanks for reaching out
              </p>

              <p
                style="margin:0 0 20px;font-size:15px;color:#71717a;line-height:1.6;"
              >
                Hi ${name},
              </p>

              <p
                style="margin:0 0 20px;font-size:15px;color:#71717a;line-height:1.6;"
              >
                Thank you for contacting ExpenseAll. We have received your
                message and our team will get back to you as soon as possible.
              </p>

              <!-- Divider -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="margin-bottom:28px;"
              >
                <tr>
                  <td style="height:1px;background:#f4f4f5;"></td>
                </tr>
              </table>

              <!-- Message -->
              <p
                style="margin:0 0 12px;font-size:14px;font-weight:600;color:#18181b;"
              >
                Your Message
              </p>

              <div
                style="background:#fafafa;border:1px solid #E4E4E7;border-radius:8px;padding:16px;margin-bottom:28px;"
              >
                <p
                  style="margin:0;font-size:14px;color:#52525b;line-height:1.7;"
                >
                  ${message.replace(/\n/g, "<br />")}
                </p>
              </div>

              <!-- Notice -->
              <div
                style="background:#fafafa;border:1px solid #E4E4E7;border-radius:8px;padding:16px;"
              >
                <p
                  style="margin:0;font-size:13px;color:#52525b;line-height:1.6;"
                >
                  <strong style="color:#18181b;">
                    What's next?
                  </strong>
                  Our team will review your message and contact you
                  using the email address you provided.
                </p>
              </div>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="height:1px;background:#f4f4f5;"></td>
          </tr>

        </table>

        <!-- Bottom note -->
        <p
          style="margin:20px 0 0;font-size:12px;color:#a1a1aa;"
        >
          © 2027 ExpenseAll · All rights reserved
        </p>

      </td>
    </tr>
  </table>

</body>
</html>
`;