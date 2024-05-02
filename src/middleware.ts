import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';


const nextIntlMiddleware = createMiddleware({
  locales: ['en', 'zh-CN'],
  defaultLocale: 'en'
});

export async function middleware(request: NextRequest) {
  // 处理国际化仅在页面请求中应用
  if (!request.nextUrl.pathname.startsWith('/api') && request.nextUrl.pathname !== '/sitemap.xml') {
    const intlResponse = nextIntlMiddleware(request);
    if (intlResponse) return intlResponse;
  }

  // API 请求或不需要国际化处理的路径继续处理 Supabase
  let response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  await supabase.auth.getUser();

  return response;
}



export const config = {
  matcher: [
    '/(zh-CN|en)/:path*',
    '/',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ]
};
