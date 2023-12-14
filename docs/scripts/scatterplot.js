
// Define three different data sets
    const dataPoints = {
      Africa: [ {x: 2019 ,y: 29.7835897435897 } , {x: 2018 ,y: 30.1880769230769 } , {x: 2017 ,y: 30.4296581196581 } , {x: 2016 ,y: 30.5328632478632 } , {x: 2015 ,y: 30.7505982905983 } , {x: 2014 ,y: 29.2135042735043 } , {x: 2013 ,y: 28.9297435897436 } , {x: 2012 ,y: 29.8975641025641 } , {x: 2011 ,y: 29.3890598290598 } , {x: 2010 ,y: 29.0081623931624 } ],
      Americas: [ {x: 2019 ,y: 13.3438461538462 } , {x: 2018 ,y: 13.9173372781065 } , {x: 2017 ,y: 14.7398816568047 } , {x: 2016 ,y: 14.8853846153846 } , {x: 2015 ,y: 15.1281065088757 } , {x: 2014 ,y: 14.9898816568047 } , {x: 2013 ,y: 15.055325443787 } , {x: 2012 ,y: 14.7831952662722 } , {x: 2011 ,y: 14.8272781065089 } , {x: 2010 ,y: 14.7870414201183 } ]
    };

    // Initial data points to display
    // const selectedDataPoints = ["dataPoint1", "dataPoint2", "dataPoint3"];

    // Define dimensions and margins
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select("#scatter-plot")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Define scales for x and y axes
    const x = d3.scaleLinear().domain([2010, 2020]).range([0, width]);
    const y = d3.scaleLinear().domain([10, 50]).range([height, 0]);

    // Create x and y axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    // Append x axis to SVG
    svg.append("g")
       .attr("class", "x-axis")
       .attr("transform", "translate(0," + height + ")")
       .call(xAxis);

    // Append y axis to SVG
    svg.append("g")
       .attr("class", "y-axis")
       .call(yAxis);


let data_dict = {}; // {Africa:[{x:...},{...}]}

let coordinates = [];

function compute_coord(){
  for (let i = 0; i < 10; i++){
    let avg = 0;
    for (let k in data_dict){
      avg += data_dict[k][i].y;
    }
    avg = avg/Object.keys(data_dict).length;
    coordinates.push({x:2010+i,y:avg});
  };

};


function plotScatterplot(){
  svg.selectAll(".dot").remove();
  svg.selectAll(".dot")
           .data(coordinates)
           .enter().append("circle")
           .attr("class", "dot")
           .attr("cx", d => x(d.x))
           .attr("cy", d => y(d.y))
           .attr("r", 5);
};


d3.selectAll('input[name=box1]').on('change',function(){
  coordinates = [];
  if (this.checked){
    data_dict.Africa = dataPoints.Africa; // add data
  } else {
    delete data_dict.Africa; // delete data
  }
  compute_coord();
  plotScatterplot();
})


d3.selectAll('input[name=box2]').on('change',function(){
  coordinates = [];
  if (this.checked){
    data_dict.Americas = dataPoints.Americas; // add data
  } else {
    delete data_dict.Americas; // delete data
  }
  compute_coord();
  plotScatterplot();
})




