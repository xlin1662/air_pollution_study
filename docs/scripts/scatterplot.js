
// Define three different data sets
    const dataPoints = {
      Africa: [ {x: 2019 ,y: 29.7835897435897 } , {x: 2018 ,y: 30.1880769230769 } , {x: 2017 ,y: 30.4296581196581 } , {x: 2016 ,y: 30.5328632478632 } , {x: 2015 ,y: 30.7505982905983 } , {x: 2014 ,y: 29.2135042735043 } , {x: 2013 ,y: 28.9297435897436 } , {x: 2012 ,y: 29.8975641025641 } , {x: 2011 ,y: 29.3890598290598 } , {x: 2010 ,y: 29.0081623931624 } ],
      Americas: [ {x: 2019 ,y: 13.3438461538462 } , {x: 2018 ,y: 13.9173372781065 } , {x: 2017 ,y: 14.7398816568047 } , {x: 2016 ,y: 14.8853846153846 } , {x: 2015 ,y: 15.1281065088757 } , {x: 2014 ,y: 14.9898816568047 } , {x: 2013 ,y: 15.055325443787 } , {x: 2012 ,y: 14.7831952662722 } , {x: 2011 ,y: 14.8272781065089 } , {x: 2010 ,y: 14.7870414201183 } ],
      Europe: [ {x: 2019 ,y: 16.3408461538462 } , {x: 2018 ,y: 18.1583076923077 } , {x: 2017 ,y: 17.8731538461538 } , {x: 2016 ,y: 18.0395 } , {x: 2015 ,y: 18.9423076923077 } , {x: 2014 ,y: 19.2098846153846 } , {x: 2013 ,y: 19.9054615384615 } , {x: 2012 ,y: 20.8101538461538 } , {x: 2011 ,y: 22.0855769230769 } , {x: 2010 ,y: 21.0820769230769 }],
      SEA: [ {x: 2019 ,y: 29.7794444444444 } , {x: 2018 ,y: 30.9266666666667 } , {x: 2017 ,y: 30.2911111111111 } , {x: 2016 ,y: 32.1838888888889 } , {x: 2015 ,y: 32.2914814814815 } , {x: 2014 ,y: 32.5953703703704 } , {x: 2013 ,y: 35.3611111111111 } , {x: 2012 ,y: 33.2411111111111 } , {x: 2011 ,y: 32.1085185185185 } , {x: 2010 ,y: 32.6792592592593 }],
      WP: [ {x: 2019 ,y: 14.5214406779661 } , {x: 2018 ,y: 14.4204237288136 } , {x: 2017 ,y: 14.8567796610169 } , {x: 2016 ,y: 15.6818644067797 } , {x: 2015 ,y: 15.5088983050847 } , {x: 2014 ,y: 15.5881355932203 } , {x: 2013 ,y: 16.6377966101695 } , {x: 2012 ,y: 15.9176271186441 } , {x: 2011 ,y: 15.8994915254237 } , {x: 2010 ,y: 15.9431355932203 } ],
    EM:[ {x: 2019 ,y: 37.8318181818182 } , {x: 2018 ,y: 39.1671818181818 } , {x: 2017 ,y: 38.2893636363636 } , {x: 2016 ,y: 38.0463636363636 } , {x: 2015 ,y: 38.9341818181818 } , {x: 2014 ,y: 37.3817272727273 } , {x: 2013 ,y: 38.7329090909091 } , {x: 2012 ,y: 38.7138181818182 } , {x: 2011 ,y: 38.2147272727273 } , {x: 2010 ,y: 38.7247272727273 } ]};

    // Initial data points to display
    // const selectedDataPoints = ["dataPoint1", "dataPoint2", "dataPoint3"];

    // Define dimensions and margins
    const margin = { top: 20, right: 20, bottom: 50, left: 40 };
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

      // x axis label
     svg.append("text")
      .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Year");

    // Y axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Avg PM 2.5");


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
  if (Object.keys(data_dict).length>0){ // Plot only when the data isn't empty.
  svg.selectAll(".dot")
           .data(coordinates)
           .enter().append("circle")
           .attr("class", "dot")
           .attr("cx", d => x(d.x))
           .attr("cy", d => y(d.y))
           .attr("r", 5);
  }
};

// Africa
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

// Americas
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


d3.selectAll('input[name=box3]').on('change',function(){
  coordinates = [];
  if (this.checked){
    data_dict.Europe = dataPoints.Europe; // add data
  } else {
    delete data_dict.Europe; // delete data
  }
  compute_coord();
  plotScatterplot();
})

// south east asia
d3.selectAll('input[name=box4]').on('change',function(){
  coordinates = [];
  if (this.checked){
    data_dict.SEA = dataPoints.SEA; // add data
  } else {
    delete data_dict.SEA; // delete data
  }
  compute_coord();
  plotScatterplot();
})

// west p
d3.selectAll('input[name=box5]').on('change',function(){
  coordinates = [];
  if (this.checked){
    data_dict.WP = dataPoints.WP; // add data
  } else {
    delete data_dict.WP; // delete data
  }
  compute_coord();
  plotScatterplot();
})


// Eastern Mediterranean
d3.selectAll('input[name=box6]').on('change',function(){
  coordinates = [];
  if (this.checked){
    data_dict.EM = dataPoints.EM; // add data
  } else {
    delete data_dict.EM; // delete data
  }
  compute_coord();
  plotScatterplot();
})


