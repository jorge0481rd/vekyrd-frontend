export const extractHtml = (htmlString) => {
  // Use regex to remove Markdown syntax and get the HTML content
  const htmlContent = htmlString.replace(/```html\n|```/g, '');
  return htmlContent;
};
