import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import AdminSidebar from "@/components/AdminSidebar";
import AdminDashboard from "@/components/AdminDashboard";
import AIContentGenerator from "@/components/AIContentGenerator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSidebarNavigation = (section: string) => {
    setActiveSection(section);
    console.log("관리자 섹션으로 이동:", section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard onNavigate={handleSidebarNavigation} />;
      
      case "ai-content":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-6">AI 콘텐츠 생성</h1>
            <AIContentGenerator />
          </div>
        );
      
      case "posts":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-6">게시물 관리</h1>
            <Card>
              <CardHeader>
                <CardTitle>게시물 목록</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">게시물 관리 기능이 여기에 표시됩니다.</p>
              </CardContent>
            </Card>
          </div>
        );
      
      case "new-post":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-6">새 글 작성</h1>
            <Card>
              <CardHeader>
                <CardTitle>글 작성 에디터</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">리치 텍스트 에디터가 여기에 표시됩니다.</p>
              </CardContent>
            </Card>
          </div>
        );
      
      case "schedule":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-6">일정 관리</h1>
            <Card>
              <CardHeader>
                <CardTitle>발행 일정</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">게시물 일정 관리 기능이 여기에 표시됩니다.</p>
              </CardContent>
            </Card>
          </div>
        );
      
      case "analytics":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-6">통계 및 분석</h1>
            <Card>
              <CardHeader>
                <CardTitle>블로그 통계</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">상세 통계 차트와 분석 데이터가 여기에 표시됩니다.</p>
              </CardContent>
            </Card>
          </div>
        );
      
      case "tags":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-6">태그 관리</h1>
            <Card>
              <CardHeader>
                <CardTitle>태그 목록</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">태그 생성, 수정, 삭제 기능이 여기에 표시됩니다.</p>
              </CardContent>
            </Card>
          </div>
        );
      
      case "users":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-6">사용자 관리</h1>
            <Card>
              <CardHeader>
                <CardTitle>사용자 목록</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">사용자 관리 및 권한 설정이 여기에 표시됩니다.</p>
              </CardContent>
            </Card>
          </div>
        );
      
      case "settings":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-6">시스템 설정</h1>
            <Card>
              <CardHeader>
                <CardTitle>블로그 설정</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">사이트 설정, SEO 옵션, AI 설정 등이 여기에 표시됩니다.</p>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return <AdminDashboard onNavigate={handleSidebarNavigation} />;
    }
  };

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AdminSidebar activeItem={activeSection} onItemClick={handleSidebarNavigation} />
        
        <div className="flex flex-col flex-1">
          <Header 
            isAdmin={true} 
            onToggleTheme={handleThemeToggle} 
            isDark={theme === "dark"}
          />
          
          <main className="flex-1 overflow-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}