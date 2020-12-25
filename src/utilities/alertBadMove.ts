import Toastify from 'toastify-js'

const alertBadMove = (text: string) => {
  const defaults = {
    text,
    gravity: "top",
    position: "center",
    backgroundColor: '#f87d58',
    stopOnFocus: true, // Prevents dismissing of toast on hover
  }

  Toastify(defaults).showToast()
}

export { alertBadMove }
