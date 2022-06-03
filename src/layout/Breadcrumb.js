import React, { Component } from 'react';

class Breadcrumb extends Component {
  render(){  
    return (
      <nav>
        <ol className="breadcrumb mt-3">
          {
              this.props.links.map((val, i) => {
              return (
                      <li key={i} className={(i===this.props.links.length?"breadcrumb-item active":"breadcrumb-item")}><a href={val.href}>{val.name}</a></li>
                    ) 
              })
          }
        </ol>
      </nav>
    )
  }
}
export default Breadcrumb;