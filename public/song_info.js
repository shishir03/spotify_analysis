import * as params from "./params.js";

function getTitle(trackId) {
    $.ajax({
        url: "https://api.spotify.com/v1/tracks/" + trackId,
        headers: {
            "Authorization": "Bearer " + params.access_token
        },
        success: function(response) {
            return response.name;
        }
    });

    return "";
}

function getFeatures(trackId) {
    $.ajax({
        url: "https://api.spotify.com/v1/audio-features/" + trackId,
        headers: {
            "Authorization": "Bearer " + params.access_token
        },
        success: function(response) {
            var features = {};
            features.title = getTitle(trackId);
            features.danceability = response.danceability;
            features.energy = response.energy;
            features.valence = response.valence;
            return features;
        }
    });

    return {};
}

export { getFeatures };