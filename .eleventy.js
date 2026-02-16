const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("date", (dateObj, format = "MMM dd, yyyy", zone = "utc") => {
    if (!dateObj) return "";
    // Eleventy sometimes gives a string, sometimes a Date
    const dt =
      dateObj instanceof Date
        ? DateTime.fromJSDate(dateObj, { zone })
        : DateTime.fromISO(String(dateObj), { zone });

    return dt.isValid ? dt.toFormat(format) : "";
  });

  // keep EVERYTHING else you already have below here ✅
  return {
    // your existing return config...
  };
};

  // Static assets
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");

  // Blog collection
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md");
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
