import { BlogMeta } from "layouts/BlogArticle/types";
import { getPagesInfo, getArticleTags } from "./pages-helpers";

/*
 * We need this script to copy the images into a public folder.
 * These images are needed on the main page and tag pages of the blog.
 */

export const findArticleImages = () => {
  const posts = getPagesInfo<BlogMeta>(`/**/*.mdx`, {
    sort: "date",
    order: "DESC",
  });

  const tags = getArticleTags();
  const featuredPosts = [];

  tags.forEach((tag) => {
    const postsByTag = posts.filter((post) => {
      return post.data.frontmatter.tags.some((postTag) => postTag === tag);
    });

    featuredPosts.push(...postsByTag.slice(0, 5));
  });

  featuredPosts.push(...posts.slice(0, 5));

  const images = [];

  featuredPosts.forEach((post) => {
    if (post.data.frontmatter.logo) {
      const {
        data: {
          frontmatter: {
            logo: { image },
          },
          uri,
        },
      } = post;
      images.push({ image, uri });
    } else {
      return;
    }
  });

  return images;
};
