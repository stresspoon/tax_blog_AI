import AdminDashboard from '../AdminDashboard';

export default function AdminDashboardExample() {
  const handleNavigate = (section: string) => {
    console.log('페이지 이동:', section);
  };

  return (
    <div className="p-4">
      <AdminDashboard onNavigate={handleNavigate} />
    </div>
  );
}