import { NextResponse } from "next/server";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { site } from "@/lib/site";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  address?: string;
  service?: string;
  message?: string;
  website?: string;
};

async function appendToGoogleSheet(data: ContactPayload) {
  const { GOOGLE_SHEETS_CLIENT_EMAIL, GOOGLE_SHEETS_PRIVATE_KEY, GOOGLE_SHEETS_SPREADSHEET_ID, GOOGLE_SHEETS_GID } =
    process.env;
  if (!GOOGLE_SHEETS_CLIENT_EMAIL || !GOOGLE_SHEETS_PRIVATE_KEY || !GOOGLE_SHEETS_SPREADSHEET_ID) {
    throw new Error("Google Sheets environment variables are not configured");
  }

  const jwt = new JWT({
    email: GOOGLE_SHEETS_CLIENT_EMAIL,
    key: GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(GOOGLE_SHEETS_SPREADSHEET_ID, jwt);
  await doc.loadInfo();
  const sheet = doc.sheetsById[Number(GOOGLE_SHEETS_GID ?? 0)];

  await sheet.addRow({
    Nom: data.lastName ?? "",
    Prénom: data.firstName ?? "",
    "E-mail": data.email,
    Telephone: data.phone,
    Adresse: data.address ?? "",
    Service: data.service ?? "",
    "Msg / Description": data.message ?? "",
    "Site web": "urgence electricien",
  });
}

const NOTIFICATION_RECIPIENTS = ["soum.constru.inc@gmail.com", "wperpe@gmail.com"];

async function sendBrevoEmail(data: ContactPayload) {
  const { BREVO_API_KEY, BREVO_SENDER_EMAIL } = process.env;
  if (!BREVO_API_KEY || !BREVO_SENDER_EMAIL) {
    throw new Error("Brevo environment variables are not configured");
  }

  const html = `
    <div style="font-family: 'Segoe UI', system-ui, sans-serif; background:#eef4fd; padding:24px;">
      <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden;">
        <div style="background:#0a1433; padding:20px 24px;">
          <span style="color:#e8790a; font-size:18px; font-weight:bold;">${site.name}</span>
        </div>
        <div style="padding:24px; color:#0a1020;">
          <h2 style="color:#0a1433; margin-top:0;">Nouvelle demande de soumission</h2>
          <p><strong>Nom :</strong> ${data.firstName ?? ""} ${data.lastName ?? ""}</p>
          <p><strong>Courriel :</strong> ${data.email}</p>
          <p><strong>Téléphone :</strong> ${data.phone}</p>
          <p><strong>Adresse :</strong> ${data.address ?? "Non fournie"}</p>
          <p><strong>Service :</strong> ${data.service ?? "Non spécifié"}</p>
          <p><strong>Message :</strong></p>
          <p style="white-space:pre-wrap;">${data.message ?? "Aucun message"}</p>
        </div>
      </div>
    </div>
  `;

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: site.name, email: BREVO_SENDER_EMAIL },
      to: NOTIFICATION_RECIPIENTS.map((email) => ({ email })),
      subject: `Nouvelle soumission de ${data.firstName ?? ""} ${data.lastName ?? ""}`,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brevo API error (${res.status}): ${body}`);
  }
}

export async function POST(request: Request) {
  const data = (await request.json()) as ContactPayload;

  if (data.website) {
    return NextResponse.json({ success: true });
  }

  if (!data.email || !data.phone) {
    return NextResponse.json({ error: "Le courriel et le téléphone sont requis." }, { status: 400 });
  }

  const [sheetResult, emailResult] = await Promise.allSettled([appendToGoogleSheet(data), sendBrevoEmail(data)]);

  if (sheetResult.status === "fulfilled") {
    console.log("[contact] SPREADSHEET: OK - row added to Google Sheets");
  } else {
    console.error("[contact] SPREADSHEET: FAILED -", sheetResult.reason);
  }

  if (emailResult.status === "fulfilled") {
    console.log("[contact] EMAIL: OK - sent to", NOTIFICATION_RECIPIENTS.join(", "));
  } else {
    console.error("[contact] EMAIL: FAILED -", emailResult.reason);
  }

  if (sheetResult.status === "rejected" && emailResult.status === "rejected") {
    return NextResponse.json({ error: "Impossible de traiter la demande pour le moment." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
