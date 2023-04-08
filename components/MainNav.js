import React, { useState, useRef } from 'react'
import { Container, Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useRouter } from "next/router";
import Link from 'next/link';
import { useAtom } from "jotai";
import { searchHistoryAtom } from '@/store';
import { removeToken } from '@/lib/authenticate';
import { addToHistory } from '@/lib/userData';
import { readToken } from '@/lib/authenticate';
export default function MainNav() {
  const router = useRouter()
  var token = readToken()
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
  const [search, setsearch] = useState('')
  function logout() {
    setIsExpanded(false)
    removeToken()
    router.push("/login");
  }

  const [isExpanded, setIsExpanded] = useState(false);
  var username = token ? token.userName : 'No user'

 
  async function handleSubmit(e) {
    e.preventDefault();
    if (search == "") {
      setsearch("");
    } else {
      setSearchHistory(await addToHistory(`title=true&q=${search}`));

      router.push(`/artwork?title=true&q=${search}`)
      setIsExpanded(false);
      setsearch("");
    }
  }


  return (

    <>
      <Navbar className='fixed-top navbar-dark bg-dark' expanded={isExpanded}>
        <Container fluid>
          <Navbar.Brand >Tanvir Singh</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" expanded={!isExpanded} />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link href="/" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/"} onClick={() => setIsExpanded(false)} >Home</Nav.Link>
              </Link>

              {token && <Link href="/search" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/search"} onClick={() => setIsExpanded(false)}>Advanced Search</Nav.Link>
              </Link>}


            </Nav>
            {!token &&

              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === "/"} onClick={() => setIsExpanded(false)}  >Register</Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === "/search"} onClick={() => setIsExpanded(false)} >Login</Nav.Link>

                </Link>
              </Nav>
            }


            &nbsp;  {token && <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
              <Button type="submit" variant="outline-success">Submit</Button>


            </Form>
            }&nbsp;

            <Nav>
              {
                token &&
                <NavDropdown title={username} id="basic-nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item href="/favourites" active={router.pathname === "/favourites"} onClick={() => setIsExpanded(false)} >Favourites</NavDropdown.Item>
                  </Link>

                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item href="/history" active={router.pathname === "/history"} onClick={() => setIsExpanded(false)} >Search History</NavDropdown.Item>
                  </Link>
 <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item href="/history" onClick={() =>logout()} >Logout</NavDropdown.Item>
                  </Link>
                </NavDropdown>
              }   </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  )
}
