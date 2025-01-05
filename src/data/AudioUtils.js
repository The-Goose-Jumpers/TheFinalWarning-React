export function initializeAudio(Music, setAudio, setGainNode) {
    const audioElement = new Audio(Music);
    const audioContext = new (window.AudioContext)();
    const gainNode = audioContext.createGain();
    const track = audioContext.createMediaElementSource(audioElement);

    track.connect(gainNode).connect(audioContext.destination);
    gainNode.gain.setValueAtTime(1, audioContext.currentTime); // Default volume to 1 (max)

    audioElement.loop = true;
    audioElement.play()
        .then(() => {
            console.log("Audio playback started successfully.");
        })
        .catch(error => {
            console.error("Error during audio playback:", error);
        });

    setAudio(audioElement);
    setGainNode(gainNode);
    return { audioElement, gainNode };
}

export function toggleAudio(audio, isMusicPlaying) {
    if (isMusicPlaying) {
        audio.pause();
    } else {
        audio.play()
            .then(() => {
                console.log("Audio playback resumed successfully.");
            })
            .catch(error => {
                console.error("Error during audio playback:", error);
            });
    }
}

export function setVolume(gainNode, volume) {
    gainNode.gain.setValueAtTime(volume, gainNode.context.currentTime);
}