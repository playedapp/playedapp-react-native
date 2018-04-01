export const joinTexts = (...texts) => {
  if (texts.length === 1) return texts[0]

  return texts.slice(0, texts.length - 1).join(", ") + " & " + texts.slice(-1)
}
