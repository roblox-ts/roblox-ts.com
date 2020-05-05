# roblox-ts.com

Contributions to the roblox-ts documentation are welcome!

All docs can be found within the `_docs` folder, which are markdown files with some extra Liquid template syntax sprinkled around.

## Sections and Front Matter

Docs in the `_docs` folder should be organized into sub-categories. The categories and navigation are automatically generated from the YAML front matter which is present at the top of all markdown files.

For example:

```md
---
title: Guides
order: 1
category: guides
hidden: true
description: A list of guides for roblox-ts usage.
---
```

- `title`, `order`, `category`, and `description` are all required.
- Pages within the same section should all have the same `category` value.
- `description` is not shown directly on the page, but is present in the meta information for search engines, social media embeds, and section overviews.
- `order` affects the order in which this specific page appears in the table of contents. Multiple articles may have the same `order` number if you don't care what order they appear in.
- `hidden` is an optional boolean which hides this specific page from the table of contents. This is generally used on the section overview / `index.md` pages.

The table of contents is automatically generated from this information. Ordering of sections in the table of contents is arbitrary unless overridden at the top of the `docs-nav.html` partial.

## Info, alert, and warn boxes

You can create info, alert, and warn boxes by adding a class to any paragraph:

```md
This is in a blue info box
{:.info}

This is in a red alert box
{:.alert}

This is in a yellow warning box
{:.warn}

This is\\
\\
A\\
\\
Multi-line\\
\\
Alert box
{:.alert}
```
## Code tabs

For code tabs (as seen prominently in the Roact section), use this pattern:

	{% capture code %}
	```ts
	// Top code
	```
	***
	```jsx
	// Bottom code
	```
	{% endcapture %}
	{% include tabs.html sync="jsx" tabs="Vanilla,JSX" content=code %}

The `sync` parameter is optional and is only necessary if you want to sync multiple code tabs together. The value is any arbitrary string where similar code tabs would share the same string.

The `tabs` parameter is required and should be a comma-separated list of names for the tabs.

Inside the code capture, code sections are separated with horizontal rules (`***` makes a horizontal rule in markdown).

## Section overviews

To include a section overview for the current section, include the section overview partial:

```md
{% include section-overview.html %}
```