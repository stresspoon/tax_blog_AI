import AIContentGenerator from '../AIContentGenerator';

export default function AIContentGeneratorExample() {
  const handleContentGenerated = (content: any) => {
    console.log('AI 콘텐츠 생성됨:', content);
  };

  return (
    <div className="max-w-2xl">
      <h3 className="font-semibold mb-4">AI 콘텐츠 생성기</h3>
      <AIContentGenerator onContentGenerated={handleContentGenerated} />
    </div>
  );
}