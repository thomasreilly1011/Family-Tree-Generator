import React from 'react'
import {SteppedLineTo} from 'react-lineto'

class Line extends React.Component {
    state = {from: this.props.from, to: this.props.to}
    from = this.props.from
    to = this.props.to

    render() {
      return (
        <SteppedLineTo from={this.state.from} to={this.state.to}
        fromAnchor={this.props.fromAnchor}
        toAnchor={this.props.toAnchor} 
        borderColor="black"
        borderStyle="solid"
        borderWidth={5}
        within="App"
        orientation="v"
        delay={1}/>
      )
    }

    componentDidMount() {
      window.addEventListener('resize', function(){
        this.setState({from: this.from, to: this.to})
      }.bind(this));

      window.addEventListener('scroll', function(){
        this.setState({from: this.from, to: this.to})
      }.bind(this));
      
      var treeView = document.getElementById("treeView")

      treeView.addEventListener('scroll', function(){
        this.setState({from: this.from, to: this.to})
      }.bind(this));

      
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    }
}

export default Line