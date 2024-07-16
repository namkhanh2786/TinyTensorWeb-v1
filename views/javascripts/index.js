let editor;

ClassicEditor
    .create(document.querySelector('#questionInput'), {
        toolbar: ['bold', 'italic', 'outdent', 'indent']
    })
    .then(newEditor => {
        editor = newEditor;
    })
    .catch(error => {
        console.error(error);
    });

document.getElementById('questionForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch('/sendQuestion', {
            method: form.method,
            body: formData
        });

        if (response.ok) {
            Swal.fire({
                title: 'Success!',
                text: 'Your question has been sent successfully.',
                icon: 'success',
                confirmButtonText: 'GREAT!',
                position: 'center',
                customClass: {
                    popup: 'custom-swal-popup'
                }
            });
            document.getElementById('questionForm').reset();
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'There was an error sending your question. Please try again or contact us if something is wrong.',
                icon: 'error',
                confirmButtonText: 'I UNDERSTAND',
                position: 'center',
                customClass: {
                    popup: 'custom-swal-popup'
                }
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'INTERNAL SERVER ERROR!',
            text: 'There was an error sending your question. Please try again or contact us if something is wrong.',
            icon: 'error',
            confirmButtonText: 'SURE',
            position: 'center',
            customClass: {
                popup: 'custom-swal-popup'
            }
        });
    }
});

// async function submitQuestion(event) {
//     event.preventDefault();

//     const form = event.target;
//     const formData = new FormData(form);

//     try {
//         const response = await fetch('/sendQuestion', {
//             method: 'post',
//             body: formData
//         });

//         if (response.ok) {
//             swal("KUDOS!", "Your message has been sent to us! Please check your email for early response.", "success");
//             document.getElementById('questionForm').reset();
//             editor.setData('');
//             return true;
//         } else {
//             swal("Oops!", "Something went wrong. Please try again later.", "error");
//             return false;
//         }
//     }
//     catch(error) {
//         console.error('Error:', error);
//         swal("Oops!", "Something went wrong. Please try again later.", "error");
//         return false;
//     };
// }

ClassicEditor.create(document.querySelector('#form__textArea'), {
    toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        '|',
        'link',
        'bulletedList',
        'numberedList',
        'blockQuote',
        ],
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
        ]
    },
    fontFamily: {
        options: [
            'default',
            'Ubuntu, Arial, sans-serif',
            'Ubuntu Mono, Courier New, Courier, monospace'
        ]
    },
    fontColor: {
        colorPicker: {
            // Use 'hex' format for output instead of 'hsl'.
            format: 'hex'
        }
    },
})
.catch(error => {
    console.log(error);
});

document.getElementById('infoForm-form-gettingInformationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch('/getStudentsInfo', {
            method: form.method,
            body: formData
        });

        if (response.ok) {
            Swal.fire({
                title: 'Success!',
                text: 'Your application has been sent successfully.',
                icon: 'success',
                confirmButtonText: 'GREAT!',
                position: 'center',
                customClass: {
                    popup: 'custom-swal-popup'
                }
            });
            document.getElementById('infoForm-form-gettingInformationForm').reset();
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'There was an error sending your application. Please try again or contact us if something is wrong.',
                icon: 'error',
                confirmButtonText: 'I UNDERSTAND',
                position: 'center',
                customClass: {
                    popup: 'custom-swal-popup'
                }
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'INTERNAL SERVER ERROR!',
            text: 'There was an error sending your application. Please try again or contact us if something is wrong.',
            icon: 'error',
            confirmButtonText: 'SURE',
            position: 'center',
            customClass: {
                popup: 'custom-swal-popup'
            }
        });
    }
});