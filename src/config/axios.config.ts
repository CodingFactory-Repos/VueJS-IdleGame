export function getBearerToken(): { headers: { authorization?: string } } {
    const tokenInLocalStorage = localStorage.getItem("token");

    if (tokenInLocalStorage) {
        return {
            headers: {
                authorization: `Bearer ${tokenInLocalStorage}`,
            }
        }
    }

    return {
        headers: {}
    }
}
