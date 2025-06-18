export const metadata = {
  title: 'AI Affiliate Frontend',
  description: 'AI-powered affiliate marketing platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}
