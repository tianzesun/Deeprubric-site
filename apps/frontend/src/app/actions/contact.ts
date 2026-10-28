'use server';

import { randomUUID } from 'crypto';
import { z } from 'zod';

const contactSchema = z.object({
  fullName: z.string().trim().min(1, 'Please enter your name').max(120, 'Name is too long'),
  institution: z.string().trim().min(1, 'Please enter your institution').max(200, 'Institution name is too long'),
  email: z.string().trim().email('Please enter a valid email address').max(254, 'Email is too long'),
  message: z.string().trim().min(1, 'Please tell us how we can help').max(5000, 'Message is too long (5000 characters max)'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export interface ContactFormState {
  success?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof ContactFormData, string>>;
  // Echo submitted values back so the form keeps them when validation fails
  values?: Partial<ContactFormData>;
}

export async function submitContactForm(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot: real visitors never see or fill this field, so quietly accept and drop bot submissions
  if (formData.get('website')) {
    return { success: true };
  }

  const values = {
    fullName: String(formData.get('fullName') ?? ''),
    institution: String(formData.get('institution') ?? ''),
    email: String(formData.get('email') ?? ''),
    message: String(formData.get('message') ?? ''),
  };

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: ContactFormState['fieldErrors'] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactFormData;
      fieldErrors[field] ??= issue.message;
    }
    return { error: 'Please fix the highlighted fields.', fieldErrors, values };
  }

  try {
    const formId = process.env.FORMSPREE_FORM_ID;
    if (!formId) {
      throw new Error('FORMSPREE_FORM_ID is not set');
    }

    // Formspree uses the "email" field as the reply-to address and "_subject" as the email subject
    const response = await fetch(`https://formspree.io/f/${encodeURIComponent(formId)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: parsed.data.fullName,
        institution: parsed.data.institution,
        email: parsed.data.email,
        message: parsed.data.message,
        _subject: `DeepRubric demo request: ${parsed.data.institution}`,
      }),
      signal: AbortSignal.timeout(10000),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Formspree responded with ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    // Log only the correlation ID and error, never the submitted personal details
    const correlationId = randomUUID();
    console.error(`Contact form error [${correlationId}]:`, error);
    return {
      error: `Something went wrong sending your request. Please try again or email contact@deeprubric.ai (reference ${correlationId}).`,
      values,
    };
  }
}
