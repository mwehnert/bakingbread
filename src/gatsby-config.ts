export const pathPrefix = "/"
export const siteMetadata = {
  title: `backingbread`,
  author: {
    name: `Matthias`,
    summary: ``,
  },
  description: `A simple, fixed sidebar two columns Gatsby.js blog starter.`,
  siteUrl: `https://backingbread.blog/`,
  social: {
    twitter: `mwhnrt`,
    instagram: `bakingbread.blog`,
  },
  defaultImage: "images/bg.jpeg",
}
export const plugins = [
  {
    resolve: "gatsby-plugin-react-svg",
    options: {
      rule: {
        include: /assets/, // See below to configure properly
      },
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content/blog`,
      name: `blog`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content/assets`,
      name: `assets`,
    },
  },
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: [".md", ".mdx"],
      gatsbyRemarkPlugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 590,
          },
        },
        {
          resolve: `gatsby-remark-responsive-iframe`,
          options: {
            wrapperStyle: `margin-bottom: 1.0725rem`,
          },
        },
        `gatsby-remark-prismjs`,
        `gatsby-remark-copy-linked-files`,
        `gatsby-remark-smartypants`,
      ],
    },
  },
  {
    resolve: `gatsby-plugin-graphql-codegen`,
    options: {
      fileName: `./gatsby-graphql.ts`,
      documentPaths: ["./src/**/*.{ts,tsx}", "./node_modules/gatsby-*/**/*.js"],
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  `gatsby-plugin-mdx`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Backing Bread Blog`,
      short_name: `bakingbread`,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#663399`,
      display: `minimal-ui`,
      icon: `src/content/assets/insta.png`,
    },
  },
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-plugin-typography`,
    options: {
      pathToConfigModule: `src/utils/typography`,
    },
  },
  // this (optional) plugin enables Progressive Web App + Offline functionality
  // To learn more, visit: https://gatsby.dev/offline
  `gatsby-plugin-offline`,
  "gatsby-plugin-dark-mode",
  `gatsby-plugin-postcss`,
]
