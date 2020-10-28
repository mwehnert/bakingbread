// Gatsby supports TypeScript natively!
import React, { ReactElement } from "react"
import { PageProps, Link, graphql } from "gatsby"
import Image from "gatsby-image"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { BlogPageQuery } from "../../gatsby-graphql"

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
      <div className="mt-24">
        {posts.map(({ node }) => {
          const title = node?.frontmatter?.title || node?.fields?.slug

          if (!title || !node?.fields?.slug || !node?.frontmatter) return <></>

          return (
            <article
              className="flex flex-col xl:flex-row my-2"
              key={node.fields.slug}
            >
              {node.frontmatter.image && node.frontmatter.image.feature && (
                <div className="w-full xl:w-1/3 flex-shrink-0 xl:mr-8">
                  <Image
                    className="w-full"
                    alt={node.frontmatter.title}
                    fluid={
                      node.frontmatter.image.feature.childImageSharp
                        ?.fluid as any
                    }
                  />
                </div>
              )}
              <div className="flex-shrink">
                <header>
                  <h3 className="my-0">
                    <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                      {title}
                    </Link>
                  </h3>
                  <small>{node.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                </section>
              </div>
            </article>
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
            date(formatString: "MMMM DD, YYYY")
            title
            description
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
