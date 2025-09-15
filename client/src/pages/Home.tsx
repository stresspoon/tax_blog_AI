import { useState } from "react";
import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import CategoryFilter from "@/components/CategoryFilter";
import { useTheme } from "@/components/ThemeProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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

interface HomeProps {
  onPostClick?: (post: BlogPost) => void;
}

export default function Home({ onPostClick }: HomeProps) {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // todo: remove mock functionality
  const featuredPosts: BlogPost[] = [
    {
      id: '1',
      title: '2024년 세무 변경사항 완벽 가이드: 중소기업을 위한 필수 체크리스트',
      excerpt: '2024년 새로 시행되는 세무 규정들을 정리하고, 중소기업이 놓치기 쉬운 주요 변경사항들을 상세히 설명합니다.',
      content: '...',
      author: '김세무',
      publishedAt: '2024.03.15',
      tags: ['세무법규', '중소기업', '법인세'],
      readTime: 8,
      views: 1247,
      featured: true
    },
    {
      id: '2',
      title: 'AI 시대의 세무 회계: 자동화가 바꾸는 업무 환경',
      excerpt: '인공지능과 자동화 기술이 세무 회계 분야에 미치는 영향을 분석하고, 미래 대비 전략을 제시합니다.',
      content: '...',
      author: '이회계',
      publishedAt: '2024.03.12',
      tags: ['AI', '자동화', '미래전략'],
      readTime: 6,
      views: 892,
      featured: true
    }
  ];

  const recentPosts: BlogPost[] = [
    {
      id: '3',
      title: '중소기업 절세 전략 10가지: 놓치기 쉬운 공제 항목들',
      excerpt: '중소기업이 활용할 수 있는 다양한 절세 방법과 세액공제 혜택을 실무 중심으로 설명합니다.',
      content: '...',
      author: '박절세',
      publishedAt: '2024.03.10',
      tags: ['절세', '중소기업', '세액공제'],
      readTime: 5,
      views: 673
    },
    {
      id: '4',
      title: '개인사업자 부가가치세 신고 가이드',
      excerpt: '개인사업자를 위한 부가가치세 신고 절차와 주의사항을 단계별로 안내합니다.',
      content: '...',
      author: '최부가',
      publishedAt: '2024.03.08',
      tags: ['부가가치세', '개인사업자', '신고'],
      readTime: 7,
      views: 541
    },
    {
      id: '5',
      title: '스타트업을 위한 세무 회계 기초',
      excerpt: '창업 초기 스타트업이 알아야 할 필수 세무 지식과 회계 관리 방법을 소개합니다.',
      content: '...',
      author: '정스타',
      publishedAt: '2024.03.05',
      tags: ['스타트업', '창업', '회계기초'],
      readTime: 9,
      views: 1123
    },
    {
      id: '6',
      title: '연말정산 체크리스트: 놓치지 말아야 할 항목들',
      excerpt: '연말정산 시 꼭 확인해야 할 항목들과 최대한 환급받는 방법을 알려드립니다.',
      content: '...',
      author: '한연말',
      publishedAt: '2024.03.03',
      tags: ['연말정산', '환급', '소득공제'],
      readTime: 6,
      views: 856
    }
  ];

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("검색 실행:", searchQuery);
  };

  const handlePostClick = (post: BlogPost) => {
    onPostClick?.(post);
    console.log("게시물 클릭:", post.title);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleTheme={handleThemeToggle} isDark={theme === "dark"} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              천지세무법인 TNC
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              최신 세무 법규부터 실무 팁까지, 신뢰할 수 있는 세무회계 전문 블로그
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="궁금한 세무 정보를 검색하세요..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-base"
                  data-testid="input-hero-search"
                />
              </div>
            </form>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" data-testid="button-mobile-filter">
                  <Filter className="h-4 w-4 mr-2" />
                  필터
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <CategoryFilter
                  selectedCategories={selectedCategories}
                  selectedTags={selectedTags}
                  onCategoryChange={setSelectedCategories}
                  onTagChange={setSelectedTags}
                  onClear={handleClearFilters}
                />
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-24">
              <CategoryFilter
                selectedCategories={selectedCategories}
                selectedTags={selectedTags}
                onCategoryChange={setSelectedCategories}
                onTagChange={setSelectedTags}
                onClear={handleClearFilters}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Featured Posts */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">추천 게시물</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    variant="featured"
                    onClick={handlePostClick}
                  />
                ))}
              </div>
            </section>

            {/* Recent Posts */}
            <section>
              <h2 className="text-2xl font-bold mb-6">최신 게시물</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {recentPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    onClick={handlePostClick}
                  />
                ))}
              </div>
            </section>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" data-testid="button-load-more">
                더 많은 게시물 보기
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}