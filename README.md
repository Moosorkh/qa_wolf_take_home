# Hacker News Sorting Validation

## Overview

This project validates that the first 100 articles on Hacker News' "newest" page are correctly sorted from newest to oldest by timestamp. It uses Playwright for browser automation and includes Docker containerization and CI/CD integration.

## Features

- ✅ **Automated Validation**: Verifies timestamp-based sorting across multiple pages
- 📊 **HTML Reporting**: Generates detailed validation reports
- 🐳 **Docker Support**: Containerized for consistent execution
- 🔄 **CI/CD Pipeline**: GitHub Actions workflow for automated testing
- 🧩 **Modular Architecture**: Well-structured, maintainable code


## Project Structure

```
qa_wolf_take_home/
├── index.js                    # Main validation script
├── config.js                   # Configuration settings
├── Dockerfile                  # Docker container definition
├── package.json                # Node.js package definition
├── utils/                      # Utility modules
│   ├── article-parser.js       # Article data extraction
│   ├── validation.js           # Sorting validation logic
│   └── reporter.js             # Reporting utilities
├── reports/                    # Generated HTML reports
├── .github/workflows/          # CI/CD configuration
│   └── validation.yml          # GitHub Actions workflow
└── playwright.config.js        # Playwright configuration
```

## Prerequisites

- Node.js (v14+)
- npm or yarn
- Docker (optional, for containerized execution)

## Installation

1. Clone the repository
2. Install dependencies:
3. Copynpm install

```bash
## Usage
Running Locally
bashCopy# Using npm script
npm start

# Or directly
node index.js
```
## The script will:

1. Launch a browser window
2. Navigate to Hacker News' newest articles page
3. Fetch the first 100 articles (paginating as needed)
4. Validate that articles are sorted from newest to oldest
5. Generate an HTML report of the results
6. Log results to the console

## Running with Docker
``` bash
# Build the Docker image
docker build -t hn-validation .

# Run the container
docker run -it hn-validation

# Run with volume mount to save reports locally
docker run -it -v "$(pwd)/reports:/app/reports" hn-validation
```
## CI/CD Integration
### This project includes a GitHub Actions workflow that:
- Runs automatically every 6 hours
- Can be triggered manually
- Builds the Docker container
- Runs the validation
- Saves the validation reports as artifacts

## To access the reports:

- Go to the Actions tab in GitHub
- Select the completed workflow run
- Download the artifacts from the Artifacts section

## Configuration
### You can modify test behavior by editing config.js:

- articlesCount: Number of articles to validate
- browser.headless: Run in headless mode (true/false)
- browser.slowMo: Slow down operations by specified milliseconds

## Reporting
### After each run, an HTML report is generated in the reports/ directory showing:

- Overall pass/fail status
- Article list with timestamps
- Detailed information about any sorting issues found

## Implementation Details
### Validation Logic
The script validates article sorting by:

- Opening the Hacker News "newest" page
- Collecting timestamps for the first 100 articles (paginating as needed)
- Verifying articles are correctly sorted from newest to oldest
- Generating a detailed HTML report with results

## Docker Implementation
### The Docker container:

- Is based on the official Playwright image
- Runs in headless mode
- Contains only necessary components
- Provides consistent test execution

## CI/CD Pipeline
### The GitHub Actions workflow:

- Automates regular validation with a cron job every 6 hours
- Ensures consistent quality checks
- Preserves validation reports for review
- Provides status tracking

## Development
### Adding New Features
The codebase is modular and follows JSDoc documentation standards for clarity. To extend functionality:

- Update utility modules in the utils/ directory
- Modify the main index.js script to use the new features
- Update tests as needed

## Testing
Ensure your changes maintain validation accuracy by testing with various browser configurations:
```bash
# Run with visible browser
node index.js

# Edit config.js to run in headless mode
# Then run again
node index.js
```
## Troubleshooting

- Navigation Timeout: Increase timeout values in config.js
- Parsing Errors: Check the article structure on Hacker News for changes
- Browser Launch Failure: Ensure Playwright browsers are installed with npx playwright install

## Future Enhancements
### Potential improvements could include:

- Email notifications for failed validations
- Performance metrics tracking
- Extended validation for other aspects of Hacker News
- Integration with monitoring systems

## GitHub
- GitHub: https://github.com/Moosorkh/qa_wolf_take_home.git

## License
N/A