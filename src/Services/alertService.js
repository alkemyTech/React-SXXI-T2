import Swal from 'sweetalert2';

export function confirmAlert(title, text, icon, showCancelButton, confirmButtonColor, cancelButtonColor, confirmButtonText) {

    Swal.fire({
        title,
        text,
        icon,
        showCancelButton,
        confirmButtonColor,
        cancelButtonColor,
        confirmButtonText
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                '¡Acción realizada!',
                'Tu solicitud fue cumplida.',
                'success'
            )
            return true;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                '¡Acción cancelada!',
                'Has cancelado la solicitud.',
                'error'
            )
            return false;
        }
    });
}