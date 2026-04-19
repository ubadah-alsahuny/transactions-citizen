const THEME_KEY = 'theme';

export function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark-theme');

    if (isDark) {
        html.classList.remove('dark-theme');
        localStorage.setItem(THEME_KEY, 'light-theme');
    } else {
        html.classList.add('dark-theme');
        localStorage.setItem(THEME_KEY, 'dark-theme');
    }
}
