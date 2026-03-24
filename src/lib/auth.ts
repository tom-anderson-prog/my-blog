import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

export const auth = betterAuth({
  // 配置数据库和prisma适配器
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // 启用github账号的支持
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  // 配置密钥
  secret: process.env.BETTER_AUTH_SECRET,
});

export type SessionType = typeof auth.$Infer.Session;