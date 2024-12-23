# Wiki Markdown Converter

The **Wiki Markdown Converter** is a web-based application that allows users to convert Wikipedia articles into Markdown format. It processes the page's content, removes unnecessary elements, and outputs a clean, structured Markdown file suitable for documentation, blogs, or other uses.

---

## Features

- Convert Wikipedia articles to clean Markdown.
- Preserve essential formatting, including headings, tables, and lists.
- Remove unnecessary elements like `[edit]` links, CSS, and extra scripts.
- Generate a **Table of Contents (ToC)** with clickable links.
- Highlight active sections in the ToC.

---

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/abishekvenkat/wikimark.git
   cd wikimark
   ```
2. Install dependencies and start dev server:
    ```bash
    npm install
    npm run dev
    ```
3. Open the app in your browser:
    ```arduino
    http://localhost:4680
    ```

## Usage
1. Paste a Wikipedia URL into the input field on the app.
2. Click the Convert button to transform the article into Markdown.
3. View the output in the preview section and download it as a .md file.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Future Improvements
Support for Infobox component
Support for generic formatting 
Support for multi-language Wikipedia articles.
Enhanced Markdown table generation for nested tables.






