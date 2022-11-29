import Swal from 'sweetalert2';

export function confirmAlert(title, text, confirmButtonText, action, params){

    Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText
    }).then((result) => {
        if (result.isConfirmed) {
            successAlert('¡Acción realizada!', 'Tu solicitud ha sido cumplida.', '¡Gracias!');
            action(params);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            ErrorAlert('¡Acción cancelada!', 'Tu solicitud ha sido cancelada.', 'Está bien :(');
            return false;
        }
    });
}

export function successAlert(title, text, confirmButtonText) {

    Swal.fire({
        title,
        text,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText,
        timer: 2000,
        timerProgressBar: true
    });
}

export function errorAlert(title, text, confirmButtonText) {

    Swal.fire({
        title,
        text,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText,
        timer: 2000,
        timerProgressBar: true
    });
}

