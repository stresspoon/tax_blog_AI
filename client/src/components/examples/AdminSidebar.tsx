import AdminSidebar from '../AdminSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useState } from 'react';

export default function AdminSidebarExample() {
  const [activeItem, setActiveItem] = useState('dashboard');

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-96 w-full border rounded-md overflow-hidden">
        <AdminSidebar 
          activeItem={activeItem} 
          onItemClick={setActiveItem}
        />
        <div className="flex-1 p-4 bg-background">
          <h3 className="font-semibold mb-2">선택된 메뉴</h3>
          <p className="text-muted-foreground">{activeItem}</p>
        </div>
      </div>
    </SidebarProvider>
  );
}