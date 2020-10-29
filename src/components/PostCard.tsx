import BackgroundImage from "gatsby-background-image"
import React from "react"
import { MdxFrontmatterImage } from "../../gatsby-graphql"
import useTheme from "../hooks/useTheme"

interface PostCardProps {
  slug: string
  title: string
  description: string
  date: string
  image?: MdxFrontmatterImage
}

const PostCard: React.FC<PostCardProps> = ({
  slug,
  title = "",
  description = "",
  date,
  image = {},
}) => {
  const hasFeatureImage = !!image?.feature?.childImageSharp?.fluid
  return (
    <article className="w-full font-sans sm:flex lg:block xl:flex my-12">
      {hasFeatureImage && (
        <div
          className="h-64 sm:h-auto sm:w-64 lg:h-64 lg:w-auto xl:h-auto xl:w-64 flex-none bg-cover rounded-t sm:rounded-t-none sm:rounded-l lg:rounded-t lg:rounded-l-none xl:rounded-t-none xl:rounded-l text-center overflow-hidden"
          title="image"
        >
          <BackgroundImage
            className="h-full bg-red"
            fluid={
              image ? (image.feature?.childImageSharp?.fluid as any) : null
            }
          />
        </div>
      )}
      <div
        className={`flex-grow border-solid border-grey-100 p-4 flex flex-col justify-between leading-normal ${
          hasFeatureImage
            ? "border-r border-b border-l sm:border-l-0 sm:border-t lg:border-t-0 lg:border-l xl:border-l-0 xl:border-t rounded-b sm:rounded-b-none sm:rounded-r lg:rounded-r-none lg:rounded-b xl:rounded-b-none xl:rounded-r"
            : "border rounded"
        }`}
        style={{
          backgroundColor: "var(--bg)",
          borderColor: "var(--hr)",
        }}
      >
        <div className="mb-8">
          <p className="text-sm flex items-center">Category</p>
          <h2 className="font-bold text-xl mt-0 mb-2">{title}</h2>
          <p
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: description,
            }}
            className="text-grey-darker text-base"
          />
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p>{date}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostCard
