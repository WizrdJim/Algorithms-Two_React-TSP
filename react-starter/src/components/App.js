import React, { Component } from 'react';
const algorithms = require('../data/Algorithms');
const dataset = require('../data/dataset');
let canvasContainerStyle = {
  margin: "10 auto"
}
let canvasStyle = {
  width: "500px",
  height: "500px"
}

export default class TSPCanvas extends Component {
  constructor(props){
    super(props);
    this.state = {
      algorithm: algorithms.exhaustiveAlgorithm,
      dataset: dataset.cities,
      path: []
    };
  }
  updateTSPVertices(set) {
    // when the TSP has a set of vertices (cities), draw them as small
    // circles here.
    let radius = 10;
    console.log(set);
    for(let i = 0; i < set.length; i++) {
      this.drawCircle(set[i], radius)
    }
    
  }
  updateTSPPath() {
    // when the TSP has computed the "best" path, draw it here along the circles
    this.state.path = this.state.algorithm(this.state.dataset);
    console.log(this.state.path);
  }
  drawCircle(object, radius = 20) {
    this.context.beginPath();
    this.context.arc(object.x,object.y,radius,0,2*Math.PI, false);
    this.context.stroke();
  }
  click() {
    this.updateTSPVertices();
  }
  render() {
    return (
      <div>
        <div style={canvasContainerStyle}>
          <canvas id="TSP" ref={(c) => this.context = c.getContext('2d')} height={canvasStyle.height} width={canvasStyle.width} style={canvasStyle} onClick={() => this.click()} />
        </div>
        <div>
          <button onClick={() => this.updateTSPVertices(this.state.dataset)}> cities </button>
          <button onClick={() => this.updateTSPPath()}> Show Path </button>
        </div>
      </div>
    );
  }
}
