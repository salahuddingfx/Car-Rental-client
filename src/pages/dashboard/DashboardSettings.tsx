import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { User, Car, Shield, DollarSign } from 'lucide-react';

export const DashboardSettings = () => {
  const { user } = useStore();
  const userRole = user?.role || 'user';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-neutral-200/60 shadow-sm p-5 sm:p-6 rounded-2xl">
      <h3 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest border-b border-neutral-100 pb-3 mb-5">Profile Settings</h3>
      <div className="space-y-4 max-w-md">
        {[
          { label: 'Full Name', value: user?.name },
          { label: 'Email', value: user?.email },
        ].map((f) => (
          <div key={f.label}>
            <label className="text-[10px] text-neutral-400 font-display uppercase tracking-widest mb-1 block">{f.label}</label>
            <input type="text" defaultValue={f.value}
              className="w-full bg-white border border-neutral-200 text-sm text-neutral-800 p-3 rounded-xl outline-none focus:border-accent-blue transition-colors" />
          </div>
        ))}
        <Button variant="primary" size="sm" className="rounded-xl">Save Changes</Button>
      </div>

      <div className="mt-8 pt-6 border-t border-neutral-100">
        <h4 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest mb-4">
          {userRole === 'host' ? 'Account Details' : 'Driving License'}
        </h4>
        {userRole === 'host' ? (
          <div className="p-4 bg-amber-50/50 border border-amber-200/40 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={16} className="text-accent-amber" />
              <span className="text-sm font-semibold text-neutral-800">Balance: ৳{user?.balance || 0}</span>
            </div>
            <p className="text-xs text-neutral-500">Track your earnings and payouts from the Earnings tab.</p>
          </div>
        ) : user?.drivingLicense ? (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={16} className="text-green-600" />
              <span className="text-sm font-semibold text-green-800">License Verified & Cleared</span>
            </div>
            <p className="text-xs text-green-600">#{user.drivingLicense.licenseNumber} · Expires {user.drivingLicense.expiryDate}</p>
          </div>
        ) : (
          <p className="text-sm text-neutral-500">No license on file.</p>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-neutral-100">
        <h4 className="font-display text-xs font-bold text-neutral-800 uppercase tracking-widest mb-4">Portal Access</h4>
        <div className="flex flex-wrap gap-3">
          {[
            { role: 'user' as const, label: 'Client Portal', desc: 'Browse & rent vehicles', icon: User },
            { role: 'host' as const, label: 'Driver Portal', desc: 'List & manage your cars', icon: Car },
            { role: 'company' as const, label: 'Company Admin', desc: 'Full platform management', icon: Shield },
          ].map(p => (
            <button key={p.role} onClick={() => {
              useStore.setState({ user: user ? { ...user, role: p.role } : null });
            }}
              className={`flex items-center gap-3 p-3 border rounded-xl transition-all cursor-pointer text-left ${userRole === p.role ? 'border-accent-blue bg-accent-blue/5' : 'border-neutral-200 hover:border-neutral-300 bg-white'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${userRole === p.role ? 'bg-accent-blue text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                <p.icon size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-800">{p.label}</p>
                <p className="text-[10px] text-neutral-500">{p.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
