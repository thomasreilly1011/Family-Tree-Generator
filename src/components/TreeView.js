import React, { Fragment } from 'react'
import {Table} from 'react-bootstrap'
import FamilyMember from './FamilyMember'
import Line from './Line.js'
import FamilyTile from './FamilyTile'

class TreeView extends React.Component {
    constructor() {
        super()
        this.state = {
            generations: 2,
            max_width: 4,
            families:[
                {
                    id: "f0",
                    generation: 2,
                    name: "Reilly",
                    members: [
                        {id: "m0", forename: "Thomas", surname: "Reilly", parent: "f0", child: null}, 
                        {id: "m1", forename: "James", surname: "Reilly", parent: "f0", child: null},
                        {id: "m2", forename: "Emily", surname: "Reilly", parent: "f0", child: null},
                        {id: "m3", forename: "Irene", surname: "Reilly", parent: "f1", child: "f0"},
                        {id: "m4", forename: "Padraig", surname: "Reilly", parent: "f3", child: "f0"},
                    ],
                },
                {
                    id: "f1",
                    generation: 1,
                    name: "Doran",
                    members: [
                        {id: "m5", forename: "Sally", surname: "Doran", parent: null, child: "f1"}, 
                        {id: "m6", forename: "Michael", surname: "Doran", parent: null, child: "f1"},
                        {id: "m7", forename: "Sandra", surname: "Doran", parent: "f1", child: "f2"},
                        {id: "m3", forename: "Irene", surname: "Reilly", parent: "f1", child: "f0"},
                    ],
                },
                {
                    id: "f2",
                    generation: 2,
                    name: "Doran",
                    members: [
                        {id: "m7", forename: "Sandra", surname: "Doran", parent: "f1", child: "f2"}, 
                        {id: "m9", forename: "Luke", surname: "Doran", parent: "f2", child: null},
                    ],
                },
                {
                    id: "f3",
                    generation: 1,
                    name: "Reilly",
                    members: [
                        {id: "m10", forename: "Mary", surname: "Reilly", parent: null, child: "f3"}, 
                        {id: "m11", forename: "Packie", surname: "Reilly", parent: null, child: "f3"},
                        {id: "m12", forename: "Seamus", surname: "Reilly", parent: "f3", child: null},
                        {id: "m4", forename: "Padraig", surname: "Reilly", parent: "f3", child: "f0"},
                    ],
                },
            ]
        }
        this.addChild = this.addChild.bind(this)
        this.addParent = this.addParent.bind(this)
    }

    addChild(id, forename, surname) {
        var parent = null
        var familyIdx
        var memberIdx
        var currGen
        this.state.families.forEach((family, fIdx) => {
            family.members.forEach((member, mIdx) => {
                if (member.id === id) {
                    familyIdx = fIdx
                    memberIdx = mIdx
                    parent = member
                    currGen = family.generation
                    return
                }
                if (parent != null) {
                    return
                }
            })
            
        })

        if (parent.child == null) {
            // Edit parent & create new family
            const newFamilyID =  'f' + (this.state.maxFamilyID + 1)
            parent.child = newFamilyID
            const newFamily = {
                id: newFamilyID,
                generation: currGen + 1,
                name: "Test",
                members: [
                    parent,
                    {
                        id: 'm' + (this.state.maxMemberID + 1),
                        forename: forename,
                        surname: surname,
                        parent: newFamilyID,
                        child: null
                    },
                ]
            }
            const newState = this.state
            newState.families.push(newFamily)
            newState.maxFamilyID++
            newState.maxMemberID++
            newState.families[familyIdx].members[memberIdx] = parent
            console.log(newFamily)
            this.setState(newState)
        } else {
            // Find the child family & add a new member
            var childFamilyID = parent.child
            var childFamilyIdx
            this.state.families.forEach((family, fIdx) => {
                if (family.id === childFamilyID) {
                    childFamilyIdx = fIdx
                    return
                }
            })
            const newState = this.state
            newState.families[childFamilyIdx].members.push({
                id: 'm' + (this.state.maxMemberID + 1),
                forename: forename,
                surname: surname,
                parent: childFamilyID,
                child: null
            })
            newState.maxMemberID++
            this.setState(newState)
        }

    }

    addParent(id, forename, surname) {

    }

