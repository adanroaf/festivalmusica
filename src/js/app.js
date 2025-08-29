document.addEventListener('DOMContentLoaded', function () {
    navegacionFija()
    crearGaleria()
    resaltarEnlace()
    scrollNav()
})

function navegacionFija() {
    const header = document.querySelector('.header')
    const sobreFestival = document.querySelector('.sobre-festival')

    window.addEventListener('scroll', function () {
        if (sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed')
        }else{
            header.classList.remove('fixed')
        }        
    })
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes')
    const CANTIDAD_IMAGENES = 16
    for (let i=1; i <= CANTIDAD_IMAGENES; i++){
        const imagen = document.createElement('IMG')
        imagen.src = `/img/gallery/full/${i}.jpg`
        imagen.alt = 'Imagen Galeria'

        //event handler
        imagen.onclick = function () {
            mostrarImagenes(i)
        }

        galeria.appendChild(imagen)
    }
}

function mostrarImagenes(i) {
    const imagen = document.createElement('IMG')
    imagen.src = `/img/gallery/full/${i}.jpg`
    imagen.alt = `Imagen Galeria`
    //generar Modal
    const modal = document.createElement('DIV')
    modal.classList.add('modal')
    modal.appendChild(imagen)
    modal.onclick = cerrarModal

    //boton de cierre
    const cerrarModalBtn = document.createElement('DIV')
    cerrarModalBtn.textContent = 'X'
    cerrarModalBtn.classList.add('btn-cerrar')
    cerrarModalBtn.onclick = cerrarModal
    
    modal.appendChild(cerrarModalBtn)
    

    //agregarmos al html
    const body = document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.appendChild(modal)

}
function cerrarModal() {
    const modal = document.querySelector('.modal')
    const body = document.querySelector('body')
    
    if(modal){
        modal.classList.add('fade-out')
    }
    setTimeout(() => {
        body.classList.remove('overflow-hidden')
        modal.remove()
    }, 490);
}
function resaltarEnlace() {
    document.addEventListener('scroll', function () {
            const sections = document.querySelectorAll('section')
            const navLinks = document.querySelectorAll('.navegacion-principal a')
            let actual = '';
            sections.forEach( section => {
                const sectionTop = section.offsetTop
                const sectionHeight = section.clientHeight
                if(window.scrollY >= (sectionTop - sectionHeight / 3)){
                    actual = section.id
                    //console.log(actual);                    
                }
            })

             navLinks.forEach(link => {
                 link.classList.remove('active')
                 if(link.getAttribute('href') === '#' + actual){
                     link.classList.add('active')  
                 }                
             });
    })
}
function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a')

    navLinks.forEach(link => {
        link.addEventListener('click', e =>{
            e.preventDefault()
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)
            section.scrollIntoView({behavior: 'smooth'})
        })
    });
}