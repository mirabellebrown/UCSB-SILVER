import './globals.css'
import { Analytics } from '@vercel/analytics/react'

export const metadata = {
  title: 'Prereqly | UCSB Academic Planning',
  description:
    'Prereqly is a clickable UCSB Letters & Science planning prototype for course planning, degree progress, important dates, and Campus Q&A with official sources.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
