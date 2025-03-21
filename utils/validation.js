/**
 * @fileoverview Validation utilities for HackerNews sorting check
 * 
 * @author Mehdi Azar
 * @version 1.0.0
 */

/**
 * Checks if articles are properly sorted from newest to oldest
 * 
 * @function validateArticleSorting
 * @param {Array<Object>} articles - Array of article objects with timestamp data
 * @returns {Array<Object>} Array of sorting issues found, empty if no issues
 */
function validateArticleSorting(articles) {
    const issues = [];
    
    for (let i = 0; i < articles.length - 1; i++) {
      const current = articles[i];
      const next = articles[i + 1];
      
      if (current.timestamp < next.timestamp) {
        issues.push({
          position: i,
          current,
          next
        });
      }
    }
    
    return issues;
  }
  
  /**
   * Generates a summary of validation results
   * 
   * @function generateValidationSummary
   * @param {Array<Object>} articles - Array of article objects
   * @param {Array<Object>} issues - Array of sorting issues
   * @returns {Object} Summary object with validation statistics
   */
  function generateValidationSummary(articles, issues) {
    return {
      articlesChecked: articles.length,
      issuesFound: issues.length,
      isPassing: issues.length === 0,
      executionTime: process.hrtime()[0], // Simplified for example
      pagesTraversed: Math.max(...articles.map(a => a.pageNum || 1))
    };
  }
  
  export default {
    validateArticleSorting,
    generateValidationSummary
  };