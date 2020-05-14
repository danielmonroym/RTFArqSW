let documento= document.querySelector('.input-documento');
let nombre= document.querySelector('.input-nombre');
let apellidos= document.querySelector('.input-apellido');
let email= document.querySelector('.input-email');


$("#update-button").click(function (e) { 
       
    $('#loginModal').modal('toggle')
    
});

$(".btn-edit").click(function (e) { 
       
    alert(`User info: ${email.value} ${documento.value} ${nombre.value} ${apellidos.value} `);
    fetch('/usuarios', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre: `${nombre.value}`,
            apellidos: `${apellidos.value}`,
            email: `${email.value}`,
            documento: `${documento.value}`
          })
      })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        window.location.reload(true)
      })
      $('#loginModal').modal('hide');
});

/*update.addEventListener('click', ()=> {
    fetch('/usuarios', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre: 'Dieguito',
            apellidos: 'Maradona',
            email: 'telojuro@gmail.com',
            documento: '100000'
          })
      })
}); */