    /* */
    generateFamily(family, col, table, linkMember, linkFamily, linkIsChild) {
        //Create the family
        table[family.generation*2][col] = [<FamilyTile key={0} id={family.id} name={family.name}/>]
        var parentsRow = family.generation * 2 - 1
        if (parentsRow < 0) parentsRow = 0
        var childrenRow = family.generation * 2 + 1
        //Parents
        var parents = []
        table[parentsRow][col] = []
        family.members.forEach((member, idx) => {
            if (member.child === family.id && member.id !== linkMember) {
                parents.push(member)
                table[parentsRow][col].push(<FamilyMember key={idx} info={member} addChild={this.addChild} />)
                console.log(member.forename)
            }
        });
        //Children
        var children = []
        table[childrenRow][col] = []
        family.members.forEach((member, idx) => {
            if (member.parent === family.id && member.id !== linkMember) {
                children.push(member)
                table[childrenRow][col].push(<FamilyMember key={idx} info={member} addChild={this.addChild} />)
                console.log(member.forename)
            }
        });
        
        //Draw the lines
        parents.forEach((parent, idx) => {
            table[family.generation*2][col].push(
                <Line key={"pl" + idx} from={family.id} to={parent.id}
                    fromAnchor="top" 
                    toAnchor="bottom"  
                />
            )
        });
        children.forEach((child, idx) => {
            table[family.generation*2][col].push(
                <Line key={"cl"+idx} from={family.id} to={child.id}   
                    fromAnchor="bottom" 
                    toAnchor="top"
                />
            )
        });
        if (linkMember != null && linkIsChild) {
            table[family.generation*2][col].push(
                <Line key="l" from={family.id} to={linkMember}
                    fromAnchor="top" 
                    toAnchor="bottom"  
                />
            )
        } else if (linkMember != null && !linkIsChild) {
            table[family.generation*2][col].push(
                <Line key="l" from={family.id} to={linkMember}
                    fromAnchor="bottom" 
                    toAnchor="top"  
                />
            )
        }
        // Find the linking families and generate them
        parents.forEach((parent, idx) => {
            if (parent.parent !== null && parent.parent !== linkFamily) {
                var newFamily = this.state.families.find(family => {
                    return family.id === parent.parent
                })
                if (idx < parents.length/2) {
                    // Place at the upper left
                    this.generateFamily(newFamily, col-1, table, parent.id, family.id, false)
                    return 0
                } else {
                    // Place at the upper right
                    this.generateFamily(newFamily, col+1, table, parent.id, family.id, false)
                    return 0
                }
            }
        })
        children.forEach((child, idx) => {
            if (child.child !== null && child.child !== linkFamily) {
                var newFamily = this.state.families.find(family => {
                    return family.id === child.child
                })
                if (table[(family.generation+1)*2][col][0] == null) {
                    this.generateFamily(newFamily, col, table, child.id, family.id, true)
                    return 0
                }
                var index = 1
                while (index < 10) {
                    if (table[(family.generation+1)*2][col-index][0] == null) {
                        this.generateFamily(newFamily, col-index, table, child.id, family.id, true)
                        break
                    }
                    if (table[(family.generation+1)*2][col+index][0] == null) {
                        this.generateFamily(newFamily, col+index, table, child.id, family.id, true)
                        break
                    }
                    index++
                }
            }
        })
    }
    
    render() {
        //Initialize the table
        var table = new Array(this.state.generations * 2 + 2)
        for (var i=0; i<table.length; i++) {
            table[i] = new Array(this.state.max_width)
            for (var j=0; j<table[i].length; j++) {
                table[i][j] = []
            }
        }
        //Create families recursively
        this.generateFamily(this.state.families[0], this.state.max_width/2, table, null, null, null)
        var string = ""
        table.forEach(row => {
            row.forEach(col => {
                if (col == null) {
                    string += "  , "
                } else if (col[0] == null) {
                    string += "[], "
                } else if (Array.isArray(col)) {
                    string += 'ar' + ", "
                }
            })
            string += "\n"
        })
        console.log(string)
        i = 1000
        return (
            <Fragment>
                <div id="treeView">
                    <Table className="container" borderless>
                        <tbody>
                            {table.map((row, id) => {
                                return (<tr key={id}>
                                    {row.map((col, idx) => {
                                        return (
                                            <td className="column" key={idx}>{col}</td>      
                                        )
                                    })}
                                </tr>)
                            })}
                        </tbody>
                    </Table> 
                </div>
            </Fragment>
            
        )
    }
}

export default TreeView