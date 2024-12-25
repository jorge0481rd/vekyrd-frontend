export default function randomlyFormatParagraph(paragraph, linebreaks = false) {
  if (Boolean(paragraph) === false) {
    return '';
  }
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

  const linebreaksStr = linebreaks ? '<br><br>' : '';

  const formattedSentences = [];

  for (let i = 0; i < sentences.length; i++) {
    if (i === boldRandomIndex1) {
      if (formattedSentences.includes(i)) continue;
      sentences[i] = `<b>${sentences[i]}</b>`;
      formattedSentences.push(i);
    }
    if (i === boldRandomIndex2) {
      if (formattedSentences.includes(i)) continue;
      sentences[i] = `${linebreaksStr}<b>${sentences[i]}</b>`;
      formattedSentences.push(i);
    }
    if (i === italicRandomIndex1) {
      if (formattedSentences.includes(i)) continue;
      sentences[i] = `<i>${sentences[i]}</i>`;
      formattedSentences.push(i);
    }
    if (i === underlineRandomIndex1) {
      if (formattedSentences.includes(i)) continue;
      sentences[i] = `${linebreaksStr}<u>${sentences[i]}</u>`;
      formattedSentences.push(i);
    }
    if (i === underlineRandomIndex2) {
      if (formattedSentences.includes(i)) continue;
      sentences[i] = `<u>${sentences[i]}</u>`;
      formattedSentences.push(i);
    }
  }
  return sentences.join('.');
}
