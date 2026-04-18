import { Card } from '@/components/ui'

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">About</h1>
      <Card>
        <p className="text-gray-600 leading-relaxed">
          This is the About page. Replace this content with your own. The layout, Navbar, and Footer
          are automatically applied via <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">MainLayout</code>.
        </p>
      </Card>
    </div>
  )
}
