import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  HelpCircle,
  LogOut,
  ChevronRight,
  Lock,
  Smartphone
} from "lucide-react";
import { motion } from "motion/react";
import { useStakeholder } from "../context";

export function Settings() {
  const { stakeholder } = useStakeholder();

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Personal Information", desc: "Update your name, email, and phone" },
        { icon: Lock, label: "Security & Password", desc: "Manage your credentials and 2FA" },
        { icon: Shield, label: "Verification Status", desc: "Check your KYC and business status" },
      ]
    },
    {
      title: "Platform",
      items: [
        { icon: Bell, label: "Notifications", desc: "Manage alerts and marketing emails" },
        { icon: Palette, label: "Appearance", desc: "Toggle dark mode and accent colors" },
        { icon: Globe, label: "Region & Currency", desc: "Set your local language and display" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: Smartphone, label: "Connected Devices", desc: "Manage sessions on other devices" },
        { icon: HelpCircle, label: "Help Center", desc: "Find answers and contact support" },
      ]
    }
  ];

  return (
    <div className={`${stakeholder !== 'admin' ? 'space-y-6 pt-2' : 'max-w-4xl space-y-8'}`}>
      <h2 className="text-2xl font-bold">Settings</h2>

      <div className="space-y-8">
        {settingsGroups.map((group) => (
          <div key={group.title} className="space-y-4">
            <h3 className="text-xs font-bold text-[#4a5a63] uppercase tracking-widest pl-2">{group.title}</h3>
            <div className="bg-white rounded-[2rem] border border-[#075056]/5 shadow-sm overflow-hidden">
              {group.items.map((item, i) => (
                <button 
                  key={item.label}
                  className={`w-full flex items-center justify-between p-6 hover:bg-[#E4EEF0]/30 transition-colors ${
                    i !== group.items.length - 1 ? 'border-b border-[#075056]/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-6 text-left">
                    <div className="w-12 h-12 rounded-2xl bg-[#E4EEF0] flex items-center justify-center text-[#16232B]">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold">{item.label}</h4>
                      <p className="text-xs text-[#4a5a63]">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-[#4a5a63]" />
                </button>
              ))}
            </div>
          </div>
        ))}

        <button className="w-full flex items-center justify-center gap-2 p-6 rounded-[2rem] text-rose-600 font-bold bg-rose-50 hover:bg-rose-100 transition-colors">
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
