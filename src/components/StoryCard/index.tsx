import React, { useState, useEffect } from 'react';
import { ExternalLink, MessageSquare, ThumbsUp, Loader2, Clock } from 'lucide-react';
import { formatTimestamp } from '../../utils/date';
import { Modal } from '../Modal';
import { fetchPreview } from '../../api/hackerNews';
import type { HNStory } from '../../api/types';

interface StoryCardProps {
  story: HNStory;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [preview, setPreview] = useState<{
    title?: string;
    description?: string;
    image?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isPreviewOpen && !preview.description) {
      setLoading(true);
      fetchPreview(story.url)
        .then(setPreview)
        .finally(() => setLoading(false));
    }
  }, [isPreviewOpen, story.url, preview.description]);

  return (
    <>
      <div className="matrix-bg p-4 rounded">
        <h2 className="text-xl mb-4">{story.title}</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              {story.score}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              {story.descendants || 0}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatTimestamp(story.time)}
            </span>
          </div>
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="hack-button inline-flex items-center gap-2 px-3 py-1 rounded text-sm"
          >
            Hack <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
        <div className="space-y-3 md:space-y-4">
          <h2 className="text-xl md:text-2xl">{story.title}</h2>
          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm opacity-80">
            <span>By {story.by}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatTimestamp(story.time)}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" /> {story.score}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" /> {story.descendants || 0}
            </span>
          </div>
          <div className="py-2 md:py-4">
            {loading ? (
              <div className="flex items-center justify-center h-[150px] md:h-[200px]">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {preview.image && (
                  <div className="relative">
                    <img
                      src={preview.image}
                      alt={preview.title || story.title}
                      className="w-full h-[200px] md:h-[300px] object-contain bg-black/50 rounded"
                    />
                    {preview.image.includes('screenshot=true') && (
                      <div className="absolute bottom-2 right-2 text-xs opacity-70 bg-black/50 px-2 py-1 rounded">
                        Screenshot Preview
                      </div>
                    )}
                  </div>
                )}
                {preview.description && (
                  <p className="text-base md:text-lg leading-relaxed opacity-90 max-h-[150px] md:max-h-none overflow-y-auto">
                    {preview.description}
                  </p>
                )}
                {!preview.description && !preview.image && (
                  <p className="text-base md:text-lg opacity-70 text-center py-4 md:py-8">
                    Preview not available for this content.
                    Please click "Read More" to view the full article.
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-end pt-2">
            <a
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hack-button inline-flex items-center gap-2 px-4 py-2 rounded text-sm"
            >
              Read More <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};