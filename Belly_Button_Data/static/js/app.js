// Set the URL
const bellyURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Set up variables
var samples;
var meta_data;

// Pull data using D3.json()
d3.json(bellyURL).then(function (data) {
    let selector = d3.select("#selDataset");
    meta_data = data.metadata;
    samples = data.samples;
    data.names.forEach(function(id) {
        selector.append("option").text(id).property("value", id);
    });

    //Call functions to parse data
    metaData(meta_data[0]);
    hbarChart(samples[0]);
    bubbleChart(samples[0]);
});

// Create function for dropdown value change
function changeDropdown(value) {
    const selectedId = samples.find((item) => item.id === value);
    const demographicInfo = meta_data.find((item) => item.id == value);

    // Insert data into Demographic Info table
    metaData(demographicInfo);
    // Insert data into bar chart
    hbarChart(selectedId);
    // Insert data into bubble chart
    bubbleChart(selectedId);
}

// Create function to structure Demographic Info table
function metaData(demographicInfo) {
    let demoSelect = d3.select("#sample-metadata");
    demoSelect.html(
        `id: ${demographicInfo.id} <br> 
        ethnicity: ${demographicInfo.ethnicity} <br>
        gender: ${demographicInfo.gender} <br>
        age: ${demographicInfo.age} <br>
        location: ${demographicInfo.location} <br>
        bbtype: ${demographicInfo.bbtype} <br>
        wfreq: ${demographicInfo.wfreq}`
    );
}

// Create function to build bar graph
function hbarChart(selectedId) {
    let x_axis = selectedId.sample_values.slice(0, 10).reverse();
    let y_axis = selectedId.otu_ids.slice(0, 10).reverse().map((item) => `OTU ${item}`);
    let text = selectedId.otu_labels.slice(0, 10).reverse();
    // Structure bar graph
    barChart = {
        x: x_axis,
        y: y_axis,
        text: text,
        type: "bar",
        orientation: "h",
    };
    let chart = [barChart];
    // Structure layout
    let layout = {
        margin: {
            l: 100,
            r: 100,
            t: 0,
            b: 100,
        },
        height: 600,
        width: 700,
    };
    //Plot graph
    Plotly.newPlot("bar", chart, layout);
}

// Create function to build bubble chart
function bubbleChart(selectedId) {
    let x_axis = selectedId.otu_ids;
    let y_axis = selectedId.sample_values;
    let marker_size = selectedId.sample_values;
    let color = selectedId.otu_ids;
    let text = selectedId.otu_labels;
    // Structure bubble chart
    bubble = {
        x: x_axis,
        y: y_axis,
        text: text,
        mode: "markers",
        marker: {
            color: color,
            colorscale: "Portland",
            size: marker_size,
        },
        type: "scatter",
    };
    let chart = [bubble];
    // Structure layout
    let layout = {
        xaxis: {
            title: { text: "OTU ID" },
        },
    };
    // Plot chart
    Plotly.newPlot("bubble", chart, layout);
}