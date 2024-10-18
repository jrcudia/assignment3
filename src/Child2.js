import React, { Component } from 'react';
import * as d3 from 'd3';

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props.data2);
  }

  componentDidUpdate() {
    let data = this.props.data2;

    let margin = { top: 10, right: 10, bottom: 30, left: 30 },
        w = 600 - margin.left - margin.right,
        h = 400 - margin.top - margin.bottom;
    
        let temp_data = d3.flatRollup(
            data,
            v => d3.mean(v, (d) => d.tip), 
            d => d.day 
        )

        let x_data = temp_data.map(item => item[0]) 
        let y_data = temp_data.map(item => item[1]) 

        let container = d3.select('.child2_svg')
        .attr('width', w + margin.left + margin.right)
        .attr('height', h + margin.top + margin.bottom)
        .select('.g_2')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

        let x_scale = d3.scaleBand().domain(x_data).range([margin.left + 10, w]).padding(0.1);
        container.selectAll('.x_axis_g').data([0]).join('g')
            .attr('class', 'x_axis_g')
            .attr('transform', `translate(0, ${h - 20})`)
            .call(d3.axisBottom(x_scale))
        
        let y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h - 20, 20]);
        container.selectAll('.y_axis_g').data([0]).join('g')
            .attr('class', 'y_axis_g')
            .attr('transform', `translate(${margin.left + 10}, 0)`)
            .call(d3.axisLeft(y_scale)); 
        
        container.selectAll('.my_title').data([0]).join('text')
            .attr('class', 'my_title')
            .attr('transform', `translate(${(w + margin.left) / 2}, ${margin.top})`)
            .text('Average Tip by Day')
            .attr('text-anchor', 'middle')
            .style('font-weight', 'bold');
        
        container.selectAll('.x_label').data([0]).join('text')
            .attr('class', 'x_label')
            .attr('transform', `translate(${(w + margin.left) / 2}, ${h + 20})`)
            .text('Day')
            .attr('text-anchor', 'middle')
            .style('font-weight', 'bold');
        
        container.selectAll('.y_label').data([0]).join('text')
            .attr('class', 'y_label')
            .attr('transform', `translate(0, ${h / 2}) rotate(-90)`)
            .text('Average Tip')
            .attr('text-anchor', 'middle')
            .style('font-weight', 'bold');

        container.selectAll('rect')
            .data(temp_data)
            .join('rect')
            .attr('x', d => x_scale(d[0]))
            .attr('y', d => y_scale(d[1]))
            .attr('width', x_scale.bandwidth())
            .attr('height', d => h - 20 - y_scale(d[1]))
            .attr('fill', '#69b3a2');
  }

  render() {
    return (
      <svg className='child2_svg'>
        <g className='g_2'></g>
      </svg>
    )
  }
}

export default Child2;