// Gatsby supports TypeScript natively!
import React, { ReactElement } from "react"
import { PageProps, Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { BlogPageQuery, MdxFrontmatterImage } from "../../gatsby-graphql"
import PostCard from "../components/PostCard"

type PageContext = {
  currentPage: number
  numPages: number
}

const BlogIndex = ({
  data,
  pageContext,
}: PageProps<BlogPageQuery, PageContext>): ReactElement => {
  const posts = data.allMdx.edges
  const { currentPage, numPages } = pageContext

  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return (
    <Layout>
      <SEO title="All posts" />
      <h1 className="font-light">Posts</h1>
      <div className="mt-24">
        {posts.map(({ node }) => {
          const title = node?.frontmatter?.title || node?.fields?.slug

          if (!title || !node?.fields?.slug || !node?.frontmatter) return <></>

          return (
            <PostCard
              slug={node.fields.slug}
              title={node.frontmatter.title}
              description={node.frontmatter.description || node.excerpt}
              date={node.frontmatter.date}
              image={node.frontmatter?.image as MdxFrontmatterImage}
              tags={node.frontmatter?.tags as string[]}
              category={node.frontmatter?.category as string}
            />
          )
        })}
      </div>
      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {!isFirst && (
              <Link to={prevPage} rel="prev">
                ← Previous Page
              </Link>
            )}
          </li>
          <li>
            {!isLast && (
              <Link to={nextPage} rel="next">
                Next Page →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query blogPage($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date
            title
            description
            category
            tags
            image {
              feature {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
