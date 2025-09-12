import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table - 관리자 사용자
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Posts table - 공개된 블로그 게시물
export const posts = pgTable("posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"), // 요약
  slug: text("slug").notNull().unique(), // URL 경로
  category: text("category").notNull().default("general"),
  tags: text("tags").array().default([]), // 태그 배열
  main_keyword: text("main_keyword"), // 메인 키워드
  seo_title: text("seo_title"),
  seo_description: text("seo_description"),
  author_id: varchar("author_id").references(() => users.id),
  published: boolean("published").default(false),
  featured: boolean("featured").default(false),
  ai_generated: boolean("ai_generated").default(false),
  views: integer("views").default(0),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  published_at: timestamp("published_at"),
});

// Scheduled posts table - 예약 발행 대기 중인 게시물
export const scheduledPosts = pgTable("scheduled_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  slug: text("slug").notNull(),
  category: text("category").notNull().default("general"),
  tags: text("tags").array().default([]),
  main_keyword: text("main_keyword"),
  seo_title: text("seo_title"),
  seo_description: text("seo_description"),
  author_id: varchar("author_id").references(() => users.id),
  scheduled_for: timestamp("scheduled_for").notNull(), // 예약 발행 시간
  ai_generated: boolean("ai_generated").default(false),
  ai_prompt: text("ai_prompt"), // AI 생성 시 사용된 프롬프트
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// SEO Guidelines table - SEO 가이드라인 저장
export const seoGuidelines = pgTable("seo_guidelines", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(), // 가이드라인 이름
  description: text("description"), // 설명
  guidelines: text("guidelines").notNull(), // 가이드라인 전문
  version: text("version").default("1.0"),
  active: boolean("active").default(true),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// AI Content Templates - AI 콘텐츠 생성 템플릿
export const aiContentTemplates = pgTable("ai_content_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(), // 템플릿 이름
  content_type: text("content_type").notNull(), // 콘텐츠 유형 (accounting-tips, tax-news, etc.)
  target_audience: text("target_audience").notNull(), // 대상 독자 (individual, corporation, etc.)
  prompt_template: text("prompt_template").notNull(), // AI 프롬프트 템플릿
  example_keywords: text("example_keywords").array().default([]), // 예시 키워드들
  active: boolean("active").default(true),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Bulk Content Generation - 대량 콘텐츠 생성 작업
export const bulkContentJobs = pgTable("bulk_content_jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(), // 작업 이름
  template_id: varchar("template_id").references(() => aiContentTemplates.id),
  guideline_id: varchar("guideline_id").references(() => seoGuidelines.id),
  topics: jsonb("topics").notNull(), // JSON 형태의 주제 목록
  status: text("status").notNull().default("pending"), // pending, processing, completed, failed
  progress: integer("progress").default(0), // 진행률 (0-100)
  total_items: integer("total_items").notNull(),
  completed_items: integer("completed_items").default(0),
  failed_items: integer("failed_items").default(0),
  results: jsonb("results").default({}), // 결과 데이터
  error_log: text("error_log"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  completed_at: timestamp("completed_at"),
});

// Relations
export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  scheduledPosts: many(scheduledPosts),
}));

export const postRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.author_id],
    references: [users.id],
  }),
}));

export const scheduledPostRelations = relations(scheduledPosts, ({ one }) => ({
  author: one(users, {
    fields: [scheduledPosts.author_id],
    references: [users.id],
  }),
}));

export const bulkContentJobRelations = relations(bulkContentJobs, ({ one }) => ({
  template: one(aiContentTemplates, {
    fields: [bulkContentJobs.template_id],
    references: [aiContentTemplates.id],
  }),
  guideline: one(seoGuidelines, {
    fields: [bulkContentJobs.guideline_id],
    references: [seoGuidelines.id],
  }),
}));

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  created_at: true,
  updated_at: true,
  views: true,
});

export const insertScheduledPostSchema = createInsertSchema(scheduledPosts).omit({
  id: true,
  created_at: true,
});

export const insertSeoGuidelineSchema = createInsertSchema(seoGuidelines).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertAiContentTemplateSchema = createInsertSchema(aiContentTemplates).omit({
  id: true,
  created_at: true,
});

export const insertBulkContentJobSchema = createInsertSchema(bulkContentJobs).omit({
  id: true,
  created_at: true,
  completed_at: true,
  progress: true,
  completed_items: true,
  failed_items: true,
  results: true,
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Post = typeof posts.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;

export type ScheduledPost = typeof scheduledPosts.$inferSelect;
export type InsertScheduledPost = z.infer<typeof insertScheduledPostSchema>;

export type SeoGuideline = typeof seoGuidelines.$inferSelect;
export type InsertSeoGuideline = z.infer<typeof insertSeoGuidelineSchema>;

export type AiContentTemplate = typeof aiContentTemplates.$inferSelect;
export type InsertAiContentTemplate = z.infer<typeof insertAiContentTemplateSchema>;

export type BulkContentJob = typeof bulkContentJobs.$inferSelect;
export type InsertBulkContentJob = z.infer<typeof insertBulkContentJobSchema>;