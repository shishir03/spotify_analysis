import { access_token } from "./params.js";

function getTitle(trackId) {
    return new Promise(function(resolve) {
        $.ajax({
            url: "https://api.spotify.com/v1/tracks/" + trackId,
            headers: {
                "Authorization": "Bearer " + access_token
            },
            success: function(response) {
                resolve(response.name);
            }
        });
    });
}

function getFeatures(trackId) {
    return new Promise(async function(resolve) {
        let title = await getTitle(trackId);
        $.ajax({
            url: "https://api.spotify.com/v1/audio-features/" + trackId,
            headers: {
                "Authorization": "Bearer " + access_token
            },
            success: function(response) {
                resolve({
                    title: title,
                    danceability: response.danceability,
                    energy: response.energy,
                    valence: response.valence
                });
            }
        });
    });
}

export { getFeatures };