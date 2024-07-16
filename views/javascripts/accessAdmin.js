function showLoading() {
    return new Promise((resolve) => {
        Swal.fire({
            title: 'Checking your secret...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            timer: 2000,
            didOpen: () => {
                Swal.showLoading();
            }
        }).then(() => {
            resolve();
        });
    });
}

async function checkPassword(event) {
    event.preventDefault();

    await showLoading();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch('/verifyCode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            Swal.fire({
                title: 'EUREKA! Welcome admin.',
                text: 'You will be redirected shortly.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                window.location.href = '/administration';
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: result.message,
                icon: 'error'
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            title: 'Oops!',
            text: 'Something went wrong. Please try again later.',
            icon: 'error'
        });
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("passwordFormSend").addEventListener('submit', checkPassword);
});
