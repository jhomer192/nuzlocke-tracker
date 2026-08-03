import { HashRouter, Routes, Route } from 'react-router-dom';
import { useRuns } from './hooks/useRuns';
import { RunList } from './pages/RunList';
import { RunDashboard } from './pages/RunDashboard';

export default function App() {
  const { runs, createRun, deleteRun, updateRun } = useRuns();

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RunList
              runs={runs}
              onCreateRun={createRun}
              onDeleteRun={deleteRun}
            />
          }
        />
        <Route
          path="/run/:id"
          element={
            <RunDashboard
              runs={runs}
              onUpdate={updateRun}
            />
          }
        />
      </Routes>

      <footer
        className="max-w-2xl mx-auto px-4 pb-8 pt-4 text-center text-xs"
        style={{ color: 'var(--text-dim)' }}
      >
        Built by{' '}
        <a href="https://jackhomer.com" className="underline">
          Jack Homer
        </a>
        {' · '}
        <a href="https://jackhomer.com/projects/nuzlocke/" className="underline">
          Project write-up
        </a>
      </footer>
    </HashRouter>
  );
}
