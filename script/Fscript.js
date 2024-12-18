// Target the button with id 'btn'
const addBtn = document.querySelector('#btn');

// Add event listener for the button click
if (addBtn) {  // Ensure the button is found
    addBtn.addEventListener('click', function() {
        console.log('clicked');
    });
}
