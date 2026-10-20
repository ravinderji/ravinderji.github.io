# Projects

Each project has its own folder here, published at `https://ravinderji.github.io/projects/<folder>/`:

```
projects/
  projects.json          list shown on the Projects page (projects/index.html)
  _template/             starting point for a new project (not published: "_" folders are skipped)
  meditation-tracker/
    index.html           app page
    privacy.html         privacy policy (link this in the store listing)
    terms.html           terms of use
    images/              icon.png and screenshots
```

## Add a project

1. Copy `_template/` to a new folder with a short lowercase name, e.g. `projects/my-new-app/`.
2. In its three pages, replace every ALL_CAPS placeholder (APP_NAME, STORE_URL, DATE, ...).
3. Put `icon.png` and screenshots in its `images/` folder.
4. Add an entry to `projects.json` (copy an existing one). Its card then appears on the Projects page.
5. Commit and push; GitHub Pages publishes in a minute or two.

Store listings use these links:
- Privacy policy: `https://ravinderji.github.io/projects/<folder>/privacy.html`
- Terms: `https://ravinderji.github.io/projects/<folder>/terms.html`

Shared styling for all project pages is in `assets/css/projects.css`.
