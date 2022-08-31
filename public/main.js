import { error, access_token } from "./params.js";
import { processInput } from "./process_input.js";
import { sortTracks } from "./sort_tracks.js";
import { trackAvg, toPercent } from "./song_info.js";
import { generateHistogram } from "./graph.js";
import { top50 } from "./top50.js";

if(error) {
    alert("There was an error during authentication");
} else {
    if(access_token) {
        $("#login").hide();
        $("#loading").show();
        var tracks = await top50();
        var avg = trackAvg(tracks);
        fillTable(tracks, avg);

        document.getElementById("search").addEventListener("submit", processInput);
        var attributes = ["title", "danceability", "energy", "valence"];
        for(let i = 0; i < attributes.length; i++) {
            let attr = attributes[i];
            let e = document.getElementById(attr);
            e.innerHTML += " ";
            e.addEventListener("click", function() {
                let s = e.innerHTML;
                let lastChar = s.charAt(s.length - 1);
                sortTracks(tracks, attr);
                if(lastChar == '↑') tracks.reverse();

                e.innerHTML = s.substring(0, s.length - 1) + ((lastChar != '↑') ? " ↑" : " ↓");
                for(let j = 0; j < attributes.length; j++) {
                    if(j != i) {
                        let e2 = document.getElementById(attributes[j]);
                        let s2 = e2.innerHTML;
                        let lastChar2 = s2.charAt(s2.length - 1)
                        e2.innerHTML = s2.substring(0, (lastChar2 == ' ') ? s2.length : s2.length - 1);
                    }
                }

                fillTable(tracks, avg);
            });
        };

        var toggleBtn = document.getElementById("toggle-graph");
        toggleBtn.addEventListener("click", function() {
            generateHistogram("danceability");
            let contents = toggleBtn.innerHTML;
            toggleBtn.innerHTML = (contents == "Graph View") ? "Table View" : "Graph View";

            $("#track-list").toggle();
            $("#graph").toggle();
        });

        var graphSelect = document.getElementById("graph-type");
        graphSelect.addEventListener("change", function() {
            let selected = graphSelect.options[graphSelect.selectedIndex].text;
            generateHistogram(selected.charAt(0).toLowerCase() + selected.substring(1));
        });

        $('#loading').hide();
        $('#loggedin').show();
    } else {
        $("#login").show();
        $("#loggedin").hide();
    }
}

function fillTable(tracks, avg) {
    deleteRows();
    tracks.forEach(function(element) {
        let tag = $("<tr></tr>");
        let songTitle = $("<td></td>").append(element.title);
        let danceability = $("<td></td>").append(toPercent(element.danceability));
        let energy = $("<td></td>").append(toPercent(element.energy));
        let valence = $("<td></td>").append(toPercent(element.valence));
        
        tag.append(songTitle, danceability, energy, valence);
        $("#track-list").append(tag);
    });

    let tag = $("<tr></tr>");
    let b = $("<b></b>").append("Average");
    let songTitle = $("<td></td>").append(b);
    let danceability = $("<td></td>").append(toPercent(avg.danceability));
    let energy = $("<td></td>").append(toPercent(avg.energy));
    let valence = $("<td></td>").append(toPercent(avg.valence));
    
    tag.append(songTitle, danceability, energy, valence);
    $("#track-list").append(tag);
}

function deleteRows() {
    var table = document.getElementById("track-list");
    while(table.rows.length > 1) table.deleteRow(1);
}

export { tracks, avg };