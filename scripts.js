document.addEventListener('DOMContentLoaded', () => {
    // Select all anchor tags with the class "nav-link"
    const links = document.querySelectorAll('.nav-link');
    const contentDiv=document.querySelector('.content')
    const hamMenu = document.querySelector('.hamMenu');
    const nav = document.querySelector('.nav');
// Add click event listener to ham menu
    hamMenu.addEventListener('click',()=>{
        hamMenu.classList.toggle("active")
        nav.classList.toggle("active")
    })
    // Add click event listener to each link
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();  // Prevent default anchor behavior

            // Remove the 'active' class from any currently active links
            document.querySelectorAll('.nav-link.active').forEach(activeLink => {
                activeLink.classList.remove('active');
                hamMenu.classList.remove('active');
                nav.classList.remove('active');

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
    })
    .catch(err=>{
        contentDiv.innerHTML= '<p>error 404</p>'
    })

   
} RenderContent('pages/dash.html');

});
