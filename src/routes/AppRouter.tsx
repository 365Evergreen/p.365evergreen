import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "../layouts/AppShell";

import HomePage from "../pages/HomePage/HomePage";
import BlogPostPage from "../pages/BlogPostPage/BlogPostPage";
import LatestPostsPage from "../pages/LatestPostsPage";
import TestPage from "../pages/TestPage/TestPage";
import DynamicPage from "../pages/DynamicPage";

export default function AppRouter() {
  return (
     <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/blog" element={<LatestPostsPage />} />
          <Route path="/blog/:category" element={<LatestPostsPage />} />
          <Route path="/blog/:category/:slug" element={<BlogPostPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/latest-updates" element={<LatestPostsPage />} />
          <Route path="/latest-updates/:category" element={<LatestPostsPage />} />
          <Route path="/latest-updates/:category/:slug" element={<BlogPostPage />} />
          <Route path="/latest-updates/:slug" element={<BlogPostPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<DynamicPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}