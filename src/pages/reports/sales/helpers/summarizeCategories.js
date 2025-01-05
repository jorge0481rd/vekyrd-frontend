export const summarizeCategories = (data) => {
  const categories = data.reduce((acc, curr) => {
    const price = parseFloat(curr.price) * curr.quantity;

    if (acc[curr.category]) {
      acc[curr.category] += price;
    } else {
      acc[curr.category] = price;
    }

    return acc;
  }, {});

  return categories;
};
