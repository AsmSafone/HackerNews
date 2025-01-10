import React, { useEffect, useState, useCallback, useRef } from 'react';
import { getTopStories } from './api/hackerNews';
import { SearchBar } from './components/SearchBar';
import { StoryCard } from './components/StoryCard';
import { StorySkeleton } from './components/StorySkeleton';
import { MatrixBackground } from './components/MatrixBackground';
import { ThemeToggle } from './components/ThemeToggle';
import { Footer } from './components/Footer';
import { ArrowUp } from 'lucide-react';
import type { HNStory } from './api/types';

export default function App() {
  const [stories, setStories] = useState<HNStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [page, setPage] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    async function fetchStories() {
      setLoading(true);
      try {
        const results = await getTopStories(debouncedQuery, 0);
        setStories(results);
        setPage(0);
      } catch (error) {
        console.error('Failed to fetch stories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStories();
  }, [debouncedQuery]);

  const loadMoreStories = useCallback(async () => {
    if (loadingMore) return;
    
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const moreStories = await getTopStories(debouncedQuery, nextPage);
      setStories(prev => [...prev, ...moreStories]);
      setPage(nextPage);
    } catch (error) {
      console.error('Failed to load more stories:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [page, debouncedQuery, loadingMore]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 400;
      setShowScrollTop(scrolled);

      // Check if we're near the bottom
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500;
      if (nearBottom && !loading && !loadingMore) {
        loadMoreStories();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, loadingMore, loadMoreStories]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <MatrixBackground />
      <ThemeToggle />
      <div className="min-h-screen p-4 md:p-8">
        <header className="max-w-5xl mx-auto mb-8">
          <h1 className="text-2xl md:text-4xl mb-6 overflow-hidden">
            <span className="typing-animation inline-block">_ Hacker News Terminal</span>
          </h1>
          <div className="typing-animation-delayed">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </header>

        <main className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <StorySkeleton key={`loading-${index}`} />
                ))
              : stories.map((story) => (
                  <StoryCard key={`story-${story.id}`} story={story} />
                ))}
            {loadingMore && (
              <>
                <StorySkeleton key="loading-more-1" />
                <StorySkeleton key="loading-more-2" />
              </>
            )}
          </div>
        </main>
        <Footer />

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 p-3 matrix-bg rounded-full shadow-lg transition-transform hover:scale-110 scroll-to-top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </div>
    </>
  );
}