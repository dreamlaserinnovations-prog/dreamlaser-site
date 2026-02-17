const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Static assets
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("uploads");
  eleventyConfig.addPassthroughCopy("feed.xml");

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
