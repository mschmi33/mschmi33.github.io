// header-footer.js - Dynamically loads header and footer content

document.addEventListener('DOMContentLoaded', function() {
    // Load Header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = `
            <h1>Matt Schmidt's Mellow Sable || ITSC3135</h1>
            <nav>
                <a href="index.html">Home</a> ||
                <a href="./">Introduction</a> ||
                <a href="intro_form.html">Introduction Form</a> ||
                <a href="contract.html">Contract</a>
            </nav>
        `;
    }

    // Load Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
            <nav>
                <a href="https://webpages.uncc.edu/mschmi33">Charlotte.edu</a> ||
                <a href="https://github.com/mschmi33">GitHub</a> ||
                <a href="https://mschmi33.github.io">GitHub.io</a> ||
                <a href="https://www.freecodecamp.org/mschmi33">FreeCodeCamp</a> ||
                <a href="https://www.codecademy.com/profiles/mschmi33">Codecademy</a> ||
                <a href="https://www.linkedin.com/in/mschmi33">LinkedIn</a>
            </nav>
            <nav>
                <a href="stuff/CraPp && webSite.html">Crapp Website</a> ||
                <a href="mellowsable.com/index.html">Mellow Sable</a>
            </nav>
            <p>Designed by <a href="schmidtbydesign.com/index.html">Schmidt by Design</a> &copy; 2025</p>
        `;
    }
});