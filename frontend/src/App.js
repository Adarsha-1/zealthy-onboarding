import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OnboardingWizard from './components/OnboardingWizard';
import AdminPanel from './components/AdminPanel';
import DataTable from './components/DataTable';

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path='/' element={<OnboardingWizard />} />
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='/data' element={<DataTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
