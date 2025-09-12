import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  Eye, 
  Calendar,
  Bot,
  PlusCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdminDashboardProps {
  onNavigate?: (section: string) => void;
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  // todo: remove mock functionality
  const stats = {
    totalPosts: 127,
    totalViews: 45623,
    totalUsers: 1834,
    monthlyGrowth: 15.3
  };

  const recentPosts = [
    {
      id: '1',
      title: '2024년 세무 변경사항 완벽 가이드',
      status: 'published',
      views: 1247,
      publishedAt: '2024.03.15'
    },
    {
      id: '2',
      title: 'AI 시대의 세무 회계 동향',
      status: 'draft',
      views: 0,
      publishedAt: null
    },
    {
      id: '3',
      title: '중소기업 절세 전략 10가지',
      status: 'scheduled',
      views: 0,
      publishedAt: '2024.03.20'
    }
  ];

  const upcomingSchedule = [
    {
      id: '1',
      title: '법인세 신고 마감 안내',
      scheduledAt: '2024.03.18 09:00',
      type: 'ai-generated'
    },
    {
      id: '2',
      title: '부가가치세 변경사항 업데이트',
      scheduledAt: '2024.03.22 14:00',
      type: 'manual'
    }
  ];

  const handleQuickAction = (action: string) => {
    console.log('빠른 작업:', action);
    onNavigate?.(action);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="default">발행됨</Badge>;
      case 'draft':
        return <Badge variant="secondary">초안</Badge>;
      case 'scheduled':
        return <Badge variant="outline">예약됨</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">관리자 대시보드</h1>
          <p className="text-muted-foreground">블로그 현황과 주요 지표를 확인하세요</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleQuickAction('new-post')} data-testid="button-new-post">
            <PlusCircle className="h-4 w-4 mr-2" />
            새 글 작성
          </Button>
          <Button variant="outline" onClick={() => handleQuickAction('ai-content')} data-testid="button-ai-content">
            <Bot className="h-4 w-4 mr-2" />
            AI 생성
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 게시물</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              이번 달 +12개
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 조회수</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +{stats.monthlyGrowth}% 증가
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 방문자</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              활성 사용자
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">월간 성장률</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.monthlyGrowth}%</div>
            <p className="text-xs text-muted-foreground">
              지난달 대비
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              최근 게시물
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm line-clamp-1">{post.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(post.status)}
                      {post.publishedAt && (
                        <span className="text-xs text-muted-foreground">{post.publishedAt}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{post.views.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">조회</div>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => handleQuickAction('posts')}
              data-testid="button-view-all-posts"
            >
              모든 게시물 보기
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              예정된 발행
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSchedule.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={item.type === 'ai-generated' ? 'default' : 'secondary'} className="text-xs">
                        {item.type === 'ai-generated' ? 'AI 생성' : '수동 작성'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{item.scheduledAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => handleQuickAction('schedule')}
              data-testid="button-view-schedule"
            >
              일정 관리하기
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}