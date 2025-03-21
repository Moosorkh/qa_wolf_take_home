/**
 * @fileoverview Configuration for HackerNews validation tests
 * 
 * @author Mehdi Azar
 * @version 1.0.0
 */

/**
 * Configuration object for the HackerNews validation
 * @namespace
 * @property {string} baseUrl - Base URL for HackerNews
 * @property {string} newestUrl - URL for the newest articles page
 * @property {number} articlesCount - Number of articles to validate
 * @property {Object} browser - Browser configuration options
 * @property {boolean} browser.headless - Whether to run browser in headless mode
 * @property {number} browser.slowMo - Slow down browser operations by specified milliseconds
 */
const config = {
  baseUrl: "https://news.ycombinator.com",
  newestUrl: "https://news.ycombinator.com/newest",
  articlesCount: 100,
  browser: {
    // Check if running in Docker (can detect via environment variable)
    headless: process.env.DOCKER === 'true' ? true : false,
    slowMo: 0
  },
  timeouts: {
    navigation: 30000,
    element: 5000
  }
};

module.exports = config;