#!/usr/bin/env tsx

// Script to test OpenAI API integration
import OpenAI from "openai";

async function testOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error("❌ OPENAI_API_KEY not found in environment variables");
    process.exit(1);
  }

  console.log("🔑 OpenAI API Key found");

  try {
    const openai = new OpenAI({
      apiKey: apiKey,
    });

    console.log("🤖 Testing OpenAI API connection...");

    // Test with a simple prompt
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "user",
          content: "안녕하세요! 간단한 테스트 메시지입니다. '테스트 성공'이라고 답해주세요."
        }
      ],
      max_tokens: 50,
      temperature: 0.1,
    });

    console.log("✅ OpenAI API 연결 성공!");
    console.log("모델:", completion.model);
    console.log("응답:", completion.choices[0]?.message?.content);
    
    // Test model availability
    console.log("\n📋 사용 가능한 모델 확인 중...");
    const models = await openai.models.list();
    const gptModels = models.data.filter(model => model.id.includes('gpt-4'));
    
    console.log("사용 가능한 GPT-4 모델들:");
    gptModels.forEach(model => {
      console.log(`- ${model.id}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ OpenAI API 테스트 실패:", error);
    
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }
    
    process.exit(1);
  }
}

testOpenAI();