export default function randomlyFormatParagraph(paragraph) {
  const sentences = paragraph.split('.');
  const boldRandomIndex1 = Math.floor(Math.random() * sentences.length - 1);
  const boldRandomIndex2 = Math.floor(Math.random() * sentences.length - 1);

  const italicRandomIndex1 = Math.floor(Math.random() * sentences.length - 1);

  const underlineRandomIndex1 = Math.floor(
    Math.random() * sentences.length - 1
  );
  const underlineRandomIndex2 = Math.floor(
    Math.random() * sentences.length - 1
  );

  for (let i = 0; i < sentences.length; i++) {
    if (i === boldRandomIndex1) {
      sentences[i] = `<b>${sentences[i]}</b>`;
    }
    if (i === boldRandomIndex2) {
      sentences[i] = `<br><br><b>${sentences[i]}</b>`;
    }
    if (i === italicRandomIndex1) {
      sentences[i] = `<i>${sentences[i]}</i>`;
    }
    if (i === underlineRandomIndex1) {
      sentences[i] = `<br><br><u>${sentences[i]}</u>`;
    }
    if (i === underlineRandomIndex2) {
      sentences[i] = `<u>${sentences[i]}</u>`;
    }
  }
  return sentences.join('.');
}
