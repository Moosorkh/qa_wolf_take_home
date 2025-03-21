/**
 * @fileoverview HackerNews Article Sorting Validation Script
 * 
 * This script validates that the first 100 articles on Hacker News /newest
 * page are correctly sorted from newest to oldest by timestamp.
 * 
 * @author Mehdi Azar
 * @version 1.0.0
 */

const { chromium } = require("playwright");
const config = require("./config");
const { parseArticleElements } = require("./utils/article-parser");
const { validateArticleSorting, generateValidationSummary } = require("./utils/validation");
const { generateHtmlReport, logResults } = require("./utils/reporter");

/**
 * Fetches newest articles from Hacker News
 * 
 * @async
 * @function fetchNewestArticles
 * @param {import('playwright').Page} page - Playwright page instance
 * @param {number} count - Number of articles to fetch
 * @returns {Promise<Array<Object>>} Array of article objects with timestamp data
 */
async function fetchNewestArticles(page, count) {
  let articles = [];
  let pageNum = 1;

  // Keep fetching until we have enough articles
  while (articles.length < count) {
    console.log(`Looking at page ${pageNum}...`);

    // Extract article data from current page
    const pageArticles = await page.$$eval('.athing', (rows, pageNumber) => {
      // Use the parseArticleElements functionality, but inline since we can't import directly in evaluate
      // This would ideally be refactored to use our utils module
      return rows.map(row => {
        try {
          // Find the title and timestamp elements
          const title = row.querySelector('.titleline a');
          const timeInfo = row.nextElementSibling.querySelector('.age');
          
          if (!timeInfo) return null;
          
          // parsing the timestamp data
          const timestampTitle = timeInfo.getAttribute('title');
          const timestamp = timestampTitle ? new Date(timestampTitle).getTime() : 0;
          
          return {
            id: row.id,
            title: title.textContent.trim(),
            timestamp: timestamp,
            timeDisplay: timeInfo.textContent.trim(),
            pageNum: pageNumber
          };
        } catch (e) {
          console.error('Error parsing row:', e);
          return null;
        }
      }).filter(Boolean); // Removing any null entries
    }, pageNum);

    articles.push(...pageArticles);

    // Check if we need to go to the next page
    if (articles.length < count) {
      const hasMorePages = await page.$('a.morelink');
      if (hasMorePages) {
        // Navigate to next page
        await Promise.all([
          page.waitForNavigation({ waitUntil: 'networkidle' }),
          page.click('a.morelink')
        ]);
        pageNum++;
      } else {
        console.log("No more pages available");
        break;
      }
    }
  }

  // Return exactly the number of articles requested
  return articles.slice(0, count);
}

/**
 * Main function to run the validation
 * 
 * @async
 * @function main
 * @returns {Promise<void>}
 */
async function main() {
  console.log("Starting Hacker News validation...");
  
  const startTime = process.hrtime();
  
  // Start a visible browser
  const browser = await chromium.launch({ 
    headless: config.browser.headless,
    slowMo: config.browser.slowMo
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Go to Hacker News newest page
    await page.goto(config.newestUrl);
    console.log("Opened Hacker News newest page");

    // Get the articles
    const articles = await fetchNewestArticles(page, config.articlesCount);
    console.log(`Successfully collected ${articles.length} articles`);

    // Check if they're correctly sorted
    const issues = validateArticleSorting(articles);
    const summary = generateValidationSummary(articles, issues);
    
    // Calculate execution time
    const [seconds] = process.hrtime(startTime);
    summary.executionTime = seconds;

    // Log results to console
    logResults(issues, summary);
    
    // Generate HTML report
    await generateHtmlReport(articles, issues, summary);
    
  } catch (error) {
    console.error("Something went wrong:", error.message);
  } finally {
    // Always close the browser when we're done
    await browser.close();
    console.log("Validation complete");
  }
}

// Run the script
main();