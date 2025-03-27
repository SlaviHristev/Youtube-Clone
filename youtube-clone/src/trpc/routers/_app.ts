import { categoriesRouter } from "@/app/modules/categories/server/precedures";
import { createTRPCRouter } from "../init";
import { StudioRouter } from "@/app/modules/studio/server/procedures";
import { videosRouter } from "@/app/modules/videos/server/procedures";
export const appRouter = createTRPCRouter({
  studio: StudioRouter,
  videos: videosRouter,
  categories: categoriesRouter,
});

export type AppRouter = typeof appRouter;
