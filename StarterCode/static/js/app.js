function getPlots(id) {
        d3.json("samples.json").then (sampledata =>{
            var ids = sampledata.samples[0].otu_ids;
            
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);

            var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();

            var top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
            var OTU_id = top.map(d => "OTU " + d);
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            
            
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };
            var data = [trace];
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                
            };

        Plotly.newPlot("bar", data, layout);



            // The bubble chart
            var trace1 = {
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids
                },
                text:  sampledata.samples[0].otu_labels
    
            };
    
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
                var data1 = [trace1];
    
        Plotly.newPlot("bubble", data1, layout_2); 
        
        });
    }  
    function getDemoInfo(id) {
        d3.json("samples.json").then((data)=> {
            var metadata = data.metadata;
    
            console.log(metadata)
    
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
           var demographicInfo = d3.select("#sample-metadata");
           demographicInfo.html("");
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // create the function for the change event
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    
    // create the function for the initial data rendering
    function init() {
        var dropdown = d3.select("#selDataset");
        d3.json("samples.json").then((data)=> {
            console.log(data)
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
                getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    
    init();