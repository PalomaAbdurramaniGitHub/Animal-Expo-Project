
// JavaScript për të përfshirë përmbajtjen e header-it nga template
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        const template = document.createElement('template');
        template.innerHTML = data.trim();
        document.getElementById('headerPlaceholder').appendChild(template.content);
    });


fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        const template = document.createElement('template');
        template.innerHTML = data.trim();
        document.getElementById('footerPlaceholder').appendChild(template.content);
    });




   