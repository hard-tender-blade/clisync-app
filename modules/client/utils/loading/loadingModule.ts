export const showLoading = () => {
    const el = document.getElementById('loading');
    if (el) el.classList.remove('hidden');

    const body = document.body;
    body.style.pointerEvents = 'none';
    body.style.cursor = 'wait';
}

export const hideLoading = () => {
    const el = document.getElementById('loading');
    if (el) el.classList.add('hidden');

    //enable click events
    const body = document.body;
    body.style.pointerEvents = 'auto';
    body.style.cursor = 'auto';
}