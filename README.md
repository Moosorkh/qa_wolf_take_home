# 🐺 QA Wolf Take-Home Assignment - Hacker News Validation

## Overview

This project validates that the first 100 articles on Hacker News' "newest" page are correctly sorted from newest to oldest by timestamp. It uses Microsoft's Playwright framework to automate browser interactions and implements comprehensive validation, reporting, and error handling.

## Features

- ✅ Validates timestamp-based sorting across multiple pages
- 📊 Generates detailed HTML reports of validation results
- 🔍 Provides clear error messages for sorting inconsistencies
- 📱 Configurable browser settings (headless/headed mode)
- 🧩 Modular, well-documented code structure

## Project Structure

```
qa_wolf_take_home/
├── index.js                    # Main validation script
├── config.js                   # Configuration settings
├── package.json                # Node.js package definition
├── package-lock.json           # Dependency lock file
├── README.md                   # Project documentation
├── utils/                      # Utility modules
│   ├── article-parser.js       # Article data extraction
│   ├── validation.js           # Sorting validation logic
│   └── reporter.js             # Reporting utilities
├── reports/                    # Generated reports (auto-created)
└── playwright.config.js        # Playwright configuration
```

## Prerequisites
```
- Node.js (v14+)
- npm or yarn
```
## Installation

1. Clone the repository
2. Install dependencies:
```
npm install
```

## Usage

### Run the validation script:

```
node index.js
```

The script will:
1. Launch a browser window
2. Navigate to Hacker News' newest articles page
3. Fetch the first 100 articles (paginating as needed)
4. Validate that articles are sorted from newest to oldest
5. Generate an HTML report of the results
6. Log results to the console

## Configuration

### You can modify test behavior by editing `config.js`:

- `articlesCount`: Number of articles to validate
- `browser.headless`: Run in headless mode (true/false)
- `browser.slowMo`: Slow down operations by specified milliseconds

## Reporting

After each run, an HTML report is generated in the `reports/` directory showing:
- Overall pass/fail status
- Article list with timestamps
- Detailed information about any sorting issues found

## Development

### Adding New Features

The codebase is modular and follows JSDoc documentation standards for clarity. To extend functionality:

1. Update utility modules in the `utils/` directory
2. Modify the main `index.js` script to use the new features
3. Update tests as needed

### Testing

To ensure your changes maintain validation accuracy by testing with various browser configurations:

Run with visible browser
```
node index.js
```
Edit config.js to run in headless mode
Then run again
```
node index.js
```

## Troubleshooting

- **Navigation Timeout**: Increase timeout values in `config.js`
- **Parsing Errors**: Check the article structure on Hacker News for changes
- **Browser Launch Failure**: Ensure Playwright browsers are installed with `npx playwright install`

## License

This project is licensed under the ISC License - see the LICENSE file for details.