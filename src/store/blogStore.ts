import { create } from "zustand";

export interface Blog {
  id: string;
  title: string;
  synopsis: string;
  content: string;
  featuredImageUrl: string;
  dateCreated: string;
  lastUpdated: string;
  isDeleted: boolean;
  authorId: string;
  authorName: string;
}

interface BlogState {
  selectedBlog: Blog | null;
  setSelectedBlog: (blog: Blog | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  selectedBlog: null,
  setSelectedBlog: (blog) => set({ selectedBlog: blog }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedCategory: "all",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
