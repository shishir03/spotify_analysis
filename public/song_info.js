import { access_token } from "./params.js";

function getTitle(trackId) {
    $.ajax({
        url: "https://api.spotify.com/v1/tracks/" + trackId,
        headers: {
            "Authorization": "Bearer " + access_token
        },
        success: function(response) {
            console.log(trackId);
            return response.name;
        }
    });

    return "";
}

function getFeatures(trackId) {
    $.ajax({
        url: "https://api.spotify.com/v1/audio-features/" + trackId,
        headers: {
            "Authorization": "Bearer " + access_token
        },
        success: function(response) {
            let title = getTitle(trackId);
            console.log(title);
            if(title == "") return {};

            return {
                title: getTitle(trackId),
                danceability: response.danceability,
                energy: response.energy,
                valence: response.valence
            };
        }
    });

    return {};
}

export { getFeatures };