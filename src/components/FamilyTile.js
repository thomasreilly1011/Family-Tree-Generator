import React from 'react'

class FamilyTile extends React.Component {
    
    render() {
      return (
          <div className={"familyTile " + this.props.id}>
              <h4>{this.props.name + ' Family'}</h4>
          </div>
      )
    }
}

export default FamilyTile