import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get('token'); // Retrieve token from cookies

  // Check if the request is to the /categories path
  if (url.pathname === '/categories') {
    // If no token is found, redirect to /signin
    if (!token) {
      console.log('====================================');
      console.log("no token middle");
      console.log('====================================');
      return NextResponse.redirect(new URL('/signin', req.url));
    }
  }

  // Allow request to proceed if the path is not /categories or if the token is present
  return NextResponse.next();
}
