const getNextLetter = (letter: string) => {
  if (letter === 'h') {
    return 'h'
  }

  return String.fromCharCode(letter.charCodeAt(0) + 1);
}

export { getNextLetter }