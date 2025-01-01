export default function Debounce(callback, delay) {
    let timeoutId;
    return function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback.apply(this, arguments), delay);
    };
}