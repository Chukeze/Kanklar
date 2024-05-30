import { ClerkMiddlewareAuth, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server';


const isPublicRoute = createRouteMatcher(['/site', '/api/uploadthing'])


 const afterAuth = (auth: ClerkMiddlewareAuth, request: NextRequest) => {
   const url = request.nextUrl
   const searchParams = url.searchParams.toString()
   let hostname = request.headers

   const pathWithSearchParams = `${url.pathname}${
     searchParams.length > 0 ? `?${searchParams}` : ''
   }`

   const uniqueSubDomain = hostname
     .get('host')
     ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
     .filter(Boolean)[0]

   if (uniqueSubDomain) {
     return NextResponse.rewrite(
       new URL(`/${uniqueSubDomain}${pathWithSearchParams}`, request.url)
     )
   }

   if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
     return NextResponse.redirect(new URL(`/agency/sign-in`, request.url))
   }

   if (
     url.pathname === '/' ||
     (url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_DOMAIN)
   ) {
     return NextResponse.rewrite(new URL('/site', request.url))
   }

   if (
     url.pathname.startsWith('/agency') ||
     url.pathname.startsWith('/subaccount')
   ) {
     return NextResponse.rewrite(
       new URL(`${pathWithSearchParams}`, request.url)
     )
   }
 }

export default clerkMiddleware(async(auth, request) => {
       if (!isPublicRoute(request)) {
         await auth()
         return afterAuth(auth, request)
       }
       return NextResponse.next()

})
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
