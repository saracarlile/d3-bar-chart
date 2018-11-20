(() => {

    var width = 800;
    var height = 400;
    var margin = {top: 35, bottom: 35, left: 40, right: 35};


    fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (myResponse) {
            const data = myResponse["data"];
            console.log(data);

            data.forEach(d => {
                d[0] = d3.timeParse("%Y-%m-%d")(d[0]);
                d[0] = new Date(d[0]); // x
            });

            //scales
            var xExtent = d3.extent(data, d => d[0]);
            var xScale = d3.scaleTime()
                .domain(xExtent)
                .range([margin.left, width - margin.right]);
            var yMax = d3.max(data, d => d[1]);
            var yScale = d3.scaleLinear()
                .domain([0, yMax])
                .range([height - margin.bottom, margin.top]);
            var heightScale = d3.scaleLinear()
                .domain([0, yMax])
                .range([0, height - margin.top - margin.bottom]);

            //create the rectangles
            var svg = d3.select('svg');

            var formatTime = d3.timeFormat("%Y-%m-%d");

            var rect = svg.selectAll('rect')
                .data(data)
                .enter().append('rect')
                .attr('width', 2)
                .attr('height', function (d) {
                    return heightScale(d[1]);
                })
                .attr('x', function (d) { return xScale(d[0]) })
                .attr('y', function (d) { return yScale(d[1]) })
                .attr('class', 'bar')
                .attr('fill', 'blue')
                .attr('stroke', 'white')
                .attr('data-date', function (d, i) {
                    return formatTime(data[i][0]);
                })
                .attr('data-gdp', function (d, i) {
                    return data[i][1]
                });

            var xAxis = d3.axisBottom()
                .scale(xScale)
            var yAxis = d3.axisLeft()
                .scale(yScale);

            svg.append('g')
                .attr('id', 'y-axis')
                .attr('transform', 'translate(' + [0, height - margin.bottom] + ')')
                .call(xAxis);
            svg.append('g')
                .attr('transform', 'translate(' + [margin.left, 0] + ')')
                .attr('id', 'x-axis')
                .call(yAxis);




        });




})();

//http://blockbuilder.org/sxywu/909992222842cdbda009006e456a23b0

//front-end masters code