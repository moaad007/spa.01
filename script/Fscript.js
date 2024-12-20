

// Initialize Supabase
const Url = 'https://kkhgpwfauwtgnjmrjqdv.supabase.co';
const Key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtraGdwd2ZhdXd0Z25qbXJqcWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MTIyMjIsImV4cCI6MjA1MDA4ODIyMn0.zhfanDlQlE5m76Xxw8V-fctEYrWY09ZHvxLSzTVzGPI';
const database =supabase.createClient(Url, Key); 
const addButton = document.getElementById('myButton');
addButton.addEventListener('click',async(e)=>{
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const duration = document.querySelector('#duration').value;
    const price = document.querySelector('#price').value;
    addButton.innerText='addin...';
    addButton.setAttribute('disabled','true');
   const Response = await database 
   .from('formulas')
   .insert({
    name:name,
    duration:duration,
    price:price
   
   })

 if(Response){
    
    addButton.innerText='Add Formula';
    name='';
    duration='';
    price='';

 }
else{
alert('formula was not added succesfully');
}}
)



