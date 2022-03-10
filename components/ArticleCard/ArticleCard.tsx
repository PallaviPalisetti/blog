import NextImage from "next/image";
import styled from "styled-components";
import css from "@styled-system/css";
import { format } from "date-fns";
import Flex from "components/Flex";
import Box from "components/Box";
import Tags from "components/Tags";
import Link from "components/Link";
import { transition } from "components/system";
import { BlogMeta } from "layouts/BlogArticle/types";

interface ArticleCardProps {
  meta: {
    frontmatter: BlogMeta;
    uri: string;
  };
}

export default function ArticleCard({ meta }: ArticleCardProps) {
  const image = meta.frontmatter.logo?.image;
  return (
    <StyledCard style={{ flexDirection: image ? "row" : "column" }}>
      {image && (
        <StyledWrapperImage>
          <NextImage
            src={image}
            alt={meta.frontmatter.articleTitle}
            layout="fill"
            objectFit="cover"
          />
        </StyledWrapperImage>
      )}
      <Flex flexDirection="column">
        <Box as="p" text="text-sm" color="darkest">
          {format(new Date(meta.frontmatter.date), "MMM d, yyyy")}
        </Box>
        <Box as="p" text="text-md" color="darkest" fontWeight="bold">
          By {meta.frontmatter.author}
        </Box>
        <StyledArticleTitle as="h3">
          <StyledArticleLink href={meta.uri}>
            {meta.frontmatter.articleTitle}
          </StyledArticleLink>
        </StyledArticleTitle>
        <StyledDescription as="p">
          {meta.frontmatter.description}
        </StyledDescription>
        {!!meta.frontmatter.tags.length && (
          <Tags
            tags={meta.frontmatter.tags}
            size="sm"
            mt="auto"
            pt="3"
            position="relative"
          />
        )}
      </Flex>
    </StyledCard>
  );
}

const StyledArticleLink = styled("a")(
  css({
    textDecoration: "none",
    color: "dark-purple",

    "&:after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  })
);

const StyledCard = styled("div")(
  css({
    display: "flex",
    position: "relative",
    textDecoration: "none",
    ml: -4,
    py: 5,
    px: 4,
    "&::after": {
      position: "absolute",
      bottom: 0,
      left: 4,
      display: "block",
      content: ["none", '""'],
      width: "840px",
      height: "1px",
      backgroundColor: "lightest-gray",
    },
    "&:hover": {
      transition: transition([["backgroundColor", "interaction"]]),
      backgroundColor: "lightest-gray",
    },

    "@media(max-width: 560px)": {
      py: 3,
    },
  })
);

const StyledWrapperImage = styled("div")(
  css({
    position: "relative",
    flexShrink: 0,
    width: "240px",
    height: "auto",
    mr: 7,
    border: "1px solid",
    borderColor: "lightest-gray",
    borderRadius: "default",

    "& img": {
      borderRadius: "default",
    },

    "@media(max-width: 680px)": {
      width: "180px",
      mr: 5,
    },

    "@media(max-width: 560px)": {
      display: "none",
    },
  })
);

const StyledArticleTitle = styled(Box)(
  css({
    fontSize: "header-3",
    lineHeight: "lg",
    color: "dark-purple",
    fontWeight: "black",
    mt: 3,

    "@media(max-width: 680px)": {
      fontSize: "header-4",
      lineHeight: "lg",
      mt: 2,
    },

    "@media(max-width: 560px)": {
      fontSize: "text-xl",
      lineHeight: "md",
    },
  })
);

const StyledDescription = styled(Box)(
  css({
    fontSize: "text-lg",
    lineHeight: "lg",
    color: "darkest",
    mt: "3",

    "@media(max-width: 680px)": {
      fontSize: "text-md",
      lineHeight: "md",
    },
  })
);
