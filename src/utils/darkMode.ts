export const darkThemeMq = window.matchMedia("(prefers-color-scheme:dark)");
export const darkModeListener = (e: MediaQueryListEvent | MediaQueryList) => {
	if (e.matches) {
		document.body.setAttribute("arco-theme", "dark");
	} else {
		document.body.removeAttribute("arco-theme");
	}
};