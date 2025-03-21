/**
 * @fileoverview Reporter utilities for HackerNews validation
 * 
 * @author Your Name
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');

/**
 * Output directory for reports
 * @constant {string}
 */
const REPORTS_DIR = path.join(__dirname, '../reports');

// Ensure reports directory exists
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

/**
 * Generates an HTML report of validation results
 * 
 * @async
 * @function generateHtmlReport
 * @param {Array<Object>} articles - Array of article objects
 * @param {Array<Object>} issues - Array of sorting issues
 * @param {Object} summary - Validation summary statistics
 * @returns {Promise<string>} Path to the generated report file
 */
async function generateHtmlReport(articles, issues, summary) {
  const reportPath = path.join(REPORTS_DIR, `validation-report-${Date.now()}.html`);
  
  // Generate HTML content (simplified example)
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>HackerNews Sorting Validation Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .success { color: green; }
        .error { color: red; }
        table { border-collapse: collapse; width: 100%; }
        th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
      </style>
    </head>
    <body>
      <h1>HackerNews Sorting Validation Report</h1>
      <div>
        <h2>Summary</h2>
        <p class="${summary.isPassing ? 'success' : 'error'}">
          Status: ${summary.isPassing ? 'PASSED' : 'FAILED'}
        </p>
        <p>Articles Checked: ${summary.articlesChecked}</p>
        <p>Issues Found: ${summary.issuesFound}</p>
        <p>Pages Traversed: ${summary.pagesTraversed}</p>
        <p>Execution Time: ${summary.executionTime}s</p>
      </div>
      
      ${issues.length > 0 ? `
        <div>
          <h2>Sorting Issues</h2>
          <ul>
            ${issues.map(issue => `
              <li class="error">
                Position ${issue.position + 1}: "${issue.current.title}" (${issue.current.timeDisplay})
                is older than "${issue.next.title}" (${issue.next.timeDisplay})
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}
      
      <div>
        <h2>Articles</h2>
        <table>
          <tr>
            <th>Position</th>
            <th>Title</th>
            <th>Timestamp</th>
          </tr>
          ${articles.map((article, i) => `
            <tr ${issues.some(issue => issue.position === i) ? 'class="error"' : ''}>
              <td>${i + 1}</td>
              <td>${article.title}</td>
              <td>${article.timeDisplay}</td>
            </tr>
          `).join('')}
        </table>
      </div>
    </body>
    </html>
  `;
  
  // Write to file
  fs.writeFileSync(reportPath, htmlContent);
  console.log(`Report saved to ${reportPath}`);
  
  return reportPath;
}

/**
 * Logs results to console in a formatted way
 * 
 * @function logResults
 * @param {Array<Object>} issues - Array of sorting issues
 * @param {Object} summary - Validation summary
 * @returns {void}
 */
function logResults(issues, summary) {
  console.log('\n=== HackerNews Sorting Validation Results ===');
  console.log(`Status: ${summary.isPassing ? 'PASSED ✅' : 'FAILED ❌'}`);
  console.log(`Articles Checked: ${summary.articlesChecked}`);
  console.log(`Issues Found: ${summary.issuesFound}`);
  console.log(`Pages Traversed: ${summary.pagesTraversed}`);
  console.log(`Execution Time: ${summary.executionTime}s`);
  
  if (issues.length > 0) {
    console.log('\nSorting Issues:');
    issues.forEach((issue, i) => {
      console.log(`[${i+1}] Position ${issue.position + 1}:`);
      console.log(`  "${issue.current.title}" (${issue.current.timeDisplay})`);
      console.log(`  is older than:`);
      console.log(`  "${issue.next.title}" (${issue.next.timeDisplay})`);
    });
  }
}

module.exports = {
  generateHtmlReport,
  logResults
};