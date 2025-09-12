import { Calendar, User, Clock, Eye, Tag, Share2, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  views: number;
  tags: string[];
}

interface BlogPostProps {
  post: BlogPost;
  onBack?: () => void;
}

export default function BlogPost({ post, onBack }: BlogPostProps) {
  const handleShare = () => {
    console.log("게시물 공유:", post.title);
  };

  const handleBookmark = () => {
    console.log("게시물 북마크:", post.title);
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        {onBack && (
          <Button variant="ghost" onClick={onBack} className="mb-4" data-testid="button-back">
            ← 목록으로 돌아가기
          </Button>
        )}
        
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
          {post.title}
        </h1>
        
        {/* Meta information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span className="font-medium">{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{post.publishedAt}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>읽기 {post.readTime}분</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{post.views.toLocaleString()} 조회</span>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-sm">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleShare} data-testid="button-share">
            <Share2 className="h-4 w-4 mr-2" />
            공유하기
          </Button>
          <Button variant="outline" size="sm" onClick={handleBookmark} data-testid="button-bookmark">
            <Bookmark className="h-4 w-4 mr-2" />
            북마크
          </Button>
        </div>
        
        <Separator className="mt-6" />
      </header>
      
      {/* Content */}
      <Card>
        <CardContent className="p-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Footer */}
      <footer className="mt-8 pt-6 border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            마지막 업데이트: {post.publishedAt}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShare} data-testid="button-share-footer">
              <Share2 className="h-4 w-4 mr-2" />
              공유
            </Button>
            <Button variant="outline" size="sm" onClick={handleBookmark} data-testid="button-bookmark-footer">
              <Bookmark className="h-4 w-4 mr-2" />
              저장
            </Button>
          </div>
        </div>
      </footer>
    </article>
  );
}