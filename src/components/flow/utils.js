export const joinTexts = (...texts) => {
  if (texts.length === 1) return texts[0]

  return texts.slice(0, texts.length - 1).join(", ") + " & " + texts.slice(-1)
}

// Based on https://stackoverflow.com/a/13627586
export const toOrdinal = number => {
  const j = number % 10
  const k = number % 100

  if (j == 1 && k != 11) return number + "st"
  if (j == 2 && k != 12) return number + "nd"
  if (j == 3 && k != 13) return number + "rd"
  return number + "th"
}
