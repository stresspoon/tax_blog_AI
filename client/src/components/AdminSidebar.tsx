import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Calendar, 
  BarChart3, 
  Settings, 
  Bot,
  Tags,
  Users
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AdminSidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

export default function AdminSidebar({ activeItem = 'dashboard', onItemClick }: AdminSidebarProps) {
  const menuItems = [
    {
      title: "대시보드",
      icon: LayoutDashboard,
      id: "dashboard",
    },
    {
      title: "글 목록",
      icon: FileText,
      id: "posts",
    },
    {
      title: "새 글 작성",
      icon: PlusCircle,
      id: "new-post",
    },
    {
      title: "AI 콘텐츠 생성",
      icon: Bot,
      id: "ai-content",
    },
    {
      title: "일정 관리",
      icon: Calendar,
      id: "schedule",
    },
    {
      title: "태그 관리",
      icon: Tags,
      id: "tags",
    },
    {
      title: "통계",
      icon: BarChart3,
      id: "analytics",
    },
    {
      title: "사용자",
      icon: Users,
      id: "users",
    },
    {
      title: "설정",
      icon: Settings,
      id: "settings",
    },
  ];

  const handleItemClick = (itemId: string) => {
    onItemClick?.(itemId);
    console.log('Sidebar item clicked:', itemId);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>블로그 관리</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    isActive={activeItem === item.id}
                    data-testid={`sidebar-${item.id}`}
                  >
                    <button 
                      onClick={() => handleItemClick(item.id)}
                      className="flex items-center gap-3 w-full"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}