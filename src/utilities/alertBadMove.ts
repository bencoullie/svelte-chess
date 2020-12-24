import Toastify from 'toastify-js'

const alertBadMove = () => {
  const defaults = {
    text: 'Illegal move: your king would be in check.',
    gravity: "top",
    position: "center",
    backgroundColor: '#f87d58',
    stopOnFocus: true, // Prevents dismissing of toast on hover
  }

  Toastify(defaults).showToast()
}

export { alertBadMove }
