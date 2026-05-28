import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const SPIRITUAL_ROUTES = ['/sakhi', '/auth', '/admin']
const TECHNICAL_ROUTES = ['/about', '/projects', '/research', '/writing', '/contact']

function isSpiritualRoute(path: string) {
  return SPIRITUAL_ROUTES.some(r => path === r || path.startsWith(r + '/'))
}

function isTechnicalRoute(path: string) {
  return TECHNICAL_ROUTES.some(r => path === r || path.startsWith(r + '/'))
}

export async function proxy(request: NextRequest) {
  const { pathname, origin } = new URL(request.url)
  const mode = request.cookies.get('site-mode')?.value ?? 'technical'

  // Block spiritual routes when in technical mode
  if (mode === 'technical' && isSpiritualRoute(pathname)) {
    return NextResponse.redirect(`${origin}/`)
  }

  // Block technical routes when in spiritual mode
  if (mode === 'spiritual' && isTechnicalRoute(pathname)) {
    return NextResponse.redirect(`${origin}/sakhi`)
  }

  // Refresh Supabase auth session
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  await supabase.auth.getUser()
  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
