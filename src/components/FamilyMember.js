import React from 'react'
import blankProfile from '../blank-profile.png'
import MemberModal from './MemberModal'

class FamilyMember extends React.Component {
    
    render() {
        var image
        if(this.props.imgurl == null) {
            image = <img className="profilePic" src={blankProfile} alt="Family Member Thumbnail"></img>
        }
        return (
            <div className={"member " + this.props.info.id}>
                {image}
                <h4>{this.props.info.forename + ' ' + this.props.info.surname}</h4>
                <MemberModal info={this.props.info} addChild={this.props.addChild} />
            </div>
        )
    }
}

export default FamilyMember