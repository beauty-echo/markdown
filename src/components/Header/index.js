import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import Dropdown from '../Dropdown';
import { showExample, toggleSidebar, getAllDocments, showModal } from '../../action';
import './index.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSidebarOpen !== this.props.isSidebarOpen) {
      document.querySelector('#app').classList.toggle('open-sidebar');
    }
  }

  onSelect = (item) => {
    this.props.showExample({key: item})
  }

  print = () => {
    window.print();
  }

  onToggle = () => {
    const { toggleSidebar, getAllDocments } = this.props;
    toggleSidebar();
    getAllDocments();
  }

  showModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.showModal();
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg justify-content-between">
        <button className="navbar-toggler" type="button" onClick={this.onToggle}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">Markdown</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <Dropdown type="link" name="Examples" options={['Bootstrap', 'React', 'Vue']} onSelect={this.onSelect} />
            <li className="nav-item">
              <a className="nav-link" onClick={this.showModal}>Image To Base64</a>
            </li>
          </ul>
        </div>
        {this.props.current &&
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" onClick={this.print}>Save as PDF</a>
            </li>
          </ul>
        }
      </nav>
    );
  }
}

export default connect(
  (state) => ({
    current: state.current,
    isSidebarOpen: state.isSidebarOpen
  }), {
    showExample,
    toggleSidebar,
    getAllDocments,
    showModal
  }
)(Header);
