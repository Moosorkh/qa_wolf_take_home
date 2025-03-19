// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

const HN_NEWEST_URL = "https://news.ycombinator.com/newest";
const ARTICLES_COUNT = 100;

// Fetch newest articles from Hacker News
async function fetchNewestArticles(page, count) {
  let articles = [];
  let pageNum = 1;

  // Keep fetching until we have enough articles
  while (articles.length < count) {
    console.log(`Looking at page ${pageNum}...`);

    // Extract article data from current page
    const pageArticles = await page.$$eval('.athing', rows => {
      return rows.map(row => {
        // Find the title and timestamp elements
        const title = row.querySelector('.titleline a');
        const timeInfo = row.nextElementSibling.querySelector('.age');
        
        if (!timeInfo) return null;
        
        // parsing the timestamp data
        //const timeAttr = timeInfo.getAttribute('title');
        const timestampTitle = timeInfo.getAttribute('title');
        const timestamp = timestampTitle ? new Date(timestampTitle).getTime() : 0;
        
        return {
          id: row.id,
          title: title.textContent.trim(),
          timestamp: timestamp,
          timeDisplay: timeInfo.textContent.trim()
        };
      }).filter(Boolean); // Removing any null entries
    });

    //articles = [...articles, ...pageArticles];
    articles.push(...pageArticles);

    // Check if we need to go to the next page
    if (articles.length < ARTICLES_COUNT) {
      const hasMorePages = await page.$('a.morelink');
      if (hasMorePages) {
        // Navigate to next page
        await Promise.all([
          page.waitForNavigation({ waitUntil: 'networkidle' }),
          page.click('a.morelink')
        ]);
        pageNum++;
      } else {
        // adding this console log to track the end of the pages
        console.log("No more pages available");
        break;
      }
    }
  }

  // Return exactly the number of articles requested
  return articles.slice(0, count);
}

// Check if articles are sorted newest to oldest
function checkArticleSorting(articles) {
  for (let i = 0; i < articles.length - 1; i++) {
    const current = articles[i];
    const next = articles[i + 1];
    
    if (current.timestamp < next.timestamp) {
      console.error(` Found sorting issue at position ${i}:`);
      console.error(`   "${current.title}" (${current.timeDisplay})`);
      console.error(`   is older than:`);
      console.error(`   "${next.title}" (${next.timeDisplay})`);
      return false;
    }
  }
  return true;
}

// Main function to run the validation
async function main() {
  console.log("Starting Hacker News validation...");
  
  // Start a visible browser so we can see what's happening
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Go to Hacker News newest page
    await page.goto("https://news.ycombinator.com/newest");
    console.log("Opened Hacker News newest page");

    // Get the 100 newest articles
    const articles = await fetchNewestArticles(page, 100);
    console.log(`Successfully collected ${articles.length} articles`);

    // Check if they're correctly sorted
    const isSorted = checkArticleSorting(articles);

    if (isSorted) {
      console.log(" SUCCESS: All 100 articles are correctly sorted from newest to oldest");
    } else {
      console.log(" FAILED: Articles are not properly sorted by time");
    }
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