export function formatNumber(value) {
	value = value.toString();
	// Remove values that are not numbers
	value = value.replace(/\D/g, '');
	
	// Remove '-'
	if (Number(value) < 0) {
		value = value.substring(1);
	}

	return value;
}

export function formatCurrency(value) {
	value = formatNumber(value);

	value = Number(value) / 100;

	value = value.toLocaleString("en-us", {
		style: "currency",
		currency: "usd"
	});

	return value;
}