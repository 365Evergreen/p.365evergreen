import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "../layouts/AppShell";

import HomePage from "../pages/HomePage/HomePage";
import BlogPostPage from "../pages/BlogPostPage/BlogPostPage";
import WhatWeDoPage from "../pages/WhatWeDoPage/WhatWeDoPage";
import HowWeDoItPage from "../pages/HowWeDoItPage/HowWeDoItPage";
import LatestPostsPage from "../pages/LatestPostsPage";
import ResourcesPage from "../pages/ResourcesPage/ResourcesPage";

export default function AppRouter() {
  return (
     <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/what-we-do" element={<WhatWeDoPage />} />
          <Route path="/how-we-do-it" element={<HowWeDoItPage />} />
          <Route path="/resources" element={<ResourcesPage />} />   
          <Route path="/blog" element={<LatestPostsPage />} />
          <Route path="/blog/:category" element={<LatestPostsPage />} />
          <Route path="/blog/:category/:slug" element={<BlogPostPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/latest-updates" element={<LatestPostsPage />} />
          <Route path="/latest-updates/:category" element={<LatestPostsPage />} />
          <Route path="/latest-updates/:category/:slug" element={<BlogPostPage />} />
          <Route path="/latest-updates/:slug" element={<BlogPostPage />} />
    
              </Route>
      </Routes>
    </BrowserRouter>
  );
}