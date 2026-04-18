import { Button, Card, Badge } from '@/components/ui'

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="text-center py-16 space-y-4">
        <Badge color="blue" className="text-sm px-3 py-1">⚡ React + TypeScript + Tailwind</Badge>
        <h1 className="text-5xl font-bold text-gray-900">
          Your next project <br />
          <span className="text-primary-600">starts here</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          A production-ready template with best-practice folder structure, reusable components,
          Axios setup, and React Router — pull & go.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="secondary">View Docs</Button>
        </div>
      </section>

      {/* Feature Cards */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">What's included</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <Card key={f.title} className="hover:shadow-md transition-shadow duration-200">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.description}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    icon: '⚛️',
    title: 'React 18 + TypeScript',
    description: 'Strict TypeScript config, path aliases (@/), and React 18 with concurrent features.',
  },
  {
    icon: '🎨',
    title: 'Tailwind CSS',
    description: 'Utility-first styling with custom design tokens, reusable component classes.',
  },
  {
    icon: '🛣️',
    title: 'React Router v6',
    description: 'File-based layout routing with nested routes and a 404 fallback.',
  },
  {
    icon: '📡',
    title: 'Axios + Interceptors',
    description: 'Pre-configured Axios instance with auth token injection and 401 handling.',
  },
  {
    icon: '🪝',
    title: 'Custom Hooks',
    description: 'useFetch, useLocalStorage, useDebounce — ready to use out of the box.',
  },
  {
    icon: '🧩',
    title: 'UI Components',
    description: 'Button, Input, Card, Badge, Spinner — typed, variant-aware, accessible.',
  },
]
