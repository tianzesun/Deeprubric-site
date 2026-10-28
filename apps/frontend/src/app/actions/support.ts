'use server';

import { randomUUID } from 'crypto';
import { z } from 'zod';
import { sendToFormspree } from '../../lib/formspree';

const supportSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name').max(120, 'Name is too long'),
  email: z.string().trim().email('Please enter a valid email address').max(254, 'Email is too long'),
  subject: z.string().trim().min(1, 'Please enter a subject').max(200, 'Subject is too long'),
  priority: z.enum(['low', 'medium', 'high', 'critical']).catch('medium'),
  message: z.string().trim().min(1, 'Please describe your issue').max(5000, 'Message is too long (5000 characters max)'),
});

type SupportFormData = z.infer<typeof supportSchema>;

export interface SupportFormState {
  success?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof SupportFormData, string>>;
}

export async function submitSupportRequest(
  prevState: SupportFormState | null,
  formData: FormData
): Promise<SupportFormState> {
  // Honeypot: real visitors never see or fill this field, so quietly accept and drop bot submissions
  if (formData.get('website')) {
    return { success: true };
  }

  const parsed = supportSchema.safeParse({
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    subject: String(formData.get('subject') ?? ''),
    priority: String(formData.get('priority') ?? ''),
    message: String(formData.get('message') ?? ''),
  });
  if (!parsed.success) {
    const fieldErrors: SupportFormState['fieldErrors'] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof SupportFormData;
      fieldErrors[field] ??= issue.message;
    }
    return { error: 'Please fix the highlighted fields.', fieldErrors };
  }

  try {
    await sendToFormspree({
      name: parsed.data.name,
      email: parsed.data.email,
      priority: parsed.data.priority,
      message: parsed.data.message,
      _subject: `[${parsed.data.priority.toUpperCase()}] DeepRubric support: ${parsed.data.subject}`,
    });

    return { success: true };
  } catch (error) {
    // Log only the correlation ID and error, never the submitted personal details
    const correlationId = randomUUID();
    console.error(`Support form error [${correlationId}]:`, error);
    return {
      error: `Something went wrong sending your message. Please try again or email support@deeprubric.ai (reference ${correlationId}).`,
    };
  }
}
