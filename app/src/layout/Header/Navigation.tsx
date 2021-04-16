import React from "react"
import { NavLink } from "react-router-dom"

interface MenuProps {
  navMenuOpen: boolean
  toggleNavMenu: () => void
  closeNavMenu: () => void
}

// const StyledNavLink = ({
//   to: location,
//   children: text,
// }: NavProps): JSX.Element => (
//   <li className="list-none">
//     <NavLink
//       end
//       to={location}
//       className="_navlink border-b-2 border-black border-opacity-0"
//       activeClassName="border-opacity-100"
//     >
//       {text}
//     </NavLink>
//   </li>
// )

interface LinkProps {
  children: string
  menuOpen: boolean
  closeMenu: () => void
}

const NavLinks = ({
  children,
  menuOpen,
  closeMenu,
}: LinkProps): JSX.Element => {
  return (
    <>
      <div
        aria-hidden
        className={`${
          menuOpen ? "absolute inset-0 h-screen w-screen sm:hidden" : "hidden"
        }`}
        onClick={closeMenu}
      />
      <ul
        className={`items-center text-xl sm:flex sm:flex-row sm:relative sm:inset-0 sm:space-y-0 sm:border-none sm:shadow-none ${
          menuOpen
            ? "flex-col absolute top-16 right-4 py-2 z-10 border-2 border-gray-200 bg-white shadow-md"
            : "hidden"
        }`}
      >
        {children.split(" ").map((link) => (
          <li
            key={link}
            className="list-none text-right p-2 border-b-2 border-transparent hover:border-black hoverAnimation"
          >
            <NavLink to={link.toLowerCase()} onClick={closeMenu}>
              {link}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  )
}

const MenuIcon = (): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="h-8 w-8"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
)

export default ({
  navMenuOpen,
  toggleNavMenu,
  closeNavMenu,
}: MenuProps): JSX.Element => {
  return (
    <nav className="flex flex-col">
      <button
        className="sm:hidden p-2 absolute right-4"
        type="button"
        onClick={toggleNavMenu}
        onKeyDown={(e) => {
          if (e.key === "Escape") closeNavMenu()
        }}
      >
        <MenuIcon />
      </button>
      <NavLinks menuOpen={navMenuOpen} closeMenu={closeNavMenu}>
        Weather Electricity Analysis
      </NavLinks>
    </nav>
  )
}
