function sortTracks(tracks, sortBy) {
    if(sortBy == "danceability") tracks.sort(sortDanceability);
    if(sortBy == "energy") tracks.sort(sortEnergy);
    if(sortBy == "valence") tracks.sort(sortValence);
    if(sortBy == "title") tracks.sort(sortTitle);
}

function sortDanceability(a, b) {
    return a.danceability - b.danceability;
}

function sortEnergy(a, b) {
    return a.energy - b.energy;
}

function sortValence(a, b) {
    return a.valence - b.valence;
}

function sortTitle(a, b) {
    return a.title.localeCompare(b.title);
}

export { sortTracks };