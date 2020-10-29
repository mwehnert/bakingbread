import React from "react"
import { Link } from "gatsby"
import { AiFillInstagram } from "react-icons/ai"
import ThemeToggle from "./ThemeToggle"
import { scale } from "../utils/typography"
import useTheme from "../hooks/useTheme"
import Logo from "../assets/logo.svg"
import Footer from "./Footer"
import "./global.css"

const Header = () => (
  <div className="flex p-4 flex-row-reverse w-full lg:flex-col justify-between items-center">
    <div className="flex lg:flex-row flex-col items-center">
      <ThemeToggle />
      <AiFillInstagram
        onClick={() => {
          // eslint-disable-next-line no-undef
          window.location.assign("https://www.instagram.com/bakingbread.blog/")
        }}
        className="w-8 h-8 p-1 cursor-pointer"
      />
    </div>
    <h2
      className="my-0 w-48 lg:w-64"
      style={{
        ...scale(1),
      }}
    >
      <Link
        style={{
          boxShadow: `none`,
          color: `inherit`,
        }}
        to="/"
        title="Home"
      >
        <Logo className="h-full w-full fill-current stroke-current" />
      </Link>
    </h2>
  </div>
)

const Layout: React.FC = ({ children }) => {
  const currentTheme = useTheme()

  return (
    <div
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--textNormal)",
        transition: "color 0.2s ease-out, background 0.2s ease-out",
        minHeight: "100vh",
      }}
    >
      <div className="sidebar h-topbar w-full lg:h-screen lg:w-sidebar fixed top-0 text-center">
        <div
          className={`h-full p-4 flex flex-col justify-center items-center bg-sidebar-pattern-${
            currentTheme || "light"
          }`}
          style={{ minHeight: 200 }}
        >
          <Header />
        </div>
      </div>

      <div className="w-full main-content px-8 absolute top-topbar lg:top-0 lg:h-screen lg:w-not-sidebar lg:ml-sidebar lg:px-40 lg:py-0">
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
