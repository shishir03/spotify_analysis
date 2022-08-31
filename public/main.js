import { error, access_token } from "./params.js";
import { processInput } from "./process_input.js";
import { sortTracks } from "./sort_tracks.js";
import { top50 } from "./top50.js";

if(error) {
    alert("There was an error during authentication");
} else {
    if(access_token) {
        $("#login").hide();
        $("#loading").show();
        var tracks = await top50();
        fillTable(tracks);

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
                fillTable(tracks);
            });
        };

        $('#loading').hide();
        $('#loggedin').show();
    } else {
        $("#login").show();
        $("#loggedin").hide();
    }
}

function fillTable(tracks) {
    deleteRows();
    tracks.forEach(function(element) {
        var tag = $("<tr></tr>");
        var songTitle = $("<td></td>").append(element.title);
        var danceability = $("<td></td>").append(toPercent(element.danceability));
        var energy = $("<td></td>").append(toPercent(element.energy));
        var valence = $("<td></td>").append(toPercent(element.valence));
        
        tag.append(songTitle, danceability, energy, valence);
        $("#track-list").append(tag);
    });
}

function toPercent(num) {
    return new Intl.NumberFormat("default", {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    }).format(num);
}

function deleteRows() {
    var table = document.getElementById("track-list");
    while(table.rows.length > 1) table.deleteRow(1);
}