import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateBlogContent } from "./lib/openai";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

// AI content generation request schema
const aiGenerateRequestSchema = z.object({
  topic: z.string().min(1, "주제를 입력해주세요"),
  category: z.string().optional().default("세무회계"),
  tone: z.enum(["professional", "friendly", "authoritative", "conversational"]).optional().default("professional"),
  targetWordCount: z.number().min(500).max(3000).optional().default(1900),
  scheduleFor: z.string().optional(), // ISO date string for scheduling
  saveAsDraft: z.boolean().optional().default(false),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple test endpoint
  app.get("/api", (req: Request, res: Response) => {
    res.json({ message: "API is working", timestamp: new Date().toISOString() });
  });

  // AI Content Generation endpoint
  app.post("/api/ai/generate", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validationResult = aiGenerateRequestSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          error: "Invalid request data",
          details: fromZodError(validationResult.error).toString()
        });
      }

      const { topic, category, tone, targetWordCount, scheduleFor, saveAsDraft } = validationResult.data;

      // Get active SEO guidelines
      const guidelines = await storage.getActiveSeoGuideline();
      const seoGuidelines = guidelines?.guidelines;

      console.log(`Generating AI content for topic: "${topic}"`);

      // Generate content using OpenAI
      const generatedContent = await generateBlogContent({
        topic,
        category,
        tone,
        targetWordCount,
        seoGuidelines
      });

      console.log(`Content generated successfully. Word count: ${generatedContent.wordCount}`);

      // Create slug from title
      const slug = generatedContent.title
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 100);

      // Prepare post data
      const postData = {
        title: generatedContent.title,
        content: generatedContent.content,
        excerpt: generatedContent.excerpt,
        slug: `${slug}-${Date.now()}`, // Add timestamp to ensure uniqueness
        category,
        tags: [category, topic].filter(Boolean),
        main_keyword: topic,
        seo_title: generatedContent.title,
        seo_description: generatedContent.excerpt,
        ai_generated: true,
        ai_prompt: `Topic: ${topic}, Category: ${category}, Tone: ${tone}, Target word count: ${targetWordCount}`,
        author_id: null, // Will need to be set by authentication later
        published: false,
      };

      // Save content based on user choice
      if (scheduleFor) {
        // Schedule for future publication
        const scheduledPost = await storage.createScheduledPost({
          ...postData,
          scheduled_for: new Date(scheduleFor),
        });
        
        res.json({
          success: true,
          type: "scheduled",
          id: scheduledPost.id,
          content: generatedContent,
          scheduledFor: scheduleFor,
          message: `콘텐츠가 ${new Date(scheduleFor).toLocaleString('ko-KR')}에 자동 발행되도록 예약되었습니다.`
        });
      } else if (saveAsDraft) {
        // Save as draft (unpublished post)
        const post = await storage.createPost(postData);
        
        res.json({
          success: true,
          type: "draft",
          id: post.id,
          content: generatedContent,
          message: "콘텐츠가 초안으로 저장되었습니다. 관리자 패널에서 검토 후 발행할 수 있습니다."
        });
      } else {
        // Just return the generated content without saving
        res.json({
          success: true,
          type: "preview",
          content: generatedContent,
          postData, // Include post data for potential saving
          message: "콘텐츠가 성공적으로 생성되었습니다."
        });
      }

    } catch (error) {
      console.error("AI content generation error:", error);
      
      res.status(500).json({
        error: "Failed to generate content",
        message: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
        details: process.env.NODE_ENV === "development" ? error : undefined
      });
    }
  });

  // Get SEO guidelines endpoint
  app.get("/api/seo/guidelines", async (req: Request, res: Response) => {
    try {
      const guidelines = await storage.getAllSeoGuidelines();
      res.json({ success: true, guidelines });
    } catch (error) {
      console.error("Failed to get SEO guidelines:", error);
      res.status(500).json({
        error: "Failed to get SEO guidelines",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Get active SEO guideline endpoint
  app.get("/api/seo/guidelines/active", async (req: Request, res: Response) => {
    try {
      const guideline = await storage.getActiveSeoGuideline();
      res.json({ success: true, guideline });
    } catch (error) {
      console.error("Failed to get active SEO guideline:", error);
      res.status(500).json({
        error: "Failed to get active SEO guideline",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Test OpenAI connection endpoint (dev only)
  if (process.env.NODE_ENV === "development") {
    app.get("/api/ai/test", async (req: Request, res: Response) => {
      try {
        const { testConnection } = await import("./lib/openai");
        const isConnected = await testConnection();
        
        res.json({
          success: true,
          connected: isConnected,
          message: isConnected ? "OpenAI 연결이 정상입니다." : "OpenAI 연결에 문제가 있습니다."
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          connected: false,
          message: "OpenAI 연결 테스트 중 오류가 발생했습니다.",
          error: error instanceof Error ? error.message : "Unknown error"
        });
      }
    });
  }

  // API catch-all: return JSON 404 for any unmatched /api routes
  // This prevents Vite from serving HTML for API requests
  app.use("/api", (_req: Request, res: Response) => {
    res.status(404).json({ error: "API endpoint not found" });
  });

  const httpServer = createServer(app);

  return httpServer;
}
