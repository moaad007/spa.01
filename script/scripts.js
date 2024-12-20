document.addEventListener('DOMContentLoaded', () => {
    // Select all anchor tags with the class "nav-link"
    const links = document.querySelectorAll('.nav-link');
    const contentDiv=document.querySelector('.content')
    const hamMenu = document.querySelector('.hamMenu');
    const nav = document.querySelector('.nav');

    // Add click event listener to ham menu
    hamMenu.addEventListener('click',(e)=>{
        e.preventDefault()
        hamMenu.classList.toggle("active")
        nav.classList.toggle("active")
    })
    // Add click event listener to each link
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();  // Prevent default anchor behavior
                hamMenu.classList.remove('active');
                nav.classList.remove('active');
            // Remove the 'active' class from any currently active links
            document.querySelectorAll('.nav-link.active').forEach(activeLink => {
                activeLink.classList.remove('active');
            });
            // Add the 'active' class to the clicked link
            this.classList.add('active');
            const content = this.getAttribute('data-section');
            RenderContent(content);
        });
        
    });
    
    function RenderContent(content){
    fetch(content)
    .then(Response=>Response.text())
    .then(data=>{
        contentDiv.innerHTML=data;
        
         // Execute any script tags in the fetched content
         const scripts = contentDiv.querySelectorAll('script');
         scripts.forEach(script => {
             const newScript = document.createElement('script');
             if (script.src) {
                 // If the script has a src, load it from the external source
                 newScript.src = script.src;
                 newScript.async = false; // Ensure synchronous execution if necessary
             } else {
                 // If the script is inline, copy its content
                 newScript.text = script.innerHTML;
             }
             document.body.appendChild(newScript);
         });
     
    })
    .catch(err=>{
        contentDiv.innerHTML= '<p>error 404</p>'
    })

   
} RenderContent('pages/dash.html');




});





