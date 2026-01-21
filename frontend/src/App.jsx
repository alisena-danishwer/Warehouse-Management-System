import { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import InventoryList from './components/InventoryList';
import InboundForm from './components/InboundForm';
import OutboundForm from './components/OutboundForm';
import ActivityLogs from './components/ActivityLogs';
import Sidebar from './components/Sidebar';
import { UserCircle, Menu } from 'lucide-react'; // Import Menu Icon

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // NEW: State for Mobile Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar with Mobile State */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userRole={userRole} 
        handleLogout={handleLogout}
        isOpen={isSidebarOpen}        // Pass State
        setIsOpen={setIsSidebarOpen}  // Pass Setter
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shadow-sm z-30">
          <div className="flex items-center">
            {/* Hamburger Button (Mobile Only) */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden mr-4 p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <h2 className="text-xl font-bold text-slate-800 capitalize tracking-tight truncate">
              {activeTab.replace('-', ' ')}
            </h2>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden md:flex flex-col items-end mr-2">
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

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 md:p-8">
          <div className="max-w-7xl mx-auto animate-fade-in-up pb-10">
            {activeTab === 'dashboard' && <Dashboard />}
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