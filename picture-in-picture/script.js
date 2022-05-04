
const videoElement = document.getElementById('video')
const button = document.getElementById('btn-start')
const btnScreen = document.getElementById('btn-screen')


// Prompt to select media stream, pass to video element, then display
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia()
        videoElement.srcObject = mediaStream
        videoElement.onloadedmetadata = () => {
            videoElement.play()
            button.disabled = false
        }
    
    } catch (error) {
        // Catch Error Here
        console.log('whoops, error here: ', error)
    }
}

button.addEventListener('click', async () => {
    // Disable Button
    button.disabled = true
    // Start Picture in Picture
    await videoElement.requestPictureInPicture()
    // Reset Button
    button.disabled = false
})

btnScreen.addEventListener('click', () => {
    selectMediaStream()
})