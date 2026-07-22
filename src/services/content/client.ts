/**
 * ============================================================
 * Content Client
 * ============================================================
 *
 * Central entry point for all content retrieval services.
 *
 * Components should import from this file rather than directly
 * from individual services.
 *
 * Example:
 *
 * import { getPostBySlug } from "@/services/content/contentClient";
 *
 */

// Posts
export * from "./posts/service";

// Pages
export * from "./pages/service";

// Navigation
export * from "./navigation/service";

// Categories
export * from "./categories/service";

// Forms
export * from "./forms/service";

// Resources
export * from "./resources/service";

// Future Content Sources
//export * from "./videos/service";
//export * from "./faq/service";
//export * from "./cta/service";
//export * from "./learning/service";