import Toastify from 'toastify-js'

const alertBadMove = () => {
  const defaults = {
    text: 'Nope, can\t do that.',
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    backgroundColor: '#f87d58',
    stopOnFocus: true, // Prevents dismissing of toast on hover
  }

  Toastify(defaults).showToast()
}

export { alertBadMove }
