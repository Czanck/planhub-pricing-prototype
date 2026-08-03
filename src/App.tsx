import { Navigate, Route, Routes } from 'react-router-dom'
import { DemoStateProvider } from './context/DemoStateContext'
import { AppShell } from './layout/AppShell'
import { StartScreen } from './pages/StartScreen'
import { WelcomeMigration } from './pages/WelcomeMigration'
import { ProjectFinder } from './pages/ProjectFinder'
import { ProjectPage } from './pages/ProjectPage'
import { MembershipPage } from './pages/MembershipPage'
import { PurchaseConfirm } from './pages/PurchaseConfirm'
import { UnlockedProjects } from './pages/UnlockedProjects'
import { DashboardStub } from './pages/DashboardStub'

export default function App() {
  return (
    <DemoStateProvider>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/welcome" element={<WelcomeMigration />} />
        <Route element={<AppShell />}>
          <Route path="/finder" element={<ProjectFinder />} />
          <Route path="/project/:projectId" element={<ProjectPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/purchase" element={<PurchaseConfirm />} />
          <Route path="/unlocked" element={<UnlockedProjects />} />
          <Route path="/dashboard" element={<DashboardStub />} />
        </Route>
        <Route path="*" element={<Navigate to="/finder" replace />} />
      </Routes>
    </DemoStateProvider>
  )
}
