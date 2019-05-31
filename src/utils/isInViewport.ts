export function isInViewport(
    e: HTMLElement,
    { top, height } = e && e.getBoundingClientRect()
) {
    return top <= window.innerHeight && top + height >= 0;
}
