async function saveName() {
    const nameInput = document.getElementById('name');
    const name = nameInput.value.trim();
    if (name) {
        localStorage.setItem('name', name);
        nameInput.disabled = true;
        document.getElementById('message').classList.remove('hidden');
    }
}

function showThankYou() {
    document.getElementById('question').innerText = "Thank you!";
    document.getElementById('buttons').style.display = 'none';
}

async function handleNoClick() {
    const noButton = document.getElementById('no');
    const bodyRect = document.body.getBoundingClientRect();
    const btnRect = noButton.getBoundingClientRect();
    const offsetX = btnRect.left - bodyRect.left;
    const offsetY = btnRect.top - bodyRect.top;

    let newX, newY;

    // Ensure the new position is within the viewport
    do {
        newX = Math.random() * (window.innerWidth - btnRect.width);
        newY = Math.random() * (window.innerHeight - btnRect.height);
    } while (Math.abs(newX - offsetX) < btnRect.width && Math.abs(newY - offsetY) < btnRect.height);

    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;

    // Save the click count
    const name = localStorage.getItem('name');
    if (name) {
        await fetch('/api/click', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });
    }
}
