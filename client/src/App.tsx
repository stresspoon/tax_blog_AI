import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Home from "@/pages/Home";
import PostView from "@/pages/PostView";
import AdminPage from "@/pages/AdminPage";
import NotFound from "@/pages/not-found";
import { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  readTime: number;
  views: number;
  featured?: boolean;
}

function Router() {
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

  // todo: remove mock functionality
  const sampleDetailedPost: BlogPost = {
    id: '1',
    title: '2024년 세무 변경사항 완벽 가이드: 중소기업을 위한 필수 체크리스트',
    excerpt: '2024년 새로 시행되는 세무 규정들을 정리하고, 중소기업이 놓치기 쉬운 주요 변경사항들을 상세히 설명합니다.',
    content: `# 2024년 세무 변경사항 개요

2024년에는 중소기업을 위한 다양한 세무 혜택과 규정 변경이 있었습니다. 이 가이드에서는 주요 변경사항들을 체계적으로 정리하여 실무에 바로 적용할 수 있도록 도와드리겠습니다.

## 주요 변경사항

### 1. 법인세 관련 변경사항

#### 중소기업 특별세액감면 확대
- 적용 대상: 중소기업 (매출액 400억원 미만)
- 감면율: 10% → 15%로 확대
- 적용기간: 2024.1.1 ~ 2026.12.31

#### 연구개발비 세액공제 강화
연구개발비에 대한 세액공제율이 다음과 같이 조정되었습니다:

- 일반 중소기업: 25% → 30%
- 벤처기업: 30% → 35%
- 첨단기술 분야: 추가 5% 가산

### 2. 부가가치세 변경사항

#### 간이과세 기준금액 상향조정
- 기존: 4,800만원
- 변경: 8,000만원
- 적용시기: 2024년 1월 1일부터

이로 인해 더 많은 소상공인들이 간이과세 혜택을 받을 수 있게 되었습니다.

### 3. 원천징수 관련 변경사항

#### 근로소득 간이세액표 개정
월급여 구간별 원천징수세액이 조정되어 근로자의 세부담이 경감되었습니다.

## 중소기업 체크리스트

### 즉시 확인해야 할 사항
1. [ ] 우리 회사 매출액이 간이과세 기준에 해당하는지 확인
2. [ ] R&D 투자 계획이 있다면 세액공제 혜택 검토
3. [ ] 기존 세무 신고 프로세스 점검 및 업데이트

### 3월까지 준비해야 할 사항
1. [ ] 2023년 법인세 신고 시 새로운 공제항목 적용
2. [ ] 회계시스템 업데이트 (새로운 세율 반영)
3. [ ] 세무대리인과 변경사항 논의

## 실무 적용 가이드

### 세액공제 신청 방법
1. 국세청 홈택스 접속
2. 법인 → 신고/납부 → 법인세 신고
3. 해당 공제항목에 필요 서류 첨부
4. 온라인 제출 또는 세무서 방문 제출

### 필요 서류
- 연구개발비 계산서
- 관련 계약서 사본
- 지출증빙 서류

## 주의사항

⚠️ **중요**: 모든 변경사항은 2024년 1월 1일부터 적용되므로, 기존 계약이나 시스템을 점검하여 필요한 조치를 취하시기 바랍니다.

⚠️ **세무 신고 시**: 새로운 양식과 기준을 적용해야 하므로 세무 전문가와 상담을 권장합니다.

## 마무리

2024년 세무 변경사항들은 전반적으로 중소기업에게 유리한 방향으로 개정되었습니다. 하지만 복잡한 세법의 특성상 전문가의 도움을 받아 정확한 적용을 하시기 바랍니다.

추가 문의사항이 있으시면 언제든지 연락주시기 바랍니다.`,
    author: '김세무',
    publishedAt: '2024.03.15',
    readTime: 8,
    views: 1247,
    tags: ['세무법규', '중소기업', '법인세', '2024년 변경사항', '세액공제']
  };

  const handlePostClick = (post: BlogPost) => {
    setCurrentPost(post);
    console.log('게시물로 이동:', post.title);
  };

  return (
    <Switch>
      <Route path="/" component={() => <Home onPostClick={handlePostClick} />} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/post/:id">
        {currentPost ? (
          <PostView post={currentPost} onBack={() => window.history.back()} />
        ) : (
          <PostView post={sampleDetailedPost} onBack={() => window.history.back()} />
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="tax-blog-theme">
        <TooltipProvider>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Router />
            <Toaster />
            
            {/* Demo Navigation - todo: remove mock functionality */}
            <div className="fixed bottom-4 right-4 flex gap-2 z-50">
              <button
                onClick={() => window.location.href = '/'}
                className="bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium hover-elevate"
                data-testid="button-demo-home"
              >
                공개 블로그
              </button>
              <button
                onClick={() => window.location.href = '/admin'}
                className="bg-secondary text-secondary-foreground px-3 py-2 rounded-md text-sm font-medium hover-elevate"
                data-testid="button-demo-admin"
              >
                관리자 패널
              </button>
            </div>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}