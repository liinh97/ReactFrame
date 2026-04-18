export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="container mx-auto px-4 max-w-7xl text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME ?? 'React App'}. All rights reserved.
      </div>
    </footer>
  )
}
