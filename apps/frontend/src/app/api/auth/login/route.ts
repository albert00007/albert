import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // Call backend graphql
    const backendUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://backend:3000/graphql';
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation Login($password: String!) {
            login(password: $password) {
              access_token
            }
          }
        `,
        variables: { password }
      })
    });
    
    const data = await response.json();
    
    if (data.errors || !data.data?.login?.access_token) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
    
    const token = data.data.login.access_token;
    
    // Set HttpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 day
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
