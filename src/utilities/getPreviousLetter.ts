const getPreviousLetter = (letter: string) => {
  if (letter === 'a') {
    return 'a'
  }

  return String.fromCharCode(letter.charCodeAt(0) - 1);
}

export { getPreviousLetter }