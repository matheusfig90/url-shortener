document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault()

  fetch('/api/v1/generate', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ url: document.querySelector('input[name=originalUrl]').value })
  }).then(response => {
    response.json().then(data => {
      alert(`${window.location.href}${data.shortUrl}`)
    })
  })
})
