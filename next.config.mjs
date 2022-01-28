/* eslint-env node */
import bundleAnalyzer from "@next/bundle-analyzer";
import mdxSiteOptions from "./.build/server/mdx-config-site.mjs";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  outputFileTracing: false,
  images: {
    disableStaticImages: true,
  },
  experimental: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  trailingSlash: true,
  webpack: (config, options) => {
    config.output.assetModuleFilename = "static/media/[hash][ext]";

    config.module.rules.push({
      test: /\.(png|jpg|webp|gif|mp4|webm|ogg|swf|ogv|woff2)$/i,
      type: "asset/resource",
    });

    config.module.rules.push({
      test: /\.svg$/,
      oneOf: [
        {
          issuer: /\.[mjt]sx?$/,
          resourceQuery: /react/,
          use: "@svgr/webpack",
        },
        {
          type: "asset/resource",
        },
      ],
    });

    config.module.rules.push({
      test: /\.(md|mdx)$/,
      use: [
        options.defaultLoaders.babel, //TODO: need check
        {
          loader: "@mdx-js/loader",
          options: mdxSiteOptions,
        },
      ],
    });

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: "json",
      use: "yaml-loader",
    });

    return config;
  },
});
