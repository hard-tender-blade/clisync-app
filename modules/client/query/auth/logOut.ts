const logOut = async () => {
    const response = await fetch(`/api/auth/log-out`, {
        method: 'POST',
    })
}
export default logOut