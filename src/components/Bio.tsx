/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { BioQueryQuery } from "../../gatsby-graphql"

import { rhythm } from "../utils/typography"

const Bio: React.FC = () => {
  const data =
    useStaticQuery<BioQueryQuery>(graphql`
      query BioQuery {
        avatar: file(absolutePath: { regex: "/bakingbread_bio.jpg/" }) {
          childImageSharp {
            fixed(width: 500, height: 500) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        site {
          siteMetadata {
            author {
              name
              summary
            }
          }
        }
      }
    `) || {}

  if (!data?.site?.siteMetadata) return <></>

  const { author } = data?.site?.siteMetadata

  return (
    <div
      className=""
      style={{
        marginBottom: rhythm(2.5),
      }}
    >
      {data.avatar?.childImageSharp?.fixed && (
        <Image
          fixed={data.avatar.childImageSharp.fixed as any}
          alt={author?.name || "Author image"}
          className="rounded-full w-24 h-24 lg:w-48 lg:h-48 flex-shrink-0 mb-4 mr-4 float-left shadow-lg"
        />
      )}
      <p className="flex-shrink">
        {`Hey, ich bin `}
        <a href="https://matthiaswehnert.com">Matthias aus Bonn</a>
        {`! Auf bakingbread.blog schreib' ich über Brot, Backen und alles, was mit dem
        ein oder andern davon zu tun hat. Eigentlich entwickle ich Software -
        Backen ist nur mein aller liebstes Hobby!`}
      </p>
    </div>
  )
}

export default Bio
