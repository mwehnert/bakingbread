import React from "react"

const Footer: React.FC = () => {
  return (
    <footer className="my-12 text-center">
      © {new Date().getFullYear()}, Built with love in Bonn.
    </footer>
  )
}

export default Footer
