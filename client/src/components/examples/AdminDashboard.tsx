import AdminDashboard from '../AdminDashboard';

export default function AdminDashboardExample() {
  const handleNavigate = (section: string) => {
    console.log('Navigate to:', section);
  };

  return (
    <div className="p-4">
      <AdminDashboard onNavigate={handleNavigate} />
    </div>
  );
}