import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, institution, message } = body;

    // Validate required fields
    if (!fullName || !institution || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Send email to your team
    // 2. Save to database
    // 3. Trigger notification system
    
    // For now, we'll simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: 'Contact request received successfully'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process contact request' },
      { status: 500 }
    );
  }
}