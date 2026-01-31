'use server';

import { revalidatePath } from 'next/cache';

interface ContactFormData {
  fullName: string;
  institution: string;
  message: string;
}

interface ContactFormState {
  success?: boolean;
  error?: string;
  message?: string;
}

export async function submitContactForm(
  prevState: ContactFormState | null, 
  formData: FormData
): Promise<ContactFormState> {
  'use server';
  
  try {
    // Extract data from form
    const data = {
      fullName: formData.get('fullName') as string,
      institution: formData.get('institution') as string,
      message: formData.get('message') as string,
    };

    // Validate required fields
    if (!data.fullName || !data.institution || !data.message) {
      return {
        error: 'All fields are required'
      };
    }

    // Here you would typically:
    // 1. Send email to your team
    // 2. Save to database
    // 3. Trigger notification system
    
    // For now, we'll simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Revalidate the page to show updated state
    revalidatePath('/');

    return {
      success: true,
      message: 'Contact request received successfully'
    };

  } catch (error) {
    console.error('Contact form error:', error);
    return {
      error: 'Failed to process contact request'
    };
  }
}
