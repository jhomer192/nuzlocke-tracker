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
    </HashRouter>
  );
}
