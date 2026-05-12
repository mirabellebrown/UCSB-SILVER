import './globals.css'

export const metadata = {
  title: 'Prereqly | UCSB Academic Planning',
  description:
    'Prereqly is a clickable UCSB academic planning prototype for course planning, degree progress, important dates, and financial aid.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
