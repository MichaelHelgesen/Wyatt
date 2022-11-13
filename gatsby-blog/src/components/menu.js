import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
//import * as style from "../components/menu.module.scss"

const Menu = () => (
      <Layout>
        <h1>Laverne Wyatt</h1>
      <ul style={{display: "flex", listStyleType: "none", justifyContent: "space-between"}}>
        <li>
            <Link to="/" >Home</Link>
        </li>
        <li>
            <Link to="/work-and-events"  partiallyActive={true}>Work and Events</Link>
        </li>
        <li>
            <Link to="/blog"  partiallyActive={true}>Blog</Link>
        </li>
        <li>
            <Link to="/podcasts"  partiallyActive={true}>Podcasts</Link>
        </li>
        <li>
            <Link to="/about"  partiallyActive={true}>About</Link>
        </li>
        <li>
            <Link to="/contact"  partiallyActive={true}>Contact</Link>
        </li>
    </ul>
    </Layout>
)

export default Menu