import React, { Component } from 'react';

class RecommendedList extends Component {
    state = {
        image: this.props.image
     }
    render() {
        var imageStyle = {
            backgroundImage: "url(" + this.state.image + ")"
        }
        return (
            <a href={this.props.link}>
                <div className="item-wrapper">
                    <div className="item-content">
                        <div className="item-image" style={imageStyle}></div>
                        <h4 className="item-title">
                            {this.props.title}
                        </h4>
                        <div className="item-info">
                        <p>{this.props.genre} • {this.props.movieLength} • {this.props.year}</p>
                        <div className="bottom-info">
                        {this.props.adult === true ? <div className="age-limit">18+</div> : ""}
                        <div className="is-new">
                        NEW
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
            </a>
         );
    }
}

export default RecommendedList;