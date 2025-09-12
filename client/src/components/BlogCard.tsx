import { Calendar, User, Tag, Eye } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured';
  onClick?: (post: BlogPost) => void;
}

export default function BlogCard({ post, variant = 'default', onClick }: BlogCardProps) {
  const handleClick = () => {
    onClick?.(post);
    console.log('블로그 게시물 클릭:', post.title);
  };

  return (
    <Card className={`hover-elevate cursor-pointer transition-all ${variant === 'featured' ? 'border-primary/20' : ''}`} onClick={handleClick} data-testid={`card-blog-${post.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">
            {post.title}
          </h3>
          {variant === 'featured' && (
            <Badge variant="default" className="shrink-0">
              추천
            </Badge>
          )}
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-3 mt-2">
          {post.excerpt}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{post.publishedAt}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{post.views.toLocaleString()}</span>
          </div>
          <span>읽기 {post.readTime}분</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                <Tag className="h-2 w-2 mr-1" />
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
          
          <Button variant="ghost" size="sm" data-testid={`button-read-${post.id}`}>
            읽기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}