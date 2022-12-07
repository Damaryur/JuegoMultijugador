const sectionSeleccionarAtaque = document.getElementById('selaccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota');
sectionReiniciar.style.display = 'none'

const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanmascotajugador = document.getElementById('mascota-jugador')

const spanmascotaenemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let judadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let OpcionDeMokepones
let inputHipodoge 
let inputCapipepo 
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego 
let botonAgua
let botonTierra 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let VictoriasJugador = 0
let VictoriasEnemigo =0
let vidasjugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './asset/mokemap.webp'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 450

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa -20
}

alturaQueBuscamos = anchoDelMapa * 600 /800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id 
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 60
        this.alto = 60
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidaX = 0
        this.velocidaY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
            
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './asset/mokepons_mokepon_hipodoge_attack.webp', 5, './asset/hipodoge.webp')

let capipepo = new Mokepon('Capipepo', './asset/mokepons_mokepon_capipepo_attack.webp', 5, './asset/capipepo.webp')

let ratigueya = new Mokepon('Ratigueya', './asset/mokepons_mokepon_ratigueya_attack.webp', 5, './asset/ratigueya.webp')

const HIPODOGE_ATAQUES = [
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🌱', id: 'boton-tierra' },
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego' },
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)


const RATIGUEYA_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarjuego() {
    
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        OpcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-Mokepom" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += OpcionDeMokepones

       inputHipodoge = document.getElementById('Hipodoge')
       inputCapipepo = document.getElementById('Capipepo')
       inputRatigueya = document.getElementById('Ratigueya')

    })
    
    botonMascotaJugador.addEventListener('click' , seleccionarMascotaJugaor);

    botonReiniciar.addEventListener('click', reiniciarjuego)

    unirseAlJuego()

}

function unirseAlJuego() {
    fetch("http://192.168.0.108:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                .then(function (respuesta) {
                    console.log(respuesta)
                    judadorId = respuesta
                })
            }
        })
}

function seleccionarMascotaJugaor () {       
    if (inputHipodoge.checked) {
        spanmascotajugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanmascotajugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }else if (inputRatigueya.checked) {
        spanmascotajugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }else {
       alert('SELECCIONA UNA MASCOTA')
       return
    }

    sectionSeleccionarMascota.style.display = 'none'

    seleccionarMokepon(mascotaJugador)

    extraAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.0.108:8080/mokepon/${judadorId}`, { 
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

     botonFuego = document.getElementById('boton-fuego')
     botonAgua = document.getElementById('boton-agua')
     botonTierra = document.getElementById('boton-tierra')
     botones = document.querySelectorAll('.BAtaque')
     
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58' 
                boton.disabled =true
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58' 
                boton.disabled =true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58' 
                boton.disabled =true
            }
            if (ataqueJugador.length === 5 ) {
                enviarAtaques()
            }
            //ataquealeatorioEnemigo()
        }) 
    })
   
}

function enviarAtaques() {
    fetch(`http://192.168.0.108:8080/mokepon/${judadorId}/ataques`, {
        method:"post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.0.108:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}
    
function seleccionarMascotaenemigo(enemigo) {
       // let mascotaAleatorio = aleatorio(0, mokepones.length -1)

        spanmascotaenemigo.innerHTML = enemigo.nombre
        ataquesMokeponEnemigo = enemigo.ataques
        secuenciaAtaque()
    } 


    function ataquealeatorioEnemigo() {
       let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

       if (ataqueAleatorio == 0 || ataqueAleatorio ==1) {
            ataqueEnemigo.push('FUEGO')        
       } else if (ataqueAleatorio == 3 || ataqueAleatorio ==4) {
            ataqueEnemigo.push('AGUA')
       } else {
            ataqueEnemigo.push('TIERRA')
       }
       console.log(ataqueEnemigo)
       iniciarPelea()
    }

    function iniciarPelea() {
        if (ataqueJugador.length === 5) {
            combate()
        }
    }

    function indexAmbosOponente(jugador, enemigo) {
        indexAtaqueJugador = ataqueJugador[jugador]
        indexAtaqueEnemigo = ataqueEnemigo[enemigo]
    }

    function combate () {
        clearInterval(intervalo)

        for (let index = 0; index < ataqueJugador.length; index++) {
           if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE")
           } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            VictoriasJugador++
            spanVidasJugador.innerHTML = VictoriasJugador
        } else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            VictoriasJugador++
            spanVidasJugador.innerHTML = VictoriasJugador
        } else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            VictoriasJugador++
            spanVidasJugador.innerHTML = VictoriasJugador
        } else {
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            VictoriasEnemigo++
            spanVidasEnemigo.innerHTML = VictoriasEnemigo
        }
    }

        revisarVidas()
    }

    function revisarVidas() {
        if (VictoriasJugador === VictoriasEnemigo) {
            crearMensajeFinal('Esto fue un Empate!!!')
        } else if (VictoriasJugador > VictoriasEnemigo) {
            crearMensajeFinal('Genial Ganaste')
        } else {
            crearMensajeFinal('Lo siento, Perdiste :(')
        }
    }

    function crearMensaje(resultado) {
        
        let NuevoAtaquedeljugador = document.createElement('p')
        let NuevoAtaquedelEnemigo = document.createElement('p')

        sectionMensajes.innerHTML = resultado
        NuevoAtaquedeljugador.innerHTML = indexAtaqueJugador
        NuevoAtaquedelEnemigo.innerHTML = indexAtaqueEnemigo

        ataquesDelJugador.appendChild(NuevoAtaquedeljugador)
        ataquesDelEnemigo.appendChild(NuevoAtaquedelEnemigo)
    }

    function crearMensajeFinal(resultadoFinal) {
        

        sectionMensajes.innerHTML = resultadoFinal

        
        sectionReiniciar.style.display = 'block'

    }

    function reiniciarjuego() {
        location.reload()
    }

    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidaX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidaY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height,
    )

    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })

}

