import { useState } from "react";
import { Link, useLocation } from "react-router";
import { 
  Users, 
  FileText, 
  Settings, 
  Bell,
  Search,
  PieChart,
  Home,
  CreditCard,
  MessageSquare,
  HelpCircle,
  MoreHorizontal,
  Sparkles
} from "lucide-react";
import { Outlet } from "react-router";
import { motion, AnimatePresence } from "motion/react";

export function Layout() {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: CreditCard, label: "Surveillance", path: "/investments" },
    { icon: Sparkles, label: "Intelligence", path: "/intelligence" },
    { icon: Users, label: "Vendors", path: "/vendors" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden flex-col md:flex-row">
      {/* Sidebar - Desktop Only */}
      <aside className="w-20 border-r border-[#E4EEF0] flex-col items-center py-8 bg-white hidden md:flex h-full shrink-0">
        <div className="mb-12">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 115 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M51.7148 0C59.715 4.61889 67.1491 10.0821 73.9023 16.2725C72.55 16.1118 71.1994 16.0262 69.8506 16.0156C63.6525 15.9669 58.0346 17.4726 52.9971 20.5322C47.9603 23.5007 43.9167 27.616 40.8672 32.8789C37.8184 38.0508 36.2684 43.9187 36.2168 50.4814C36.1659 56.953 37.6235 62.844 40.5898 68.1543C43.5562 73.4646 47.6248 77.6901 52.7959 80.8301C57.8758 83.9692 63.5149 85.5625 69.7129 85.6113C75.8199 85.6594 81.2546 84.2893 86.0166 81.501C90.7786 78.7126 94.5454 75.005 97.3164 70.3779C99.997 65.6589 101.36 60.4735 101.404 54.8223C101.41 54.0364 101.394 53.2838 101.359 52.5645C110.216 70.1515 114.852 89.5989 114.852 109.356H43.1553V89.5713H0.000976562L51.7148 0ZM70.3896 34.3418C73.5799 34.3669 76.4912 35.1195 79.123 36.5986C81.6645 37.9859 83.6547 39.9162 85.0938 42.3887C86.5327 44.8611 87.2399 47.6927 87.2148 50.8828C87.1904 53.9816 86.4392 56.8013 84.9609 59.3418C83.4825 61.8825 81.4611 63.8722 78.8975 65.3105C76.3345 66.6577 73.4122 67.3188 70.1309 67.293C66.7583 67.2664 63.8012 66.5592 61.2598 65.1719C58.7191 63.6934 56.7291 61.7176 55.29 59.2451C53.7607 56.6808 53.0081 53.8034 53.0332 50.6133C53.0583 47.4232 53.856 44.604 55.4248 42.1553C56.9025 39.7058 58.9226 37.8071 61.4854 36.46C64.0489 35.0217 67.0173 34.3153 70.3896 34.3418Z" fill="#FF5B04"/>
            </svg>
          </div>
        </div>

        <nav className="flex-1 space-y-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                location.pathname === item.path
                  ? "bg-[#075056] text-white"
                  : "text-[#075056]/40 hover:bg-[#F8FAFC] hover:text-[#075056]"
              }`}
            >
              <item.icon size={22} strokeWidth={1.5} />
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-6">
          <Link to="/settings" className="w-12 h-12 rounded-full flex items-center justify-center text-[#075056]/40 hover:bg-[#F8FAFC] hover:text-[#075056]">
            <HelpCircle size={22} strokeWidth={1.5} />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-4 md:px-12 bg-white/40 backdrop-blur-md shrink-0 z-[100] border-b md:border-b-0 border-[#E4EEF0]">
          {/* Brand/Mobile Title */}
          <div className="flex items-center space-x-4">
            <div className="md:hidden w-8 h-8 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 115 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M51.7148 0C59.715 4.61889 67.1491 10.0821 73.9023 16.2725C72.55 16.1118 71.1994 16.0262 69.8506 16.0156C63.6525 15.9669 58.0346 17.4726 52.9971 20.5322C47.9603 23.5007 43.9167 27.616 40.8672 32.8789C37.8184 38.0508 36.2684 43.9187 36.2168 50.4814C36.1659 56.953 37.6235 62.844 40.5898 68.1543C43.5562 73.4646 47.6248 77.6901 52.7959 80.8301C57.8758 83.9692 63.5149 85.5625 69.7129 85.6113C75.8199 85.6594 81.2546 84.2893 86.0166 81.501C90.7786 78.7126 94.5454 75.005 97.3164 70.3779C99.997 65.6589 101.36 60.4735 101.404 54.8223C101.41 54.0364 101.394 53.2838 101.359 52.5645C110.216 70.1515 114.852 89.5989 114.852 109.356H43.1553V89.5713H0.000976562L51.7148 0ZM70.3896 34.3418C73.5799 34.3669 76.4912 35.1195 79.123 36.5986C81.6645 37.9859 83.6547 39.9162 85.0938 42.3887C86.5327 44.8611 87.2399 47.6927 87.2148 50.8828C87.1904 53.9816 86.4392 56.8013 84.9609 59.3418C83.4825 61.8825 81.4611 63.8722 78.8975 65.3105C76.3345 66.6577 73.4122 67.3188 70.1309 67.293C66.7583 67.2664 63.8012 66.5592 61.2598 65.1719C58.7191 63.6934 56.7291 61.7176 55.29 59.2451C53.7607 56.6808 53.0081 53.8034 53.0332 50.6133C53.0583 47.4232 53.856 44.604 55.4248 42.1553C56.9025 39.7058 58.9226 37.8071 61.4854 36.46C64.0489 35.0217 67.0173 34.3153 70.3896 34.3418Z" fill="#FF5B04"/>
              </svg>
            </div>
            <div className="flex items-center space-x-2 text-[10px] md:text-xs text-[#075056]/40 uppercase tracking-widest font-bold overflow-hidden">
              <Home size={14} className="shrink-0" />
              <span className="hidden sm:inline">Home</span>
              <span className="opacity-20 mx-2">/</span>
              <span className="text-[#075056] truncate">{location.pathname === "/" ? "Dashboard" : location.pathname.split("/")[1]}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 md:space-x-8">
            <div className="hidden lg:flex items-center space-x-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden -ml-2 first:ml-0 bg-[#E4EEF0]">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-[#075056] text-white text-[10px] flex items-center justify-center -ml-2">
                +6
              </div>
            </div>
            
            <Link to="/vendors" className="hidden sm:flex items-center space-x-2 text-[10px] md:text-xs text-[#075056]/60 bg-white px-3 md:px-4 py-2 rounded-full border border-[#E4EEF0] hover:border-[#075056] transition-colors">
              <span>+ Add Manager</span>
            </Link>
            
            <div className="flex items-center space-x-2 md:space-x-4 relative">
              <button 
                onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
                className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors ${showNotifications ? 'bg-[#075056] text-white' : 'text-[#075056] hover:bg-white'}`}
              >
                <Bell size={18} md:size={20} strokeWidth={1.5} />
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-4 w-72 md:w-80 bg-white border border-[#E4EEF0] rounded-[24px] md:rounded-[32px] p-4 md:p-6 shadow-xl z-[110] space-y-4"
                  >
                    <h4 className="text-xs md:text-sm font-medium text-[#075056]">System Alerts</h4>
                    <div className="space-y-3">
                      {[
                        "New high-risk vendor flagged in Varanasi.",
                        "Liquidity pool expansion authorized.",
                        "Security audit report is ready."
                      ].map((n, i) => (
                        <div key={i} className="p-3 bg-[#F8FAFC] rounded-2xl text-[9px] md:text-[10px] text-[#075056]/60 leading-relaxed border border-[#E4EEF0]">
                          {n}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <div 
                  onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
                  className={`w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border cursor-pointer hover:border-[#075056] transition-all ${showProfile ? 'border-[#075056] ring-2 ring-[#075056]/10' : 'border-[#E4EEF0]'}`}
                >
                  <img src="https://i.pravatar.cc/100?img=12" alt="Profile" />
                </div>
                
                <AnimatePresence>
                  {showProfile && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-4 w-40 md:w-48 bg-[#075056] text-white rounded-[20px] md:rounded-[24px] p-2 shadow-xl z-[110]"
                    >
                      <Link to="/settings" onClick={() => setShowProfile(false)} className="block px-4 py-3 text-[10px] md:text-xs hover:bg-white/10 rounded-xl">Control Center</Link>
                      <Link to="/settings" onClick={() => setShowProfile(false)} className="block px-4 py-3 text-[10px] md:text-xs hover:bg-white/10 rounded-xl">Surveillance Logs</Link>
                      <div className="h-[1px] bg-white/10 my-1 mx-2"></div>
                      <button className="w-full text-left px-4 py-3 text-[10px] md:text-xs text-[#FF5B04] hover:bg-white/5 rounded-xl">Log Out</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-12 pb-24 md:pb-12">
          <Outlet />
        </div>

        {/* Mobile Bottom Navigation - Tablet & Mobile Only */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#E4EEF0] flex items-center justify-around px-4 z-[100] backdrop-blur-md bg-white/80">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center space-y-1 transition-all ${
                location.pathname === item.path
                  ? "text-[#075056]"
                  : "text-[#075056]/30"
              }`}
            >
              <item.icon size={20} strokeWidth={location.pathname === item.path ? 2 : 1.5} />
              <span className="text-[8px] font-bold uppercase tracking-tighter">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
