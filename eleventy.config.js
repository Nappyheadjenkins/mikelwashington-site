export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/work/wp-content": "work/wp-content" });
  eleventyConfig.addPassthroughCopy({ "src/media": "media" });
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  eleventyConfig.addCollection("projects", (api) =>
    api.getFilteredByGlob("src/projects/*.md").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addFilter("year", (d) => (d === "now" ? new Date() : new Date(d)).getUTCFullYear());
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
  };
}