function enviarPosicion(x, y) {
    fetch(`http://192.168.0.108:8080/mokepon/${judadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        res.json()
            .then(function ({ enemigos }) {
                console.log(enemigos)
                
                mokeponesEnemigos = enemigos.map(function (enemigo) {
                    let mokeponEnemigo = null
                    const mokeponNombre = enemigo.mokepon.nombre || ""
                    if (mokeponNombre === "Hipodoge") {
                        mokeponEnemigo = new Mokepon('Hipodoge', './asset/mokepons_mokepon_hipodoge_attack.webp', 5, './asset/hipodoge.webp', enemigo.id)
                    } else if  (mokeponNombre === "Capipepo") {
                        mokeponEnemigo = new Mokepon('Capipepo', './asset/mokepons_mokepon_capipepo_attack.webp', 5, './asset/capipepo.webp', enemigo.id)
                    } else if  (mokeponNombre === "Ratigueya") {
                        mokeponEnemigo = new Mokepon('Ratigueya', './asset/mokepons_mokepon_ratigueya_attack.webp', 5, './asset/ratigueya.webp', enemigo.id)
                    }

                    mokeponEnemigo.x = enemigo.x
                    mokeponEnemigo.y = enemigo.y

                    return mokeponEnemigo
                })

            })
    })
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidaX = 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidaX = -5
}


function moverAbajo() {
    mascotaJugadorObjeto.velocidaY = 5
}


function moverArriba() {
    mascotaJugadorObjeto.velocidaY = -5
}

function detenerMovimiento () {
    mascotaJugadorObjeto.velocidaX = 0
    mascotaJugadorObjeto.velocidaY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa() {
    
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)

    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}


function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return;
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Se detecto una colision');

    enemigoId = enemigo.id
   sectionSeleccionarAtaque.style.display = 'flex'
   sectionVerMapa.style.display = 'none'
   seleccionarMascotaenemigo(enemigo) 
}

window.addEventListener('load' , iniciarjuego)