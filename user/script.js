(() => {
    const cookies = document.cookie
    console.log(cookies)
    if (!cookies) return location.replace('../index.html');
    if (!cookies.startsWith('email=')) return location.replace('../index.html');
})()