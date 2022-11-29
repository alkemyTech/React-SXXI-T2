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
            Swal.fire(
                '¡Acción realizada!',
                'Tu solicitud fue cumplida.',
                'success'
            );
            action(params);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                '¡Acción cancelada!',
                'Has cancelado la solicitud.',
                'error'
            );
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

