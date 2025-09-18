import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Index from "./pages/Index.jsx";
import StorePage from "./pages/StorePage.jsx";
import StoresPage from "./pages/StoresPage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import DealsPage from "./pages/DealsPage.jsx";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import React from 'react';
import { useCategories } from './hooks/useAPI';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/stores" element={<StoresPage />} />
              <Route path="/store/:storeId" element={<StorePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/deals" element={<DealsPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
