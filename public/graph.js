import * as d3 from "https://cdn.skypack.dev/d3@7";
import { Histogram } from "./histogram.js";
import { tracks } from "./main.js";

function generateHistogram(param) {
    d3.select("svg").remove();
    var width = d3.select("#loggedin").node().getBoundingClientRect().width;

    var chart = Histogram(tracks, {
        value: d => {
            if(param == "danceability") return d.danceability;
            else if(param == "energy") return d.energy;
            return d.valence;
        },
        label: param.charAt(0).toUpperCase() + param.substring(1),
        width: width,
        xDomain: [0, 1],
        color: "white"
    });

    d3.select("#graph").append(function() {
        return chart;
    });
}

export { generateHistogram };