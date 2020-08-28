import React from 'react';
import {Navbar, Nav} from 'react-bootstrap'
import TreeView from './components/TreeView'

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" expand="lg" variant="dark" className="header">
        <Navbar.Brand href="#home">Family Tree Generator</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Tree View</Nav.Link>
            <Nav.Link href="#link">List View</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <TreeView />
    </div>
  )
}

export default App;
