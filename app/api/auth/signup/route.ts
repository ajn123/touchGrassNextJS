import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Signup request body:', {
      email: body.email,
      name: body.name,
      // password omitted for security
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: body.email.toLowerCase(), // Add username field
        email: body.email.toLowerCase(),
        password: body.password,
        name: body.name
      }),
    });

    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Raw response:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse response:', responseText);
      console.log(parseError);
      return NextResponse.json(
        { error: `Server response: ${responseText}` },
        { status: 500 }
      );
    }

    if (!response.ok) {
      const errorMessage = data.detail || data.message || 'Registration failed';
      console.error('Signup error:', errorMessage);
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
} 