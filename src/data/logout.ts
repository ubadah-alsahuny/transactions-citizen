export async function Logout() {
    const token = localStorage.getItem('citizenToken');

    if (token) {
        localStorage.removeItem('citizenToken');
    }
}