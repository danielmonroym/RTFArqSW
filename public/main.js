let documento= document.querySelector('.input-documento');
let doc= document.querySelector('.input-documento-delete');
let nombre= document.querySelector('.input-nombre');
let apellidos= document.querySelector('.input-apellido');
let email= document.querySelector('.input-email');
let divMensaje= document.querySelector('.mensaje');


$("#update-button").click(function (e) { 
       
    $('#EditModal').modal('toggle')
    
});


$("#delete-button").click(function (e) { 
       
  $('#DeleteModal').modal('toggle')
  
});

$(".btn-editu").click(function (e) { 
       
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
      $('#EditModal').modal('hide');
});

$(".btn-deleteu").click(function (e) { 
  if(doc.value===""){
   alert("Ingrese un documento");
   return;
  }
    
  alert(`User info: ${doc.value}`);
  fetch('/usuarios', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          documento: `${doc.value}`,
          
        })
    })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      if(response === 'No hay usuarios para borrar'){
        divMensaje.textContent='No existe usuario con ese ID, intente de nuevo'
      }else{
       
      window.location.reload(true)
      }

    })
   $('#DeleteModal').modal('hide'); 
   divMensaje.textContent=''
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