/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import Image from 'next/image';
import { signOut } from '../utils/auth';
import logo from '../public/photos/logo.png';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <Image
              src={logo}
              className="img"
              width={75}
              height={75}
              alt="Sole Sync logo"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/creators">
              <Nav.Link>Creators</Nav.Link>
            </Link>
            <Link passHref href="/mycollection">
              <Nav.Link>My Collection</Nav.Link>
            </Link>
            <Link passHref href="/sneaker/new">
              <Nav.Link>Add Sneaker</Nav.Link>
            </Link>
            <Link passHref href="/brands">
              <Nav.Link>Brands</Nav.Link>
            </Link>

            <SearchBar />
            <Button type="search">Search</Button>

            <Button variant="danger" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
