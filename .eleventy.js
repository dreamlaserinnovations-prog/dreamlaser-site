module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("posts"); // keeps raw posts accessible if needed

  return {
    dir: {
      input: ".",
      output: "dist"
    }
  };
};
