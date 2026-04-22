import { 
  FileText, 
  Download, 
  TrendingUp, 
  ArrowRight, 
  PieChart as PieIcon, 
  BarChart as BarIcon,
  Calendar
} from "lucide-react";
import { motion } from "motion/react";

export function Reports() {
  const reports = [
    { title: "Financial Overview", date: "April 2026", size: "2.4 MB", type: "PDF" },
    { title: "Risk Mitigation Q1", date: "March 2026", size: "1.1 MB", type: "XLS" },
    { title: "Distribution Matrix", date: "April 2026", size: "850 KB", type: "PDF" },
    { title: "Impact Statement 2025", date: "Dec 2025", size: "5.2 MB", type: "PDF" },
  ];

  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="border border-[#F1F5F9] rounded-[2rem] p-10 space-y-10">
          <div className="space-y-4">
            <h3 className="text-3xl font-normal tracking-tight leading-tight">Generate platform performance report.</h3>
            <p className="text-sm text-[#16232B] leading-relaxed max-w-sm">
              Consolidated data across all sectors, investment cycles, and local vendor activities.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-[#FF5B04] text-white text-xs rounded-xl hover:opacity-90 transition-all">
              Initialize
            </button>
            <button className="px-8 py-3 border border-[#F1F5F9] text-[#075056] text-xs rounded-xl hover:bg-[#F8FAFC] transition-all">
              Archive
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <ReportModule icon={PieIcon} label="Market" />
          <ReportModule icon={BarIcon} label="Growth" />
          <ReportModule icon={TrendingUp} label="ROI" />
          <ReportModule icon={FileText} label="Compliance" />
        </div>
      </div>

      <div className="space-y-10">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-lg font-normal tracking-tight">Recent Exports</h3>
          <button className="text-[11px] uppercase tracking-widest text-[#16232B] flex items-center gap-2">
            <Calendar size={14} strokeWidth={1.5} /> Date filter
          </button>
        </div>
        <div className="divide-y divide-[#F1F5F9]">
          {reports.map((report, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="py-8 flex items-center justify-between group hover:bg-[#F8FAFC]/30 transition-colors"
            >
              <div className="flex items-center gap-8">
                <div className="w-12 h-12 rounded-xl border border-[#F1F5F9] flex items-center justify-center text-[#075056]">
                  <FileText size={20} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-normal text-[#075056]">{report.title}</h4>
                  <p className="text-[11px] text-[#16232B]">{report.date} • {report.size}</p>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full border border-[#F1F5F9] flex items-center justify-center text-[#075056] hover:bg-[#075056] hover:text-white transition-all">
                <Download size={16} strokeWidth={1.5} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportModule({ icon: Icon, label }: any) {
  return (
    <button className="aspect-square border border-[#F1F5F9] rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-[#FF5B04] transition-all group">
      <div className="w-12 h-12 rounded-2xl border border-[#F1F5F9] flex items-center justify-center group-hover:bg-[#F8FAFC]">
        <Icon size={24} strokeWidth={1.5} className="text-[#075056] group-hover:text-[#FF5B04] transition-colors" />
      </div>
      <span className="text-[10px] uppercase tracking-widest text-[#16232B] group-hover:text-[#075056] transition-colors">{label}</span>
    </button>
  );
}
