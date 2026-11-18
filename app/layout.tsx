import type { Metadata, Viewport } from 'next'
import './globals.css'
export const metadata: Metadata = { title: 'Sonora — Explora tu música', description: 'Descubre álbumes esenciales y organiza tus canciones y favoritos en Sonora.' }
export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#111111' }
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="es" className="dark"><body className="antialiased">{children}</body></html> }
