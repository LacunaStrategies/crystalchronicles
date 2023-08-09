import { NextRequestWithAuth, withAuth } from "next-auth/middleware"

export default withAuth(
    // middleware is triggered AFTER callbacks, allowing for additional authentication logic after the callbacks have been completed
    function middleware(req: NextRequestWithAuth) {},
    {
        callbacks: {
            authorized: (params) => {
                let { token } = params
                return !!token
            }
        },
        pages: {
            signIn: '/sign-in',
        },
    }
)

// This middleware will only restrict paths defined in the matcher array below
export const config = { matcher: ["/app/:path*"] }