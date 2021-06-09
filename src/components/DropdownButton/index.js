import React, { Component } from "react";
class DropdownButton extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: false
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  componentDidMount() {
    // console.log(this.name.offsetWidth);
    this.setState({ width: 3 });
    // console.log(this.state.width);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true, width: this.name.offsetWidth }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu(event) {
    if (this.state.showMenu === true) {
      if (!this.dropdownMenu.contains(event.target)) {
        this.setState({ showMenu: false }, () => {
          document.removeEventListener("click", this.closeMenu);
        });
      }
    } else {
      console.log("Dropdown is not open");
    }
  }

  render() {
    var name = this.props.name;

    return (
      <div className="dropdown-wrapper">
        <button
          ref={name => {
            this.name = name;
          }}
          id={name}
          onClick={this.showMenu}
        >
          {this.props.children}
        </button>

        {this.state.showMenu ? (
          <div
            className="dropdown"
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            {Object.keys(this.props.list).map((item, i) => (
              <a
                className="dropdown-item"
                href={this.props.list[item].location}
                data-itemID={this.props.list[item].id}
              >
                {this.props.list[item].name}
                {this.props.content ? (
                  <p>{this.props.list[item].content}</p>
                ) : (
                  ""
                )}
              </a>
            ))}
            
          </div>
        ) : null}
      </div>
    );
  }
}

export default DropdownButton;
