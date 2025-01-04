const Url = 'https://kkhgpwfauwtgnjmrjqdv.supabase.co';
const Key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtraGdwd2ZhdXd0Z25qbXJqcWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MTIyMjIsImV4cCI6MjA1MDA4ODIyMn0.zhfanDlQlE5m76Xxw8V-fctEYrWY09ZHvxLSzTVzGPI';
const database = supabase.createClient(Url, Key);
const addButton = document.getElementById('myButton');
const formulaDisplay = document.getElementById('formulaDisplay');

addButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const nameInput = document.querySelector('#name');
    const durationInput = document.querySelector('#duration');
    const priceInput = document.querySelector('#price');
    const name = nameInput.value;
    const duration = durationInput.value;
    const price = priceInput.value;

    addButton.innerText = 'Adding...';
    addButton.setAttribute('disabled', 'true');

    const { data, error } = await database
        .from('formulas')
        .insert({
            name: name,
            duration: duration,
            price: price
        });

    if (error) {
        alert('Formula was not added successfully: ' + error.message);
    } else {
        addButton.innerText = 'Add Formula';
        nameInput.value = '';
        durationInput.value = '';
        priceInput.value = '';
        fetchFormulas(); // Refresh the list after adding a new formula
    }

    addButton.removeAttribute('disabled');
});

async function fetchFormulas() {
    const { data, error } = await database
        .from('formulas')
        .select('*');

    if (error) {
        alert('Failed to fetch formulas: ' + error.message);
        return;
    }

    // Clear the list but keep the header
    formulaDisplay.innerHTML = '';

    data.forEach(formula => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${formula.name}</span>
            <span>${formula.duration}</span>
            <span>${formula.price}</span>
            <button>Delete</button>
        `;
        const deleteButton = li.querySelector('button');
        deleteButton.addEventListener('click', () => deleteFormula(formula.id));
        formulaDisplay.appendChild(li);
    });
}

async function deleteFormula(id) {
    const { error } = await database
        .from('formulas')
        .delete()
        .eq('id', id);

    if (error) {
        alert('Failed to delete formula: ' + error.message);
        return;
    }

    fetchFormulas(); // Refresh the list after deleting a formula
}

// Fetch formulas when the page loads
document.addEventListener('DOMContentLoaded', fetchFormulas);