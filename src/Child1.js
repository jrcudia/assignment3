import React, { Component } from 'react';
import * as d3 from 'd3';

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props.data1);
  }

  componentDidUpdate() {
    let data = this.props.data1;

    let margin = { top: 10, right: 10, bottom: 30, left: 30 },
        w = 600 - margin.left - margin.right,
        h = 400 - margin.top - margin.bottom;
    
    let container = d3.select('.child1_svg')
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .select(".g_1")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
        let x_data = data.map(item => item.total_bill);
        const x_scale = d3.scaleLinear().domain([0, d3.max(x_data)]).range([margin.left + 10, w]);

        container.selectAll('.x_axis_g').data([0]).join('g').attr("class", "x_axis_g")
            .attr("transform", `translate(0, ${h - 20})`).call(d3.axisBottom(x_scale));

        let y_data = data.map(item => item.tip);
        const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h - 20, 20]);

        container.selectAll('.y_axis_g').data([0]).join('g').attr("class", "y_axis_g")
            .attr("transform", `translate(${margin.left + 10}, 0)`).call(d3.axisLeft(y_scale));
        
        container.selectAll('.my_title').data([0]).join('text')
            .attr("class", "my_title").text('Total Bill vs. Tips')
            .attr("x", (w + margin.left) / 2)
            .attr("y", margin.top)
            .attr("text-anchor", "middle")
            .style('font-weight', 'bold')
        
        container.selectAll('.x_label').data([0]).join('text')
            .attr('class', 'x_label').text('Total Bill')
            .attr('x', (w + margin.left) / 2)
            .attr('y', h + 20)
            .attr('text-anchor', 'middle')
            .attr('font-weight', 'bold')
        
        container.selectAll('.y_label').data([0]).join('text')
            .attr('class', 'y_label').text('Tips')
            .attr('x', 0)
            .attr('y', h / 2)
            .attr('transform', `rotate(-90, 5, ${h / 2})`)
            .attr('text-anchor', 'middle')
            .attr('font-weight', 'bold')
        
        container.selectAll("circle")
            .data(data)
            .join("circle")
            .attr("cx", d => x_scale(d.total_bill))
            .attr("cy", d => y_scale(d.tip))
            .attr("r", 3)
            .style("fill", "#69b3a2");
  }

  render() {
    return (
      <svg className='child1_svg'>
        <g className='g_1'></g>
      </svg>
    )
  }
}

export default Child1;