import path from "path"
import { createFilePath } from "gatsby-source-filesystem"
import { CreateNodeArgs, CreatePagesArgs } from "gatsby"
import { PagesNodesQuery } from "../gatsby-graphql"

export const createPages = async ({
  graphql,
  actions,
}: CreatePagesArgs): Promise<void> => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
  const result = await graphql(
    `
      query pagesNodes {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = (result.data as PagesNodesQuery).allMdx.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields?.slug || "",
      component: blogPost,
      context: {
        slug: post.node.fields?.slug,
        previous,
        next,
      },
    })
  })

  // Create blog post list pages
  const postsPerPage = 5
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: path.resolve("./src/templates/blog-list.tsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
}

export const onCreateNode = ({
  node,
  actions,
  getNode,
}: CreateNodeArgs): void => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
