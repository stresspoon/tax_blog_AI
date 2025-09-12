import { useState } from "react";
import { Bot, Wand2, FileText, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AIContentGeneratorProps {
  onContentGenerated?: (content: { title: string; content: string; tags: string[] }) => void;
}

export default function AIContentGenerator({ onContentGenerated }: AIContentGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [keywords, setKeywords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const contentTypes = [
    { value: "tax-guide", label: "세무 가이드" },
    { value: "accounting-tips", label: "회계 팁" },
    { value: "law-updates", label: "법규 업데이트" },
    { value: "case-study", label: "사례 연구" },
    { value: "faq", label: "자주 묻는 질문" },
  ];

  const audiences = [
    { value: "small-business", label: "중소기업" },
    { value: "individual", label: "개인사업자" },
    { value: "corporation", label: "법인" },
    { value: "startup", label: "스타트업" },
    { value: "general", label: "일반인" },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim() || !contentType || !targetAudience) return;

    setIsGenerating(true);
    console.log("AI 콘텐츠 생성 시작:", {
      prompt,
      contentType,
      targetAudience,
      keywords
    });

    // todo: remove mock functionality - simulate AI generation
    setTimeout(() => {
      const mockContent = {
        title: `${contentTypes.find(t => t.value === contentType)?.label}: ${prompt.slice(0, 50)}...`,
        content: `# ${prompt}

이 글은 AI가 생성한 ${audiences.find(a => a.value === targetAudience)?.label}을 위한 ${contentTypes.find(t => t.value === contentType)?.label} 콘텐츠입니다.

## 주요 내용

${prompt}에 대한 상세한 설명과 실용적인 조언을 제공합니다.

### 핵심 포인트
- 실무에 바로 적용 가능한 정보
- 최신 법규와 규정 반영
- 단계별 실행 가이드

### 결론
${targetAudience === 'small-business' ? '중소기업' : audiences.find(a => a.value === targetAudience)?.label}의 성공적인 세무 관리를 위한 핵심 사항들을 정리했습니다.`,
        tags: keywords.split(',').map(k => k.trim()).filter(Boolean).concat(['AI생성', contentTypes.find(t => t.value === contentType)?.label || ''])
      };

      setGeneratedContent(mockContent);
      onContentGenerated?.(mockContent);
      setIsGenerating(false);
    }, 2000);
  };

  const handleUseContent = () => {
    console.log("생성된 콘텐츠 사용:", generatedContent);
    // Reset form
    setPrompt("");
    setContentType("");
    setTargetAudience("");
    setKeywords("");
    setGeneratedContent(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI 콘텐츠 생성기
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">주제 또는 요청사항</Label>
            <Textarea
              id="prompt"
              placeholder="예: 2024년 중소기업 세무 혜택에 대한 가이드를 작성해주세요"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              data-testid="textarea-ai-prompt"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>콘텐츠 유형</Label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger data-testid="select-content-type">
                  <SelectValue placeholder="유형 선택" />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>대상 독자</Label>
              <Select value={targetAudience} onValueChange={setTargetAudience}>
                <SelectTrigger data-testid="select-target-audience">
                  <SelectValue placeholder="독자 선택" />
                </SelectTrigger>
                <SelectContent>
                  {audiences.map((audience) => (
                    <SelectItem key={audience.value} value={audience.value}>
                      {audience.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">키워드 (쉼표로 구분)</Label>
            <Input
              id="keywords"
              placeholder="세무, 절세, 신고, 공제"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              data-testid="input-keywords"
            />
          </div>

          <Button 
            onClick={handleGenerate}
            disabled={!prompt.trim() || !contentType || !targetAudience || isGenerating}
            className="w-full"
            data-testid="button-generate-content"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                AI가 콘텐츠를 생성하는 중...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                콘텐츠 생성하기
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedContent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              생성된 콘텐츠
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">{generatedContent.title}</h3>
              <div className="flex flex-wrap gap-1 mb-4">
                {generatedContent.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-md max-h-64 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm font-mono">
                {generatedContent.content}
              </pre>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleUseContent} data-testid="button-use-content">
                콘텐츠 사용하기
              </Button>
              <Button variant="outline" onClick={() => handleGenerate()} data-testid="button-regenerate">
                다시 생성하기
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}