export { default } from 'next-auth/middleware'

//export const config = { matcher: ['/CreateUser', '/Member'] }
export const config = {
  matcher: ['/dashboard', '/profile', '/create-question'],
}
