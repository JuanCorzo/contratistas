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
                <div class="am-mainpanel">
                    <div class="am-pagebody">
                        <div class="card pd-20 pd-sm-40">
                            <h4>Página no encontrada</h4>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );

    }
}
export default Error;