import React from 'react'
import {Modal, Button} from 'react-bootstrap'

class NewMemberModal extends React.Component {
    render(){
      return(
          <div>
              <Modal show={this.state.showHide}>

                  <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                  <Modal.Title>New Member</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    
                  </Modal.Body>
                  
                  <Modal.Footer>
                  <Button variant="secondary" onClick={() => this.handleModalShowHide()}>
                      Close
                  </Button>
                  <Button variant="primary" onClick={() => this.handleModalShowHide()}>
                      Add Member
                  </Button>
                  </Modal.Footer>

              </Modal>

          </div>
      )
  }

}

export default NewMemberModal;