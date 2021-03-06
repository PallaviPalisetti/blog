import type { PluggableList } from "unified";

import rehypeHighlight from "rehype-highlight";
import remarkFrontmatter from "remark-frontmatter";
import remarkGFM from "remark-gfm";
import remarkLayout from "./remark-layout";
import remarkMdxDisableExplicitJsx from "remark-mdx-disable-explicit-jsx";
import remarkImportFiles from "./remark-import-files";
import { getArticlesListAndTags } from "./pages-helpers";

interface MdxConfig {
  providerImportSource: string;
  rehypePlugins: PluggableList;
  remarkPlugins: PluggableList;
}

const config: MdxConfig = {
  providerImportSource: "@mdx-js/react",
  remarkPlugins: [
    remarkMdxDisableExplicitJsx, // Enables styling of html tags in HTML, like `<li>`
    remarkFrontmatter, // Converts frontmatter to remark node, used by remark-layout
    [
      remarkLayout,
      {
        defaultLayout: {
          path: "layouts/BlogArticle",
          metaProcessor: async (config: Record<string, unknown>) => {
            const data = await getArticlesListAndTags(6);
            config.featuredList = data.list; // Return the latest 6 articles to give padding in case some of the articles don't have a cover photo
            config.articleTags = data.tags; // Fill tags list for all blog posts
            return config;
          },
        },
      },
    ],
    remarkGFM, // Adds tables
    remarkImportFiles, // Replaces paths to files with imports
  ],
  rehypePlugins: [
    [rehypeHighlight, { plainText: ["text", "prolog", "Dockerfile"] }], // Adds syntax highlighting
  ],
};

export default config;
