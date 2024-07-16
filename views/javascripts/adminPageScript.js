ClassicEditor.create( document.querySelector('#body'), {
    toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'fontSize',
        'fontFamily',
        'fontColor',
        '|',
        'link',
        'bulletedList',
        'numberedList',
        'blockQuote',
        'image',
        'imageinsert'
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
} )
.catch( error => {
    console.log( error );
} );

document.addEventListener('DOMContentLoaded', function () {
    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const form = this.closest('.delete-form');

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    form.submit();
                }
            });
        });
    });
});