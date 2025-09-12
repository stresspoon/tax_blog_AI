// OpenAI client wrapper for tax accounting blog content generation
import OpenAI from "openai";
import type { ChatCompletionCreateParamsNonStreaming } from "openai/resources/chat/completions";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Default model configuration
const DEFAULT_MODEL = "gpt-4-turbo";
const DEFAULT_TEMPERATURE = 0.7;
const DEFAULT_MAX_TOKENS = 3000; // 충분한 토큰 수 (1,800-2,000자 목표)

export interface GenerateContentOptions {
  topic: string;
  category?: string;
  tone?: "professional" | "friendly" | "authoritative" | "conversational";
  targetWordCount?: number;
  seoGuidelines?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface GeneratedContent {
  title: string;
  content: string;
  excerpt: string;
  wordCount: number;
  model: string;
  completionTokens?: number;
  promptTokens?: number;
  totalTokens?: number;
}

/**
 * Generate blog content using OpenAI GPT models
 */
export async function generateBlogContent(options: GenerateContentOptions): Promise<GeneratedContent> {
  const {
    topic,
    category = "세무회계",
    tone = "professional",
    targetWordCount = 1900, // SEO 가이드라인 목표치
    seoGuidelines,
    model = DEFAULT_MODEL,
    temperature = DEFAULT_TEMPERATURE,
    maxTokens = DEFAULT_MAX_TOKENS
  } = options;

  // Build system message with SEO guidelines
  let systemMessage = `당신은 세무회계 전문가이며 블로그 글을 작성하는 전문 작가입니다. 
다음 조건을 준수하여 ${category} 관련 블로그 글을 작성해주세요:

1. 글의 톤: ${tone === "professional" ? "전문적이고 신뢰할 수 있는" : 
            tone === "friendly" ? "친근하고 이해하기 쉬운" :
            tone === "authoritative" ? "권위 있고 확실한" : 
            "대화하듯 편안한"} 어조를 사용하세요.

2. 글자수: 정확히 ${targetWordCount}자 내외로 작성하세요. (±100자 허용)

3. 구조:
   - 제목: SEO에 최적화된 매력적인 제목 (50자 이내)
   - 본문: 서론, 본론, 결론 구조
   - 발췌문: 글의 핵심을 요약한 150자 내외의 발췌문

4. SEO 최적화:
   - 메인 키워드를 자연스럽게 정확히 5회 사용
   - 부제목 활용 (H2, H3 태그 고려)
   - 독자의 관심을 끄는 후크 활용

5. 전문성: 세무회계 분야의 정확한 정보와 실용적인 조언 포함`;

  if (seoGuidelines) {
    systemMessage += `\n\n6. 추가 SEO 가이드라인:\n${seoGuidelines}`;
  }

  const userMessage = `주제: "${topic}"

위 주제로 ${targetWordCount}자 내외의 세무회계 블로그 글을 작성해주세요. 
응답은 다음 JSON 형식으로 정확히 작성해주세요:

{
  "title": "SEO 최적화된 제목 (50자 이내)",
  "content": "본문 내용 (마크다운 형식, ${targetWordCount}자 내외)",
  "excerpt": "글의 핵심 요약 (150자 내외)"
}`;

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage }
      ],
      temperature,
      max_tokens: maxTokens,
      response_format: { type: "json_object" }
    } as ChatCompletionCreateParamsNonStreaming);

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error("No response from OpenAI");
    }

    // Parse JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response);
    } catch (parseError) {
      throw new Error(`Failed to parse OpenAI response: ${parseError}`);
    }

    const { title, content, excerpt } = parsedResponse;
    
    if (!title || !content || !excerpt) {
      throw new Error("Missing required fields in OpenAI response");
    }

    // Calculate word count (한글 기준)
    const wordCount = content.length;

    return {
      title: title.trim(),
      content: content.trim(),
      excerpt: excerpt.trim(),
      wordCount,
      model: completion.model,
      completionTokens: completion.usage?.completion_tokens,
      promptTokens: completion.usage?.prompt_tokens,
      totalTokens: completion.usage?.total_tokens
    };

  } catch (error) {
    console.error("OpenAI content generation error:", error);
    
    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        throw new Error("OpenAI API 키가 유효하지 않습니다.");
      } else if (error.message.includes("rate limit")) {
        throw new Error("API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.");
      } else if (error.message.includes("insufficient_quota")) {
        throw new Error("OpenAI 크레딧이 부족합니다.");
      }
    }
    
    throw new Error(`콘텐츠 생성 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
}

/**
 * Test OpenAI connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "테스트" }],
      max_tokens: 10
    });

    return response.choices.length > 0;
  } catch (error) {
    console.error("OpenAI connection test failed:", error);
    return false;
  }
}

export { openai };