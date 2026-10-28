// Server-side only: posts a submission to the Formspree form configured in FORMSPREE_FORM_ID.
// Formspree uses the "email" field as the reply-to address and "_subject" as the email subject.
export async function sendToFormspree(fields: Record<string, string>): Promise<void> {
  const formId = process.env.FORMSPREE_FORM_ID;
  if (!formId) {
    throw new Error('FORMSPREE_FORM_ID is not set');
  }

  const response = await fetch(`https://formspree.io/f/${encodeURIComponent(formId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(fields),
    signal: AbortSignal.timeout(10000),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Formspree responded with ${response.status}`);
  }
}
