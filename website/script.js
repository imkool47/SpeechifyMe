document.getElementById('text-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const text = document.getElementById('text-input').value;
    const voiceId = document.getElementById('voice-select').value;
    const response = await fetch('https://97rqsxj3uf.execute-api.ap-south-1.amazonaws.com/prod', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text, voiceId: voiceId })
    });
    const result = await response.json();
    const audioBase64 = result.audioBase64;
    const audioUrl = 'data:audio/mp3;base64,' + audioBase64;
    const s3Url = result.s3Url;
    
    const audio = document.getElementById('audio-output');
    audio.src = audioUrl;
    audio.play();
    
    const downloadLink = document.getElementById('download-link');
    downloadLink.href = s3Url;
    downloadLink.style.display = 'inline';
});

// Dynamically change the gradient colors on page load
function randomGradient() {
    const colors = [
        ['#72EDF2', '#5151E5'],
        ['#FF9A9E', '#FAD0C4'],
        ['#FFDEE9', '#B5FFFC'],
        ['#D4FC79', '#96E6A1'],
        ['#84FAB0', '#8FD3F4'],
        ['#A6C0FE', '#F68084'],
    ];
    const random = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = `linear-gradient(135deg, ${random[0]} 10%, ${random[1]} 100%)`;
    document.body.style.backgroundSize = '400% 400%';
}

randomGradient();
