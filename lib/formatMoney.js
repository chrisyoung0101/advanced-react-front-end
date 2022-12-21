export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'USD',
    // currency: 'CAD',
    minimumFractionDigits: 2,
  };

  // check if it is a clean dollar amount - $24.00 becomes $24
  // check if remainder of amount/100 = 0
  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  // Intl is a great formatter
  const formatter = Intl.NumberFormat('en-US', options);

  return formatter.format(amount / 100);
}
