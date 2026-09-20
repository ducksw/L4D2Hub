
const form = document.getElementById('formulario');

// Pega aquí la URL que copiaste al darle "Done"
const URL_WEB_APP = "https://script.google.com/macros/s/AKfycbxDl2H9-pKJ8ydAPpeq8eQDasxWNM52_zt5eb194HZelK3wBCQUvcO6MikJN1_TRt78/exec";

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const data = {
    steamid: document.getElementById('steamid').value,
    displayName: document.getElementById('displayName').value,
    avatar: document.getElementById('avatar').value,
    profileurl: document.getElementById('profileurl').value
  };

  console.log(data);

  try {
    const response = await fetch(URL_WEB_APP, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(result);

    if (result.success) {
      alert(result.message);
      // form.reset();
    } else {
      alert('Error al guardar: ' + result.error);
    }
  } catch (err) {
    console.error('Error en la petición:', err);
    alert('No se pudo conectar con el servidor.');
  }
});