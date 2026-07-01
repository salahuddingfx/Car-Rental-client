interface DashboardHeaderProps {
  userRole: string;
}

export const DashboardHeader = ({ userRole }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">
          {userRole === 'host' ? 'Manage your listings and earnings' :
           userRole === 'company' ? 'Full platform management' :
           'Manage your bookings and profile'}
        </p>
      </div>
    </div>
  );
};
