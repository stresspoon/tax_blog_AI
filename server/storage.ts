import { 
  users, 
  posts, 
  scheduledPosts, 
  seoGuidelines, 
  aiContentTemplates, 
  bulkContentJobs,
  type User, 
  type InsertUser,
  type Post,
  type InsertPost,
  type ScheduledPost,
  type InsertScheduledPost,
  type SeoGuideline,
  type InsertSeoGuideline,
  type AiContentTemplate,
  type InsertAiContentTemplate,
  type BulkContentJob,
  type InsertBulkContentJob
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";
import bcrypt from "bcrypt";

// Storage interface - all CRUD methods for the blog system
export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  validateUserPassword(username: string, password: string): Promise<User | null>;

  // Post operations
  getAllPosts(): Promise<Post[]>;
  getPublishedPosts(): Promise<Post[]>;
  getPostById(id: string): Promise<Post | undefined>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  getPostsByCategory(category: string): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: string, post: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: string): Promise<void>;
  incrementPostViews(id: string): Promise<void>;

  // Scheduled post operations
  getAllScheduledPosts(): Promise<ScheduledPost[]>;
  getScheduledPostById(id: string): Promise<ScheduledPost | undefined>;
  getScheduledPostsDue(): Promise<ScheduledPost[]>;
  createScheduledPost(post: InsertScheduledPost): Promise<ScheduledPost>;
  updateScheduledPost(id: string, post: Partial<InsertScheduledPost>): Promise<ScheduledPost | undefined>;
  deleteScheduledPost(id: string): Promise<void>;
  publishScheduledPost(id: string): Promise<Post>;

  // SEO Guidelines operations
  getAllSeoGuidelines(): Promise<SeoGuideline[]>;
  getActiveSeoGuideline(): Promise<SeoGuideline | undefined>;
  getSeoGuidelineById(id: string): Promise<SeoGuideline | undefined>;
  createSeoGuideline(guideline: InsertSeoGuideline): Promise<SeoGuideline>;
  updateSeoGuideline(id: string, guideline: Partial<InsertSeoGuideline>): Promise<SeoGuideline | undefined>;
  setActiveSeoGuideline(id: string): Promise<void>;

  // AI Content Template operations
  getAllAiContentTemplates(): Promise<AiContentTemplate[]>;
  getActiveAiContentTemplates(): Promise<AiContentTemplate[]>;
  getAiContentTemplateById(id: string): Promise<AiContentTemplate | undefined>;
  createAiContentTemplate(template: InsertAiContentTemplate): Promise<AiContentTemplate>;
  updateAiContentTemplate(id: string, template: Partial<InsertAiContentTemplate>): Promise<AiContentTemplate | undefined>;

  // Bulk Content Job operations
  getAllBulkContentJobs(): Promise<BulkContentJob[]>;
  getBulkContentJobById(id: string): Promise<BulkContentJob | undefined>;
  createBulkContentJob(job: InsertBulkContentJob): Promise<BulkContentJob>;
  updateBulkContentJob(id: string, job: Partial<InsertBulkContentJob>): Promise<BulkContentJob | undefined>;
  deleteBulkContentJob(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Hash the password before storing
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(insertUser.password, saltRounds);
    
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        password: hashedPassword,
      })
      .returning();
    return user;
  }

  async validateUserPassword(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (!user) {
      return null;
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return null;
    }
    
    return user;
  }

  // Post operations
  async getAllPosts(): Promise<Post[]> {
    return await db.select().from(posts).orderBy(desc(posts.created_at));
  }

  async getPublishedPosts(): Promise<Post[]> {
    return await db
      .select()
      .from(posts)
      .where(eq(posts.published, true))
      .orderBy(desc(posts.published_at));
  }

  async getPostById(id: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post || undefined;
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post || undefined;
  }

  async getPostsByCategory(category: string): Promise<Post[]> {
    return await db
      .select()
      .from(posts)
      .where(and(eq(posts.category, category), eq(posts.published, true)))
      .orderBy(desc(posts.published_at));
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const [post] = await db
      .insert(posts)
      .values(insertPost)
      .returning();
    return post;
  }

  async updatePost(id: string, updatePost: Partial<InsertPost>): Promise<Post | undefined> {
    const [post] = await db
      .update(posts)
      .set({ ...updatePost, updated_at: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return post || undefined;
  }

  async deletePost(id: string): Promise<void> {
    await db.delete(posts).where(eq(posts.id, id));
  }

  async incrementPostViews(id: string): Promise<void> {
    await db
      .update(posts)
      .set({ views: sql`${posts.views} + 1` })
      .where(eq(posts.id, id));
  }

  // Scheduled post operations
  async getAllScheduledPosts(): Promise<ScheduledPost[]> {
    return await db.select().from(scheduledPosts).orderBy(desc(scheduledPosts.created_at));
  }

  async getScheduledPostById(id: string): Promise<ScheduledPost | undefined> {
    const [scheduledPost] = await db.select().from(scheduledPosts).where(eq(scheduledPosts.id, id));
    return scheduledPost || undefined;
  }

  async getScheduledPostsDue(): Promise<ScheduledPost[]> {
    return await db
      .select()
      .from(scheduledPosts)
      .where(sql`${scheduledPosts.scheduled_for} <= NOW()`);
  }

  async createScheduledPost(insertScheduledPost: InsertScheduledPost): Promise<ScheduledPost> {
    const [scheduledPost] = await db
      .insert(scheduledPosts)
      .values(insertScheduledPost)
      .returning();
    return scheduledPost;
  }

  async updateScheduledPost(id: string, updateScheduledPost: Partial<InsertScheduledPost>): Promise<ScheduledPost | undefined> {
    const [scheduledPost] = await db
      .update(scheduledPosts)
      .set(updateScheduledPost)
      .where(eq(scheduledPosts.id, id))
      .returning();
    return scheduledPost || undefined;
  }

  async deleteScheduledPost(id: string): Promise<void> {
    await db.delete(scheduledPosts).where(eq(scheduledPosts.id, id));
  }

  async publishScheduledPost(id: string): Promise<Post> {
    // Use transaction to ensure atomicity and prevent duplicate publishes
    return await db.transaction(async (tx) => {
      // Delete the scheduled post and return it in one atomic operation
      // This ensures only one concurrent transaction can successfully grab the record
      const deletedScheduledPosts = await tx
        .delete(scheduledPosts)
        .where(eq(scheduledPosts.id, id))
        .returning();
        
      if (deletedScheduledPosts.length === 0) {
        throw new Error("예약된 게시물을 찾을 수 없거나 이미 발행되었습니다");
      }
      
      const scheduledPost = deletedScheduledPosts[0];

      // Create the published post from the deleted scheduled post
      const [post] = await tx
        .insert(posts)
        .values({
          title: scheduledPost.title,
          content: scheduledPost.content,
          excerpt: scheduledPost.excerpt,
          slug: scheduledPost.slug,
          category: scheduledPost.category,
          tags: scheduledPost.tags,
          main_keyword: scheduledPost.main_keyword,
          seo_title: scheduledPost.seo_title,
          seo_description: scheduledPost.seo_description,
          author_id: scheduledPost.author_id,
          published: true,
          ai_generated: scheduledPost.ai_generated,
          published_at: new Date(),
        })
        .returning();

      return post;
    });
  }

  // SEO Guidelines operations
  async getAllSeoGuidelines(): Promise<SeoGuideline[]> {
    return await db.select().from(seoGuidelines).orderBy(desc(seoGuidelines.created_at));
  }

  async getActiveSeoGuideline(): Promise<SeoGuideline | undefined> {
    const [guideline] = await db
      .select()
      .from(seoGuidelines)
      .where(eq(seoGuidelines.active, true))
      .orderBy(desc(seoGuidelines.updated_at));
    return guideline || undefined;
  }

  async getSeoGuidelineById(id: string): Promise<SeoGuideline | undefined> {
    const [guideline] = await db.select().from(seoGuidelines).where(eq(seoGuidelines.id, id));
    return guideline || undefined;
  }

  async createSeoGuideline(insertGuideline: InsertSeoGuideline): Promise<SeoGuideline> {
    const [guideline] = await db
      .insert(seoGuidelines)
      .values(insertGuideline)
      .returning();
    return guideline;
  }

  async updateSeoGuideline(id: string, updateGuideline: Partial<InsertSeoGuideline>): Promise<SeoGuideline | undefined> {
    const [guideline] = await db
      .update(seoGuidelines)
      .set({ ...updateGuideline, updated_at: new Date() })
      .where(eq(seoGuidelines.id, id))
      .returning();
    return guideline || undefined;
  }

  async setActiveSeoGuideline(id: string): Promise<void> {
    // Use transaction to ensure atomicity
    await db.transaction(async (tx) => {
      // First, verify the target guideline exists
      const [targetGuideline] = await tx
        .select()
        .from(seoGuidelines)
        .where(eq(seoGuidelines.id, id));
        
      if (!targetGuideline) {
        throw new Error("지정된 SEO 가이드라인을 찾을 수 없습니다");
      }

      // Deactivate all guidelines
      await tx
        .update(seoGuidelines)
        .set({ active: false, updated_at: new Date() });

      // Then activate the specified one
      await tx
        .update(seoGuidelines)
        .set({ active: true, updated_at: new Date() })
        .where(eq(seoGuidelines.id, id));
    });
  }

  // AI Content Template operations
  async getAllAiContentTemplates(): Promise<AiContentTemplate[]> {
    return await db.select().from(aiContentTemplates).orderBy(desc(aiContentTemplates.created_at));
  }

  async getActiveAiContentTemplates(): Promise<AiContentTemplate[]> {
    return await db
      .select()
      .from(aiContentTemplates)
      .where(eq(aiContentTemplates.active, true))
      .orderBy(desc(aiContentTemplates.created_at));
  }

  async getAiContentTemplateById(id: string): Promise<AiContentTemplate | undefined> {
    const [template] = await db.select().from(aiContentTemplates).where(eq(aiContentTemplates.id, id));
    return template || undefined;
  }

  async createAiContentTemplate(insertTemplate: InsertAiContentTemplate): Promise<AiContentTemplate> {
    const [template] = await db
      .insert(aiContentTemplates)
      .values(insertTemplate)
      .returning();
    return template;
  }

  async updateAiContentTemplate(id: string, updateTemplate: Partial<InsertAiContentTemplate>): Promise<AiContentTemplate | undefined> {
    const [template] = await db
      .update(aiContentTemplates)
      .set(updateTemplate)
      .where(eq(aiContentTemplates.id, id))
      .returning();
    return template || undefined;
  }

  // Bulk Content Job operations
  async getAllBulkContentJobs(): Promise<BulkContentJob[]> {
    return await db.select().from(bulkContentJobs).orderBy(desc(bulkContentJobs.created_at));
  }

  async getBulkContentJobById(id: string): Promise<BulkContentJob | undefined> {
    const [job] = await db.select().from(bulkContentJobs).where(eq(bulkContentJobs.id, id));
    return job || undefined;
  }

  async createBulkContentJob(insertJob: InsertBulkContentJob): Promise<BulkContentJob> {
    const [job] = await db
      .insert(bulkContentJobs)
      .values(insertJob)
      .returning();
    return job;
  }

  async updateBulkContentJob(id: string, updateJob: Partial<InsertBulkContentJob>): Promise<BulkContentJob | undefined> {
    const [job] = await db
      .update(bulkContentJobs)
      .set(updateJob)
      .where(eq(bulkContentJobs.id, id))
      .returning();
    return job || undefined;
  }

  async deleteBulkContentJob(id: string): Promise<void> {
    await db.delete(bulkContentJobs).where(eq(bulkContentJobs.id, id));
  }
}

export const storage = new DatabaseStorage();