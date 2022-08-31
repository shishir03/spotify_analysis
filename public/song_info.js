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
                    valence: response.valence,
                    duration: response.duration_ms/1000
                });
            }
        });
    });
}

function trackAvg(tracks) {
    let dAvg = 0;
    let eAvg = 0;
    let vAvg = 0;
    let duration = 0;

    for(let i = 0; i < tracks.length; i++) {
        let features = tracks[i];
        let d = features.duration;
        dAvg += (features.danceability * d);
        eAvg += (features.energy * d);
        vAvg += (features.valence * d);
        duration += d;
    }

    return {
        danceability: dAvg / duration,
        energy: eAvg / duration,
        valence: vAvg / duration
    }
}

function toPercent(num) {
    return new Intl.NumberFormat("default", {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    }).format(num);
}

export { getFeatures, trackAvg, toPercent };