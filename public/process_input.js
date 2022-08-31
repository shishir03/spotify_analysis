import { error } from "./params.js";
import { getFeatures, toPercent } from "./song_info.js";

async function processInput(e) {
    e.preventDefault();

    var data = new FormData();
    data.append("link", document.getElementById("link").value);

    var url = data.get("link");
    var begin = url.indexOf("track/") + 6;
    var end = url.indexOf("?");
    var trackId = url.substring(begin, end);

    if(error) alert("There was an error during authentication");
    else {
        $("#track-search").empty();
        var row1 = $("<tr></tr>");
        var header = $("<tr></tr>");

        var features = await getFeatures(trackId);
        if(features == {}) alert("Error getting song data");
        else {
            var songTitle = $("<td></td>").append(features.title);
            var danceability = $("<td></td>").append(toPercent(features.danceability));
            var energy = $("<td></td>").append(toPercent(features.energy));
            var valence = $("<td></td>").append(toPercent(features.valence));

            var col1 = $("<th></th>").append("Name");
            var col2 = $("<th></th>").append("Danceability");
            var col3 = $("<th></th>").append("Energy");
            var col4 = $("<th></th>").append("Valence");
            
            header.append(col1, col2, col3, col4);
            row1.append(songTitle, danceability, energy, valence);
            $("#track-search").append(header, row1);
        }
    }
}

export { processInput };