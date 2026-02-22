module.exports = function(eleventyConfig) {
  // Copy static assets straight through
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("uploads");
  // Root PNG work samples (work1.png, work2.png, etc.)
  for (let i = 1; i <= 25; i++) {
    eleventyConfig.addPassthroughCopy(`work${i}.png`);
  }
  eleventyConfig.addPassthroughCopy("thank-you.html");
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("admin");

  // Posts collection (from /posts/*.md and /posts/*.html)
  eleventyConfig.addCollection("posts", function(collectionApi) {
    const md = collectionApi.getFilteredByGlob("posts/*.md");
    const html = collectionApi.getFilteredByGlob("posts/*.html");
    const all = md.concat(html);
    return all.sort((a, b) => (b.date || 0) - (a.date || 0));
  });


  // Filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    try {
      return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(dateObj);
    } catch (e) {
      return "";
    }
  });

  eleventyConfig.addFilter("excerpt", (content) => {
    if (!content) return "";
    const text = content
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return text.length > 140 ? text.slice(0, 137) + "..." : text;
  });

  return {
    dir: {
      input: ".",
      data: "data",
      output: "dist"
    }
  };
};
