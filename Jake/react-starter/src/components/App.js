import React, { Component } from 'react';
const algorithms = require('../data/Algorithms');
const data_set = require('../data/dataset');

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
      data_set: data_set.cities,
      path: []
    };
  }

  drawLine(start, end) {
    // console.log('start: ' + start)
    // console.log('end: ' + end)
    this.context.beginPath()
    this.context.lineWidth = 5
    this.context.moveTo(start.x, start.y)
    this.context.lineTo(end.x, end.y)
    this.context.stroke()
  }

  updateTSPVertices(set) {
    // when the TSP has a set of vertices (cities), draw them as small
    // circles here.
    console.log(this.state.data_set)
    set.forEach((city) => {
      this.drawCircle(city)
    })
  }

  updateTSPPath() {
    // when the TSP has computed the "best" path, draw it here along the circles

    // console.log('this.state.path' + this.state.path)

    this.state.path = this.state.algorithm(this.state.data_set).bestTrip;
    const path_length = this.state.path.length

    for (let i = 1; i < path_length; i++) {
      this.drawLine(this.state.data_set[i-1], this.state.data_set[i])
    }
    this.drawLine(this.state.data_set[path_length-1], this.state.data_set[0]) // draw from end to beginning
  }

  drawCircle(object, radius = 10) {
    let r = Math.floor(Math.random()*255)
    let g = Math.floor(Math.random()*255)
    let b = Math.floor(Math.random()*255)

    this.context.beginPath();
    this.context.arc(object.x, object.y, radius, 0, 2*Math.PI, false);
    this.context.fillStyle = 'rgba('+r+','+g+','+b+',1.0)';
    this.context.fill();
    this.context.stroke();
  }

  click() {
    // this.updateTSPPath();
  }

  render() {
    return (
      <div>
        <div style={canvasContainerStyle}>
          <canvas id="TSP" ref={(c) => this.context = c.getContext('2d')} height={canvasStyle.height} width={canvasStyle.width} style={canvasStyle} onClick={() => this.click()} />
        </div>
        <div>
          <button onClick={() => this.updateTSPVertices(this.state.data_set)}> Cities </button>
          <button onClick={() => this.updateTSPPath()}> Show Path </button>
        </div>
      </div>
    );
  }
}
