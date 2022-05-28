import React, { Component } from 'react';
class Sino extends Component {
    state = { sino:['Si', 'No'] };
    componentDidMount(){ }
    render() { 
        const noms = this.props.noms;
        return( 
            <React.Fragment>
                <div className="row">
                {
                    this.state.sino.map((con, i) => {
                        return (
                            <React.Fragment key={i}>
                                <div className="col-lg-3">{con}</div>
                                <div className="col-lg-3"><input name={noms} className="form-control" value={con} type="radio" required /></div>
                            </React.Fragment> 
                        )
                    })
                }
                </div>
            </React.Fragment>
        ) 
    }
}
export default Sino;