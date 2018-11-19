import React, { Component } from 'react'
import './progress.css'

class Progress extends Component {
    progressHandler = (e) => {
        e.stopPropagation();        
        let pro = this.refs.pro;
        let progress = (e.clientX - pro.getBoundingClientRect().left) / pro.clientWidth;        
        this.props.progressChange(progress);
    }
    render() {
        return (
            <div className="component-progress" ref="pro" onClick={this.progressHandler}>
                <div className="progress" style={{ width: `${this.props.progress}%`,background: this.props.barColor}}></div>
            </div>
        );
    }
}
Progress.defaultProps = {
    barColor: '#2f9842'
};
export default Progress;