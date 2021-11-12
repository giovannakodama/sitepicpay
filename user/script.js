(() => {
    const cookies = document.cookie
    if (!cookies) return location.replace('../index.html');
    if (!cookies.startsWith('email=')) return location.replace('../index.html');
})()