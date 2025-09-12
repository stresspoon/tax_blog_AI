import Header from '../Header';
import { useState } from 'react';

export default function HeaderExample() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    console.log('Theme toggled to:', !isDark ? 'dark' : 'light');
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4">공개 블로그 헤더</h3>
        <Header onToggleTheme={toggleTheme} isDark={isDark} />
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">관리자 대시보드 헤더</h3>
        <Header isAdmin={true} onToggleTheme={toggleTheme} isDark={isDark} />
      </div>
    </div>
  );
}