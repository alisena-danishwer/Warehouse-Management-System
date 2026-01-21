import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import InventoryList from './components/InventoryList';
import InboundForm from './components/InboundForm';
import OutboundForm from './components/OutboundForm';
import ActivityLogs from './components/ActivityLogs';
import Sidebar from './components/Sidebar'; // Import the new Sidebar
import { UserCircle } from 'lucide-react';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (role, user) => {
    setToken(localStorage.getItem('token'));
    setUserRole(role);
    setUsername(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    setToken(null);
    setUserRole(null);
    setUsername(null);
    setActiveTab('dashboard');
  };

  if (!token) return <Login onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userRole={userRole} 
        handleLogout={handleLogout} 
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 transition-all duration-300">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-between shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 capitalize tracking-tight">
            {activeTab.replace('-', ' ')} Overview
          </h2>
          
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-end mr-2">
              <span className="text-sm font-bold text-slate-700">{username}</span>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider border border-blue-100">
                {userRole}
              </span>
            </div>
            <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 text-slate-500">
              <UserCircle className="w-6 h-6" />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="p-8 max-w-7xl mx-auto">
          <div className="animate-fade-in-up">
            {activeTab === 'dashboard' && <Dashboard onNavigate={setActiveTab} />}
            {activeTab === 'inventory' && <InventoryList />}
            {activeTab === 'inbound' && <InboundForm />}
            {activeTab === 'outbound' && <OutboundForm />}
            {activeTab === 'logs' && <ActivityLogs />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;