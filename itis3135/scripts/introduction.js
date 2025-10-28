// introduction.js - Handles the introduction form functionality

document.addEventListener('DOMContentLoaded', function() {
    const formElement = document.getElementById('introForm');
    const resultsDiv = document.getElementById('results');
    const clearButton = document.getElementById('clearBtn');
    const addCourseButton = document.getElementById('addCourseBtn');
    const coursesContainer = document.getElementById('coursesContainer');
    let courseCount = document.querySelectorAll('.course-entry').length;

    // Add event listeners to existing delete buttons
    document.querySelectorAll('.deleteCourseBtn').forEach(btn => {
        btn.addEventListener('click', function() {
            btn.closest('.course-entry').remove();
            updateCourseNumbers();
        });
    });

    // Prevent default form submission
    formElement.addEventListener('submit', function(e) {
        e.preventDefault(); // prevents page refresh / default behavior
        
        // Validate required fields
        if (!formElement.checkValidity()) {
            formElement.reportValidity();
            return;
        }
        
        // Generate the introduction page
        generateIntroductionPage();
    });

    // Clear button functionality - empties all fields
    clearButton.addEventListener('click', function() {
        // Clear all text inputs
        Array.from(document.querySelectorAll('form input')).forEach((input) => {
            input.value = '';
        });
        
        // Clear all textareas
        Array.from(document.querySelectorAll('form textarea')).forEach((textarea) => {
            textarea.value = '';
        });
        
        // Remove additional course entries (keep only the first one)
        const courseEntries = document.querySelectorAll('.course-entry');
        for (let i = 1; i < courseEntries.length; i++) {
            courseEntries[i].remove();
        }
        courseCount = 1;
        
        // Clear the first course entry fields
        const firstCourse = document.querySelector('.course-entry');
        if (firstCourse) {
            firstCourse.querySelectorAll('input').forEach(input => input.value = '');
        }
    });

    // Add course button functionality
    addCourseButton.addEventListener('click', function() {
        courseCount++;
        const courseEntry = document.createElement('div');
        courseEntry.className = 'course-entry';
        courseEntry.innerHTML = `
            <h4>Course ${courseCount}</h4>
            <label>Department: <span class="required">*</span></label>
            <input type="text" class="courseDept" placeholder="e.g., ITIS" required>
            
            <label>Number: <span class="required">*</span></label>
            <input type="text" class="courseNum" placeholder="e.g., 3135" required>
            
            <label>Name: <span class="required">*</span></label>
            <input type="text" class="courseName" placeholder="e.g., Web Development" required>
            
            <button type="button" class="deleteCourseBtn">Delete Course</button>
        `;
        
        coursesContainer.appendChild(courseEntry);
        
        // Add event listener to the delete button
        const deleteBtn = courseEntry.querySelector('.deleteCourseBtn');
        deleteBtn.addEventListener('click', function() {
            courseEntry.remove();
            updateCourseNumbers();
        });
    });

    // Function to update course numbers after deletion
    function updateCourseNumbers() {
        const courseEntries = document.querySelectorAll('.course-entry');
        courseEntries.forEach((entry, index) => {
            const heading = entry.querySelector('h4');
            if (heading) {
                heading.textContent = `Course ${index + 1}`;
            }
        });
        courseCount = courseEntries.length;
    }

    // Function to generate the introduction page
    function generateIntroductionPage() {
        // Collect all form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            middleName: document.getElementById('middleName').value,
            nickname: document.getElementById('nickname').value,
            lastName: document.getElementById('lastName').value,
            acknowledgment: document.getElementById('acknowledgment').value,
            acknowledgmentDate: document.getElementById('acknowledgmentDate').value,
            mascotAdj: document.getElementById('mascotAdj').value,
            mascotAnimal: document.getElementById('mascotAnimal').value,
            divider: document.getElementById('divider').value,
            imageUrl: document.getElementById('imageUrl').value,
            imageCaption: document.getElementById('imageCaption').value,
            personalStatement: document.getElementById('personalStatement').value,
            bullets: [
                document.getElementById('bullet1').value,
                document.getElementById('bullet2').value,
                document.getElementById('bullet3').value,
                document.getElementById('bullet4').value
            ],
            quote: document.getElementById('quote').value,
            quoteAuthor: document.getElementById('quoteAuthor').value,
            funnyThing: document.getElementById('funnyThing').value,
            shareItem: document.getElementById('shareItem').value,
            links: []
        };

        // Collect all links (8 total)
        for (let i = 1; i <= 8; i++) {
            const nameEl = document.getElementById(`link${i}Name`);
            const urlEl = document.getElementById(`link${i}Url`);
            if (nameEl && urlEl && nameEl.value && urlEl.value) {
                formData.links.push({ name: nameEl.value, url: urlEl.value });
            }
        }

        // Collect courses
        const courseEntries = document.querySelectorAll('.course-entry');
        formData.courses = [];
        courseEntries.forEach(entry => {
            const dept = entry.querySelector('.courseDept').value;
            const num = entry.querySelector('.courseNum').value;
            const name = entry.querySelector('.courseName').value;
            
            if (dept && num && name) {
                formData.courses.push({ dept, num, name });
            }
        });

        // Build the full name
        let fullName = formData.firstName;
        if (formData.middleName) {
            fullName += ' ' + formData.middleName;
        }
        if (formData.nickname) {
            fullName += ' "' + formData.nickname + '"';
        }
        fullName += ' ' + formData.lastName;

        // Generate the HTML for the introduction page matching the original format
        let html = `
            <h2>Introduction Form</h2>
            <h2>${fullName}</h2>
            
            <figure>
                <img src="${formData.imageUrl}" alt="${fullName}">
                <figcaption><em>${formData.imageCaption}</em></figcaption>
            </figure>

            <p>${formData.personalStatement}</p>

            <ul>
                <li><strong>Personal Background</strong>: ${formData.bullets[0]}</li>
                <li><strong>Professional Background</strong>: ${formData.bullets[1]}</li>
                <li><strong>Academic Background</strong>: ${formData.bullets[2]}</li>
        `;

        // Add courses section if courses exist
        if (formData.courses.length > 0) {
            html += `<li><strong>Current Courseload</strong>:<ul>`;
            formData.courses.forEach(course => {
                html += `<li>${course.dept}${course.num} - ${course.name}.</li>`;
            });
            html += `</ul></li>`;
        }

        // Add fun fact
        html += `<li><strong>Fun Fact</strong>: ${formData.bullets[3]}</li>`;
        html += `</ul>`;

        // Add optional funny thing
        if (formData.funnyThing) {
            html += `
                <section>
                    <h3>Something Funny</h3>
                    <p>${formData.funnyThing}</p>
                </section>
            `;
        }

        // Add optional share item
        if (formData.shareItem) {
            html += `
                <section>
                    <h3>Something I'd Like to Share</h3>
                    <p>${formData.shareItem}</p>
                </section>
            `;
        }

        // Display the results
        resultsDiv.innerHTML = html;
        resultsDiv.style.display = 'block';
        formElement.style.display = 'none';

        // Create footer with links
        const footerNav = document.querySelector('footer nav');
        if (footerNav && formData.links.length > 0) {
            let linkHTML = '';
            formData.links.forEach((link, index) => {
                if (index > 0) linkHTML += ' || ';
                linkHTML += `<a href="${link.url}">${link.name}</a>`;
            });
            footerNav.innerHTML = linkHTML;
        }

        // Add reset button
        const resetBtn = document.createElement('button');
        resetBtn.type = 'button';
        resetBtn.id = 'resetProgress';
        resetBtn.textContent = 'Reset Form';
        resetBtn.style.marginTop = '30px';
        resetBtn.addEventListener('click', resetProgress);
        resultsDiv.appendChild(resetBtn);
    }

    // Function to reset progress and show the form again
    function resetProgress() {
        resultsDiv.style.display = 'none';
        formElement.style.display = 'block';
        formElement.reset(); // Reset to default values
        
        // Restore footer links by re-running the footer loader
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
    }
});