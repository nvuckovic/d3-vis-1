// ----------------- \\
// adapted from d3 bubble chart tutorial
// by Ferenc Almasi
// link: https://www.webtips.dev/how-to-make-interactive-bubble-charts-in-d3-js
// ----------------- \\

// import data and format window size
const file = '/JSON_Files/verbsManWoman.json';
const width = window.innerWidth;
const height = window.innerHeight;
const color = '#48b5b1';

// create global random to keep track of random article that appears in preview when hovering
// over a bubble
let rand = 0;

const generateChart = data => {
    // set size of each bubble
    const bubble = data => d3.pack()
        .size([width, height])
        .padding(2)(d3.hierarchy({ children: data }).sum(d => Math.pow(d.scoreMan, 1.5))); // change score to show different charts

    // set dimensions of chart
    const svg = d3.select('#bubble-chart')
        .style('width', width)
        .style('height', height);
    
    const root = bubble(data);
    const tooltip = d3.select('.tooltip');

    const node = svg.selectAll()
        .data(root.children)
        .enter().append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
    const circle = node.append('circle')
        .style('fill', d => color)
        .on('mouseover', function (e, d) {
        tooltip.select('img').attr('src', "../flag.jpg");
            
            // get random article to display in preview bar
            rand = Math.floor(Math.random() * d.data.scoreMan);

            // set article title for preview bar and put name of verb at the beginning
            // since some of the bubbles are very small and don't show the verb
            let title = d.data.verb + ": " + d.data.articlesMan[rand].title;

            // show random article on mouseOver
            tooltip.select('a').attr('href', d.data.link).text(title);
            tooltip.style('visibility', 'visible');

            // outline of bubble
            d3.select(this).style('stroke', '#222');
        })
        .on('mousemove', e => tooltip.style('top', `${e.pageY}px`)
                                     .style('left', `${e.pageX + 10}px`))
        .on('mouseout', function () {
            d3.select(this).style('stroke', 'none');
            return tooltip.style('visibility', 'hidden');
        })
        // open random article from preview bar in new window
        .on('click', (e, d) => window.open(d.data.articlesMan[rand].url));
    
    // add verb name to each circle    
    const label = node.append('text')
        .attr('dy', 2)
        .text(d => d.data.verb.substring(0, d.r / 3));

    // transitions    
    node.transition()
        .ease(d3.easeExpInOut)
        .duration(1000)
        .attr('transform', d => `translate(${d.x}, ${d.y})`);
    circle.transition()
        .ease(d3.easeExpInOut)
        .duration(1000)
        .attr('r', d => d.r);
    label.transition()
        .delay(700)
        .ease(d3.easeExpInOut)
        .duration(1000)
        .style('opacity', 1)
};

// get data from imported file and generate chart
(async () => {
    data = await d3.json(file).then(data => data);
    generateChart(data);
})();