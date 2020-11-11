import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Image, { FluidObject } from "gatsby-image"

import Bio from "../components/Bio"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { rhythm, scale } from "../utils/typography"
import { BlogPostBySlugQuery, SitePageContext } from "../../gatsby-graphql"
import Category from "../components/Category"

interface BlogPostTemplateProps {
  data: BlogPostBySlugQuery
  pageContext: SitePageContext
}

const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({
  data,
  pageContext,
}) => {
  const post = data.mdx
  const { previous, next } = pageContext

  if (!post || !post.frontmatter) return <></>

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title || ""}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          {post.frontmatter.image?.feature?.childImageSharp?.fluid && (
            <Image
              alt={post.frontmatter.image.credit || ""}
              className="mt-16 mb-0 h-64 w-full object-cover rounded"
              fluid={
                post.frontmatter.image?.feature?.childImageSharp
                  ?.fluid as FluidObject
              }
            />
          )}
          <Category>{post.frontmatter.category}</Category>
          <h1
            style={{
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <MDXRenderer frontmatter={post.frontmatter}>{post.body}</MDXRenderer>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

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
            {previous?.fields?.slug && (
              <Link to={previous.fields?.slug} rel="prev">
                ← {previous.frontmatter?.title}
              </Link>
            )}
          </li>
          <li>
            {next?.fields?.slug && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter?.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        image {
          credit
          feature {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        category
        tags
        steps
        ingredients {
          name
          unit
          amount
          step
        }
      }
    }
  }
`
