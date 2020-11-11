import React from "react"

const Category: React.FC = ({ children }) => (
  <span
    style={{
      backgroundColor: "var(--invertLightBg)",
      color: "var(--lightBg)",
    }}
    className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
  >
    {children}
  </span>
)

export default Category
