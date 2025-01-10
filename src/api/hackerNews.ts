import { HN_API_BASE_URL, ITEMS_PER_PAGE } from './constants';
import type { HNStory } from './types';

async function fetchItem(id: number): Promise<HNStory> {
  try {
    const response = await fetch(`${HN_API_BASE_URL}/item/${id}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch item ${id}:`, error);
    throw error;
  }
}

async function fetchPreview(url: string): Promise<{ title?: string; description?: string; image?: string }> {
  try {
    const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    if (!data.data?.image?.url) {
      const screenshotResponse = await fetch(
        `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false`
      );
      const screenshotData = await screenshotResponse.json();
      
      return {
        title: data.data?.title,
        description: data.data?.description,
        image: screenshotData.data?.screenshot?.url
      };
    }
    
    return {
      title: data.data?.title,
      description: data.data?.description,
      image: data.data?.image?.url
    };
  } catch (error) {
    console.error('Failed to fetch preview:', error);
    return {};
  }
}

export async function getTopStories(query: string = '', page: number = 0): Promise<HNStory[]> {
  try {
    const response = await fetch(`${HN_API_BASE_URL}/topstories.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const ids = await response.json();
    
    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    
    // Filter out duplicate IDs before fetching
    const uniqueIds = [...new Set(ids.slice(start, end))];
    
    const storyPromises = uniqueIds.map((id: unknown) => fetchItem(id as number));
    
    const stories = await Promise.all(storyPromises);
    
    return stories
      .filter(story => story && story.title && // Filter out null or invalid stories
        (!query || story.title.toLowerCase().includes(query.toLowerCase())))
      .filter(story => story.url);
  } catch (error) {
    console.error('Failed to fetch top stories:', error);
    return []; // Return empty array instead of throwing
  }
}

export { fetchPreview };