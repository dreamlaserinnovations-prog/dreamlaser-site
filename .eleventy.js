const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
eleventyConfig.addPassthroughCopy("work1.png");

  // Prevent Eleventy from reading its own output folder as input.
  // If "dist" exists in the repo, it can cause "Duplicate permalink/output" build failures.
  eleventyConfig.ignores.add("dist/**");

  // Static assets
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");
  // Used by runtime fetch() on the homepage (services/materials/gallery/reviews)
  eleventyConfig.addPassthroughCopy("data");
  eleventyConfig.addPassthroughCopy("uploads");
  eleventyConfig.addPassthroughCopy("feed.xml");

  // Decap/legacy HTML files in /posts can collide with generated permalinks
  // (Eleventy outputs raw HTML files by path *and* markdown files by permalink).
  eleventyConfig.ignores.add("posts/*.html");

  // Date filter used by templates (Eleventy v3 doesn't bundle it)
  eleventyConfig.addFilter("date", (dateObj, format = "MMM dd, yyyy", zone = "utc") => {
    if (!dateObj) return "";
    const jsDate = dateObj instanceof Date ? dateObj : new Date(dateObj);
    return DateTime.fromJSDate(jsDate, { zone }).toFormat(format);
  });

  // Blog collection (newest first)
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("posts/*.md")
      .sort((a, b) => (b.date || 0) - (a.date || 0));
  });

  return {
    dir: {
      input: ".",
      output: "dist",
      includes: "_includes"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
