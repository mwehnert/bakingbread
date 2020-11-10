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
          <span
            style={{
              backgroundColor: "var(--lightBg)",
              color: "var(--textNormal)",
            }}
            className="inline-block rounded-sm px-2 py-1 text-xs font-semibold mr-2 mb-2"
          >
            #{tag}
          </span>
        ))}
    </section>
  )
}

export default Tags
