export const formatReadTime = (content: string) => {
  const wordsPerMinute = 200;
  const wordCount = content?.split(/\s+/).length || 0;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
};
