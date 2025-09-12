import BlogCard from '../BlogCard';

export default function BlogCardExample() {
  // todo: remove mock functionality
  const samplePost = {
    id: '1',
    title: '2024년 세무 변경사항 완벽 가이드: 중소기업을 위한 필수 체크리스트',
    excerpt: '2024년 새로 시행되는 세무 규정들을 정리하고, 중소기업이 놓치기 쉬운 주요 변경사항들을 상세히 설명합니다. 법인세, 부가가치세, 원천징수 등 핵심 영역별로 준비해야 할 사항들을 알아보세요.',
    content: '...',
    author: '김세무',
    publishedAt: '2024.03.15',
    tags: ['세무법규', '중소기업', '법인세', '2024년 변경사항'],
    readTime: 8,
    views: 1247,
    featured: false
  };

  const featuredPost = {
    ...samplePost,
    id: '2',
    title: 'AI 시대의 세무 회계: 자동화가 바꾸는 업무 환경',
    excerpt: '인공지능과 자동화 기술이 세무 회계 분야에 미치는 영향을 분석하고, 미래 대비 전략을 제시합니다.',
    views: 2156,
    featured: true,
    tags: ['AI', '자동화', '미래전략', '디지털세무']
  };

  const handleCardClick = (post: any) => {
    console.log('블로그 카드 클릭:', post.title);
  };

  return (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="font-semibold mb-4">일반 블로그 카드</h3>
        <BlogCard post={samplePost} onClick={handleCardClick} />
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">추천 블로그 카드</h3>
        <BlogCard post={featuredPost} variant="featured" onClick={handleCardClick} />
      </div>
    </div>
  );
}