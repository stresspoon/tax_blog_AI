import { ThemeProvider, useTheme } from '../ThemeProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon, Sun, Monitor } from 'lucide-react';

function ThemeToggleButtons() {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>테마 설정</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant={theme === "light" ? "default" : "outline"}
            onClick={() => setTheme("light")}
            data-testid="button-theme-light"
          >
            <Sun className="h-4 w-4 mr-2" />
            밝은 모드
          </Button>
          <Button
            variant={theme === "dark" ? "default" : "outline"}
            onClick={() => setTheme("dark")}
            data-testid="button-theme-dark"
          >
            <Moon className="h-4 w-4 mr-2" />
            어두운 모드
          </Button>
          <Button
            variant={theme === "system" ? "default" : "outline"}
            onClick={() => setTheme("system")}
            data-testid="button-theme-system"
          >
            <Monitor className="h-4 w-4 mr-2" />
            시스템
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          현재 테마: {theme}
        </p>
      </CardContent>
    </Card>
  );
}

export default function ThemeProviderExample() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="p-4">
        <ThemeToggleButtons />
      </div>
    </ThemeProvider>
  );
}