import { useTheme } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import BlogPost from "@/components/BlogPost";

interface BlogPostData {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  views: number;
  tags: string[];
}

interface PostViewProps {
  post: BlogPostData;
  onBack?: () => void;
}

export default function PostView({ post, onBack }: PostViewProps) {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleTheme={handleThemeToggle} isDark={theme === "dark"} />
      <BlogPost post={post} onBack={onBack} />
    </div>
  );
}