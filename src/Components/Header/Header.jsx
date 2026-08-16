import React from 'react'
import { Container, Logo, LogoutBtn } from "../index"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

const Header = () => {

  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-950 border-b border-gray-800 shadow-lg">
      <Container>

        <nav className="flex items-center justify-between py-4">

          {/* Logo */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center transition duration-200 hover:opacity-80"
            >
              <Logo width="75px" />
            </Link>
          </div>

          {/* Navigation */}
          <ul className="flex items-center gap-2">

            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>

                  <button
                    onClick={() => navigate(item.slug)}
                    className={`
                      px-4 py-2
                      text-sm font-medium
                      text-gray-200
                      rounded-lg
                      transition duration-200
                      hover:bg-gray-800
                      hover:text-white
                    `}
                  >
                    {item.name}
                  </button>

                </li>
              ) : null
            )}

            {/* Logout */}
            {authStatus && (
              <li className="ml-2 pl-3 border-l border-gray-700">
                <LogoutBtn />
              </li>
            )}

          </ul>

        </nav>

      </Container>
    </header>
  )
}

export default Header