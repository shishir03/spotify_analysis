import { access_token } from "./params.js";
import { getFeatures } from "./song_info.js";

async function top50() {
    let items = await top50Tracks();
    let tracks = [];

    for(let i = 0; i < items.length; i++) {
        var trackId = items[i].uri.substring(14);
        var features = await getFeatures(trackId);
        tracks.push(features);
    }

    return tracks;
}

function top50Tracks() {
    return new Promise(function(resolve) {
        $.ajax({
            url: 'https://api.spotify.com/v1/me/top/tracks?limit=50',
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function(response) {
                resolve(response.items);
            }
        });
    });
}

export { top50 };