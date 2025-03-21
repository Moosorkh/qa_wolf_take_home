/**
 * @fileoverview Article parsing utilities for HackerNews validation
 * 
 * @author Mehdi Azar
 * @version 1.0.0
 */

/**
 * Extracts article data from HackerNews DOM elements
 * 
 * @function parseArticleElements
 * @param {Array<Element>} elements - DOM elements representing articles
 * @param {number} pageNumber - Current page number being processed
 * @returns {Array<Object>} Parsed article objects with metadata
 */
function parseArticleElements(elements, pageNumber) {
    return elements.map(element => {
      try {
        // Extract article data (move this logic from your main fetchNewestArticles)
        const title = element.querySelector('.titleline a');
        const timeInfo = element.nextElementSibling.querySelector('.age');
        
        if (!timeInfo) return null;
        
        const timestampTitle = timeInfo.getAttribute('title');
        const timestamp = timestampTitle ? new Date(timestampTitle).getTime() : 0;
        
        return {
          id: element.id,
          title: title.textContent.trim(),
          timestamp: timestamp,
          timeDisplay: timeInfo.textContent.trim(),
          pageNum: pageNumber
        };
      } catch (err) {
        console.error('Error parsing article element:', err);
        return null;
      }
    }).filter(Boolean);
  }
  
  /**
   * Formats timestamp for display
   * 
   * @function formatTimestamp
   * @param {number} timestamp - Unix timestamp in milliseconds
   * @returns {string} Formatted date string
   */
  function formatTimestamp(timestamp) {
    return new Date(timestamp).toLocaleString();
  }
  
  module.exports = {
    parseArticleElements,
    formatTimestamp
  };