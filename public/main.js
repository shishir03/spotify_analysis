import { error, access_token } from "./params.js";
import { getFeatures } from "./song_info.js";

if(error) {
    alert("There was an error during authentication");
} else {
    if(access_token) {
        $.ajax({
            url: 'https://api.spotify.com/v1/me/top/tracks?limit=50',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function(response) {
                var items = response.items;
                items.forEach(element => {
                    var trackId = element.uri.substring(14);
                    var features = getFeatures(trackId);
                    console.log(features);

                    var tag = $("<tr></tr>");
                    var songTitle = $("<td></td>").append(features.title);
                    var danceability = $("<td></td>").append(features.danceability);
                    var energy = $("<td></td>").append(features.energy);
                    var valence = $("<td></td>").append(features.valence);
                    
                    tag.append(songTitle, danceability, energy, valence);
                    $("#track-list").append(tag);
                });

                $('#login').hide();
                $('#loggedin').show();
            }
        });
    } else {
        $("#login").show();
        $("#loggedin").hide();
    }
}