import React from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

class MemberModal extends React.Component {
      constructor(){
        super();
        this.state = {
            showHide : false,
            showHideNewMember : false,
        }
    }

    toggleMemberModal() {
        this.setState({ showHide: !this.state.showHide })
    }

    toggleAddChildModal() {
      this.toggleMemberModal()
      this.setState({ showHideNewMember: !this.state.showHideNewMember})
    }

    handleAddChildSubmit(forename, surname) {
      this.toggleAddChildModal()
      this.props.addChild(this.props.info.id, forename, surname)
    }

    render(){
      return(
          <div>
              <Button variant="primary" onClick={() => this.toggleMemberModal()}>
                  Edit
              </Button>

              <Modal show={this.state.showHide}>

                  <Modal.Header closeButton onClick={() => this.toggleMemberModal()}>
                  <Modal.Title>{this.props.info.forename + ' ' + this.props.info.surname}</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <p>Forename: {this.props.info.forename}</p>
                    <p>Surname: {this.props.info.surname}</p>
                    <hr />
                    <Button className="addButton" onClick={() => this.toggleAddChildModal()}>Add a Child</Button>
                    <Button className="addButton">Add a Parent</Button>
                  </Modal.Body>
                  
                  <Modal.Footer>
                  <Button variant="secondary" onClick={() => this.toggleMemberModal()}>
                      Close
                  </Button>
                  <Button variant="primary" onClick={() => this.toggleMemberModal()}>
                      Save Changes
                  </Button>
                  </Modal.Footer>

              </Modal>

              <Modal show={this.state.showHideNewMember}>

                  <Modal.Header closeButton onClick={() => this.toggleAddChildModal()}>
                  <Modal.Title>New Child</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="newMemberForename">
                        <Form.Label>Forename</Form.Label>
                        <Form.Control placeholder="Enter Forename" />
                      </Form.Group>

                      <Form.Group controlId="newMemberSurname">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control placeholder="Surname" />
                      </Form.Group>

                    </Form>
                  </Modal.Body>
                  
                  <Modal.Footer>
                  <Button variant="secondary" onClick={() => this.toggleAddChildModal()}>
                      Close
                  </Button>
                  <Button variant="primary" onClick={() => this.handleAddChildSubmit(document.getElementById("newMemberForename").value, document.getElementById("newMemberSurname").value)}>
                      Add Member
                  </Button>
                  </Modal.Footer>

              </Modal>

          </div>
      )
  }
    
}

export default MemberModal;