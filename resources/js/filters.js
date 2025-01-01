const filters = {
    json(value) {
        return JSON.stringify(value, null, 2);
    },
    price(value, currency = 'CZK', fractionDigits = 2) {
        if (typeof value !== "number") {
            return value;
        }
        let locale = 'cs-CZ';
        if (currency === 'EUR') {
            locale = 'en-GB';
        }
        return value.toLocaleString(locale, {style: 'currency', currency: currency, minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits});
    }
}
export default filters;