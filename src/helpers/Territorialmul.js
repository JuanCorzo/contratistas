import React, { Component } from "react";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import axios from 'axios';
import global from '../Global';
//import { format } from "date-fns";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props} className="chcmult">
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label className="chcmult">{props.label}</label>
      </components.Option>
    </div>
  );
};
class Ordenmul extends Component {
  state = { tipon:[] };
  componentDidMount() {
    axios.get(global.url + "aportantes/territoriales/terri", global.autentica)
    .then(res => {
        let tipon = res.data;
        this.setState({ tipon });
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null
    };
  }
  handleChange = (selected) => {
    var sele="";
    selected.forEach(element => {
      sele+=element.value+",";
    });
    sele=sele.substring(0,sele.length-1);
    this.setState({optionSelected: selected});
    this.props.devuelveterri(sele);
  };
  render() {
    return (
      <span
        class="d-inline-block selectdin"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please selecet account(s)"
      >
        <ReactSelect 
          options={this.state.tipon}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option
          }}
          onChange={this.handleChange}
          allowSelectAll={true}
          value={this.state.optionSelected}
        />
      </span>
    );
  }
}
export default Ordenmul;