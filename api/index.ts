import type { VercelRequest, VercelResponse } from "@vercel/node";
import express, { type Express } from "express";
import { registerRoutes } from "../server/routes";

let cachedApp: Express | null = null;

async function getApp(): Promise<Express> {
  if (cachedApp) return cachedApp;

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // 기존 서버의 API 라우트를 재사용하여 serverless 환경에서 동작
  await registerRoutes(app);

  cachedApp = app;
  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await getApp();
  // Express 앱을 serverless 핸들러로 위임
  return (app as any)(req, res);
}


