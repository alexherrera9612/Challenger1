let text_encriptar = document.querySelector('#textodecodificado');
let encriptar = document.querySelector('#encriptarbtn');
let desencriptar = document.querySelector('#desencriptarbtn');
let text_desencriptar = document.querySelector('#textocodificado');
let copiar = document.querySelector('#copiarbtn');
let palabra_encriptada = ''; 
let palabra_desencriptada = ''; 

const rectificacion = /[0-9A-Z-ÁÉÍÓÚÜáéíóúü#$@"'()\[\]{}+*~^-_.:,;<>?¿¡|´°¬=&%]/g;
let cantidadPrecionado = 0

document.addEventListener('DOMContentLoaded',()=>{
})
eventos();

function eventos() {
    desencriptar.addEventListener('click', desencriptamiento);
    encriptar.addEventListener('click', encriptamiento);
    document.getElementById("pegarbtn").addEventListener("click", pegarTexto);
}
function encriptamiento() {
    palabra_encriptada = '';
    rectificacion.lastIndex = 0;
    if(!rectificacion.test(text_encriptar.value)){
        for (const iterator of text_encriptar.value) {
            switch (iterator) {
                case 'e':
                    palabra_encriptada += "enter";
                    break;
                case 'i':
                    palabra_encriptada += "imes";
                    break;
                case 'a':
                    palabra_encriptada += "ai";
                    break;
                case 'o':
                    palabra_encriptada += "ober";
                    break;
                case 'u':
                    palabra_encriptada += "ufat";
                    break;
                default:
                    palabra_encriptada += iterator;
                    break;
            }
        }
        text_encriptar.value = '';
        text_desencriptar.value = palabra_encriptada;
        copiar.addEventListener('click', copiarContenido);
        document.querySelector('.advertencia').classList.remove('error');
        console.log(palabra_encriptada);
    }else{
        alert("¡Tu mensaje contiene algún error!\n\nTu mensaje contiene mayusculas, caracteres especiales y/o letras con acentos");
        document.querySelector('.advertencia').classList.add('error');
    }
    
}
function desencriptamiento() {
    palabra_desencriptada= text_encriptar.value
    rectificacion.lastIndex = 0;
    if(!rectificacion.test(text_encriptar.value)){
        const sustituciones = {
            'enter': 'e',
            'imes': 'i',
            'ai': 'a',
            'ober': 'o',
            'ufat': 'u'
        };
        const regex = new RegExp(Object.keys(sustituciones).join('|'), 'g');

        palabra_desencriptada  = palabra_desencriptada .replace(regex, (match) => sustituciones[match]);
        text_desencriptar.value = palabra_desencriptada;
        text_encriptar.value = '';
        console.log(palabra_desencriptada)
        copiar.addEventListener('click', copiarContenido);   
    }
    else{
        alert("¡Tu mensaje contiene algún error!\n\nTu mensaje contiene mayusculas, caracteres especiales y/o letras con acentos");
        document.querySelector('.advertencia').classList.add('error');
    }
        
}
function copiarContenido() {
    const contenidoParaCopiar = document.querySelector('#textocodificado').value;

    navigator.clipboard.writeText(contenidoParaCopiar).then(() => {
        alert("texto copiado al portapapeles");
    }).catch((err) => {
        console.log('Algo ocurrió al momento de copiar: ', err);
    });

}
function pegarTexto() {
    navigator.clipboard.readText()
        .then(text => {
            document.getElementById("textodecodificado").value = text;
            text_desencriptar.value = '';
        })
        .catch(err => {
            console.error('No se pudo pegar el texto: ', err);
        });

}
