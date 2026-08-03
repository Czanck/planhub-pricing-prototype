import { Link } from 'react-router-dom'
import { IconArrowRight } from '../components/icons'

export function DashboardStub() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 max-w-prose text-muted">
        This area isn&rsquo;t part of the pricing test. Head to the Project Finder to explore
        projects and try unlocking one.
      </p>
      <Link
        to="/finder"
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-white hover:bg-teal-dark"
      >
        Go to Project Finder <IconArrowRight className="text-[15px]" />
      </Link>
    </div>
  )
}
