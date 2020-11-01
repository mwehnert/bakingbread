import { Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import React from "react"
import useTheme from "../hooks/useTheme"

interface TagsProps {
  tags: string[]
}

const Tags: React.FC<TagsProps> = ({ tags = [] }) => {
  return (
    <section>
      {tags &&
        tags.map((tag) => (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{tag}
          </span>
        ))}
    </section>
  )
}

export default Tags
