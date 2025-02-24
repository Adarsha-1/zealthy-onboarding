import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import DataTable from './components/DataTable';
import OnboardingPage from './components/OnbiardingPage';

function App() {
  return (
    <BrowserRouter>
      <div className='app-container'>
        <header className='app-header'>
          <div className='logo'>Zealthy</div>
        </header>
      </div>
      <main className='app-main'>
        <Routes >
          <Route path='/' element={<OnboardingPage />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/data' element={<DataTable />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
