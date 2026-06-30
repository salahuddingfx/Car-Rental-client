import { motion } from 'framer-motion';

export const DashboardUsers = () => {
  const users = [
    { name: 'James Harrison', role: 'Renter', email: 'james@luxury.com', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150' },
    { name: 'Seraphina Vance', role: 'Host', email: 'seraphina@aether.com', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' },
    { name: 'Prestige Group', role: 'Host', email: 'prestige@rentals.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150' },
    { name: 'Vincenzo Bianchi', role: 'Host', email: 'vincenzo@example.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' },
    { name: 'Aero Rentals', role: 'Host', email: 'aero@rentals.com', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150' },
    { name: 'Dieter K.', role: 'Host', email: 'dieter@example.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-neutral-200/60 shadow-sm p-5 rounded-2xl">
      <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest border-b border-neutral-100 pb-3 mb-4">Users & Hosts</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {users.map((u, i) => (
          <div key={i} className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
            <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-bold text-neutral-800">{u.name}</p>
              <p className="text-[10px] text-neutral-500">{u.email}</p>
              <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${u.role === 'Host' ? 'bg-accent-amber/10 text-accent-amber' : 'bg-accent-blue/10 text-accent-blue'}`}>{u.role}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
