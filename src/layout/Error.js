import React, { Component } from 'react'
import Header from '../layout/Header';
import Menulat from '../layout/Menulat';
import Footer from '../layout/Footer';

class Error extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40 center-div" style={{height: '800px'}}>
                            <h3 className="title-not-found">Página no encontrada</h3>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );

    }
}
export default Error;