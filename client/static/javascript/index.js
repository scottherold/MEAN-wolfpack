// Client-side JS for dynamic AJAX calls to server
$( () => {
    // <--- Variables --->
    let content = "";
    let wolfList = "";
    let wolf = "";
    let nameError = "";
    let roleError = "";
    let ageError = "";

    // <--- Page Event Listeners --->
    $('#content').on(`click`, '#new', () => {
        // Dynamically Generate Content
        content = `<div class="row justify-content-center py-3">
                        <h3 class="text-light">Add a Wolf to the Wolfpack</h3>
                    </div>
                    <form id="create">
                        <div class="row justify-content-center px-4 pb-2">
                            <div class="col-10">
                                <div class="row justify-content-start mb-1">
                                    <div class="col-4">
                                        <label for="name" class="text-white">Name</label>
                                    </div>
                                    <div class="col-8">
                                        <input type="text" name="name" class="w-100 text-light rounded bg-dark" />
                                    </div>
                                </div>
                                <div id="name-errors" class="row justify-content-start mb-1 ml-1">

                                </div>
                                <div class="row justify-content-start mb-1">
                                    <div class="col-4">
                                        <label for="role" class="text-white">Wolf Role</label>
                                    </div>
                                    <div class="col-8">
                                        <input type="text" name="role" class="w-100 text-light rounded bg-dark" />
                                    </div>
                                </div>
                                <div id="role-errors" class="row justify-content-start mb-1 ml-1">

                                </div>
                                <div class="row justify-content-start mb-1">
                                    <div class="col-4">
                                        <label for="age" class="text-white">Wolf Age</label>
                                    </div>
                                    <div class="col-8">
                                        <input type="text" name="age" class="w-100 text-light rounded bg-dark" />
                                    </div>
                                </div>
                                <div id="age-errors" class="row justify-content-start mb-1 ml-1">

                                </div>
                                <div class="row justify-content-end pr-3">
                                <button type="submit" class="btn btn-dark border border-light">Submit</button>
                            </div>
                        </form>
                        <div class="row justify-content-center">
                            <button id="home" class="btn btn-dark btn-sm border-light rounded text-white">See Wolves</a>
                        </div>`

        $('#content').html(content); // dynamically generates webpage
    });

    // <--- AJAX --->
    // ** GET **
    // root API call on page load
    $.ajax({
        type: "GET",
        url: "/wolves",
        success: wolves => {
            console.log("got the data", wolves); // log the data to be sure we have it before we dive into manipulating the DOM
        
        // Dynamically generate HTML content
        // loop to generate wolves data
        if(wolves) {
            // first line generated manually
            wolfList = `<p id="wolf${ wolves[0]._id }" class="btn btn-link btn-lg text-white w-100">${ wolves[0].name }</p><br>`;
                for (let i = 1; i < wolves.length; i++) {
                    // Additional lines generated dynamically
                    wolfList = wolfList + `<p id="wolf${ wolves[i]._id }" class="btn btn-link btn-lg text-white w-100">${ wolves[i].name }</p><br>`;
                }
        } else {
            // No data, generate note
            wolfList = '<h5 class="text-light text-center pb-2">No Wolves in this pack...</h5>';
        }

        // Dynamically generate content
        content = `<div class="row justify-content-center py-3">
                        <h3 class="text-light">Members of the Wolfpack</h3>
                    </div>
                    <div class="row justify-content-center px-2 pb-3">
                        ${wolfList}
                    </div>
                    <div class="row justify-content-center">
                        <button id="new" class="btn btn-dark btn-sm border-light rounded text-white">Add New Wolf</button>
                    </div>`

        $('#content').html(content); // dynamically generates webpage
        },
        error: (err) => {
            console.log(err.responseJSON.errors);
        }
    });

    // Home button -- return to index
    $('#content').on('click', '#home', page => {
        page.preventDefault() // prevent page reload on failed AJAX call
        
        $.ajax({
            type: "GET",
            url: "/wolves",
            success: wolves => {
                console.log("got the data", wolves); // log the data to be sure we have it before we dive into manipulating the DOM
            
            // Dynamically generate HTML content
            // loop to generate wolves data
            if(wolves) {
                // first line generated manually
                wolfList = `<p id="wolf${ wolves[0]._id }" class="btn btn-link btn-lg text-white w-100">${ wolves[0].name }</p><br>`;
                for (let i = 1; i < wolves.length; i++) {
                    // Additional lines generated dynamically
                    wolfList = wolfList + `<p id="wolf${ wolves[i]._id }" class="btn btn-link btn-lg text-white w-100">${ wolves[i].name }</p><br>`;
                }
            } else {
                // No data, generate note
                wolfList = '<h5 class="text-light text-center pb-2">No Wolves in this pack...</h5>';
            }
    
            // Dynamically generate content
            content = `<div class="row justify-content-center py-3">
                            <h3 class="text-light">Members of the Wolfpack</h3>
                        </div>
                        <div class="row justify-content-center px-2 pb-3">
                            ${wolfList}
                        </div>
                        <div class="row justify-content-center">
                            <button id="new" class="btn btn-dark btn-sm border-light rounded text-white">Add New Wolf</button>
                        </div>`
    
            $('#content').html(content); // dynamically generates webpage
            },
            error: (err) => {
                console.log(err.responseJSON.errors);
            }
        });
    });

    // Show
    $('#content').on('click', `[id^='wolf']`, function(page) {
        page.preventDefault() // prevent page reload on failed AJAX call
        
        $.ajax({
            type: "GET",
            url: `/wolves/${this.id.slice(4, this.id.length)}`,
            success: wolf => {
                console.log("got the data", wolf); // log the data to be sure we have it before we dive into manipulating the DOM
                content = `<div class="row justify-content-center py-3">
                                <h3 class="text-light">Information for ${wolf.name}</h3>
                            </div>
                            <div class="row justify-content-center px-4 pb-2">
                                <div class="col-10">
                                    <div class="row justify-content-start mb-1">
                                        <div class="col-4">
                                            <p class="text-light">Name</p>
                                        </div>
                                        <div class="col-8">
                                            <p class="text-light">${wolf.name}</p>
                                        </div>
                                    </div>
                                    <div class="row justify-content-start mb-1">
                                        <div class="col-4">
                                            <p class="text-light">Wolf Role</p>
                                        </div>
                                        <div class="col-8">
                                            <p class="text-light">${wolf.role}</p>
                                        </div>
                                    </div>
                                    <div class="row justify-content-start mb-1">
                                        <div class="col-4">
                                            <p class="text-light">Wolf Age</p>
                                        </div>
                                        <div class="col-8">
                                            <p class="text-light">${wolf.age}</p>
                                        </div>
                                    </div>
                                    <div class="row justify-content-center">
                                        <button id="edit${wolf._id}" class="btn btn-sm btn-link text-white">Edit</a>
                                        <button id="delete${wolf._id}" class="btn btn-sm btn-link text-white">Delete</a>
                                    </div>
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <button id="home" class="btn btn-dark btn-sm border-light rounded text-white">See Wolves</a>
                            </div>`

                $('#content').html(content); // dynamically generates webpage
            },
            error: (err) => {
                console.log(err.responseJSON.errors);
            }
        });
    });

    // Edit
    $('#content').on('click', `[id^='edit']`, function(page) {
        page.preventDefault() // prevent page reload on failed AJAX call
        
        $.ajax({
            type: "GET",
            url: `/wolves/${this.id.slice(4, this.id.length)}`,
            success: wolf => {
                console.log("got the data", wolf); // log the data to be sure we have it before we dive into manipulating the DOM
                
                content = `<div class="row justify-content-center py-3">
                                <h3 class="text-light">Edit ${wolf.name}</h3>
                            </div>
                            <form id="update">
                                <input id="wolf-id" type="hidden" value="${wolf._id}">
                                <div class="row justify-content-center px-4 pb-2">
                                    <div class="col-10">
                                        <div class="row justify-content-start mb-1">
                                            <div class="col-4">
                                                <label for="name" class="text-white">Name</label>
                                            </div>
                                            <div class="col-8">
                                                <input type="text" name="name" value="${wolf.name}" class="w-100 text-light rounded bg-dark" />
                                            </div>
                                        </div>
                                        <div id="name-errors" class="row justify-content-start mb-1 ml-1">

                                        </div>
                                        <div class="row justify-content-start mb-1">
                                            <div class="col-4">
                                                <label for="role" class="text-white">Wolf Role</label>
                                            </div>
                                            <div class="col-8">
                                                <input type="text" name="role" value="${wolf.role}" class="w-100 text-light rounded bg-dark" />
                                            </div>
                                        </div>
                                        <div id="name-errors" class="row justify-content-start mb-1 ml-1">

                                        </div>
                                        <div class="row justify-content-start mb-1">
                                            <div class="col-4">
                                                <label for="age" class="text-white">Wolf Age</label>
                                            </div>
                                            <div class="col-8">
                                                <input type="text" name="age" value="${wolf.age}" class="w-100 text-light rounded bg-dark" />
                                            </div>
                                        </div>
                                        <div id="name-errors" class="row justify-content-start mb-1 ml-1">

                                        </div>
                                        <div class="row justify-content-end pr-3">
                                            <button type="submit" class="btn btn-dark border border-light">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div class="row justify-content-center">
                                <button id="home" class="btn btn-dark btn-sm border-light rounded text-white">See Wolves</a>
                            </div>`

                $('#content').html(content); // dynamically generates webpage
            },
            error: (err) => {
                console.log(err.responseJSON.errors);
            }
        });
    });

    // Delete
    $('#content').on('click', `[id^='delete']`, function(page) {
        page.preventDefault() // prevent page reload on failed AJAX call
        
        $.ajax({
            type: "DELETE",
            url: `/wolves/${this.id.slice(6, this.id.length)}`,
            success: () => {
                console.log("got the data", wolf); // log the data to be sure we have it before we dive into manipulating the DOM
                $.ajax({
                    type: "GET",
                    url: "/wolves",
                    success: wolves => {
                        console.log("got the data", wolves); // log the data to be sure we have it before we dive into manipulating the DOM
                    
                    // Dynamically generate HTML content
                    // loop to generate wolves data
                    if(wolves) {
                        // first line generated manually
                        wolfList = `<p id="wolf${ wolves[0]._id }" class="btn btn-link btn-lg text-white w-100">${ wolves[0].name }</p><br>`;
                        for (let i = 1; i < wolves.length; i++) {
                            // Additional lines generated dynamically
                            wolfList = wolfList + `<p id="wolf${ wolves[i]._id }" class="btn btn-link btn-lg text-white w-100">${ wolves[i].name }</p><br>`;
                        }
                    } else {
                        // No data, generate note
                        wolfList = '<h5 class="text-light text-center pb-2">No Wolves in this pack...</h5>';
                    }
            
                    // Dynamically generate content
                    content = `<div class="row justify-content-center py-3">
                                    <h3 class="text-light">Members of the Wolfpack</h3>
                                </div>
                                <div class="row justify-content-center px-2 pb-3">
                                    ${wolfList}
                                </div>
                                <div class="row justify-content-center">
                                    <button id="new" class="btn btn-dark btn-sm border-light rounded text-white">Add New Wolf</button>
                                </div>`
            
                    $('#content').html(content); // dynamically generates webpage
                    },
                    error: (err) => {
                        console.log(err.responseJSON.errors);
                    }
                });
            },
            error: (err) => {
                console.log(err.responseJSON.errors);
            }
        });
    });

    // ** POST **
    // New
    $('#content').on('submit', '#create', page => {
        page.preventDefault() // prevent page reload on failed AJAX call
        
        $.ajax({
            type: "POST",
            url: "/wolves/",
            data: $('#create').serialize(),
            success: () => {
                $.ajax({
                    type: "GET",
                    url: "/wolves",
                    success: wolves => {
                        console.log("got the data", wolves); // log the data to be sure we have it before we dive into manipulating the DOM
                    
                    // Dynamically generate HTML content
                    // loop to generate wolves data
                    if(wolves) {
                        // first line generated manually
                        wolfList = `<p id="wolf${ wolves[0]._id }" class="btn btn-link btn-lg text-white w-100">${ wolves[0].name }</p><br>`;
                        for (let i = 1; i < wolves.length; i++) {
                            // Additional lines generated dynamically
                            wolfList = wolfList + `<p id="wolf${ wolves[i]._id }" class="btn btn-link btn-lg text-white w-100">${ wolves[i].name }</p><br>`;
                        }
                    } else {
                        // No data, generate note
                        wolfList = '<h5 class="text-light text-center pb-2">No Wolves in this pack...</h5>';
                    }
            
                    // Dynamically generate content
                    content = `<div class="row justify-content-center py-3">
                                    <h3 class="text-light">Members of the Wolfpack</h3>
                                </div>
                                <div class="row justify-content-center px-2 pb-3">
                                    ${wolfList}
                                </div>
                                <div class="row justify-content-center">
                                    <button id="new" class="btn btn-dark btn-sm border-light rounded text-white">Add New Wolf</button>
                                </div>`
            
                    $('#content').html(content); // dynamically generates webpage
                    },
                    error: (err) => {
                        console.log(err.responseJSON.errors);
                    }
                });
            },
            error: (err) => {
                console.log(err.responseJSON.errors);
                // Adds errors messages dynamically to content
                if (err.responseJSON.errors.name) {
                    nameError = `<p class=text-danger>${err.responseJSON.errors.name.message}</p>`
                    $('#name-errors').html(nameError);
                }
                if (err.responseJSON.errors.role) {
                    roleError = `<p class=text-danger>${err.responseJSON.errors.role.message}</p>`
                    $('#role-errors').html(roleError);
                }
                if (err.responseJSON.errors.age) {
                    ageError = `<p class=text-danger>${err.responseJSON.errors.age.message}</p>`
                    $('#age-errors').html(ageError);
                }
            }
        });
    });

    // Update
    $('#content').on('submit', '#update', page => {
        page.preventDefault() // prevent page reload on failed AJAX call
        let id = $('#wolf-id').val();

        $.ajax({
            type: "PUT",
            url: `/wolves/${id}`,
            data: $('#update').serialize(),
            success: () => {
                $.ajax({
                    type: "GET",
                    url: `/wolves/${id}`,
                    success: wolf => {
                        console.log("got the data", wolf); // log the data to be sure we have it before we dive into manipulating the DOM
                        content = `<div class="row justify-content-center py-3">
                                        <h3 class="text-light">Information for ${wolf.name}</h3>
                                    </div>
                                    <div class="row justify-content-center px-4 pb-2">
                                        <div class="col-10">
                                            <div class="row justify-content-start mb-1">
                                                <div class="col-4">
                                                    <p class="text-light">Name</p>
                                                </div>
                                                <div class="col-8">
                                                    <p class="text-light">${wolf.name}</p>
                                                </div>
                                            </div>
                                            <div class="row justify-content-start mb-1">
                                                <div class="col-4">
                                                    <p class="text-light">Wolf Role</p>
                                                </div>
                                                <div class="col-8">
                                                    <p class="text-light">${wolf.role}</p>
                                                </div>
                                            </div>
                                            <div class="row justify-content-start mb-1">
                                                <div class="col-4">
                                                    <p class="text-light">Wolf Age</p>
                                                </div>
                                                <div class="col-8">
                                                    <p class="text-light">${wolf.age}</p>
                                                </div>
                                            </div>
                                            <div class="row justify-content-center">
                                                <button id="edit${wolf._id}" class="btn btn-sm btn-link text-white">Edit</a>
                                                <button id="delete${wolf._id}" class="btn btn-sm btn-link text-white">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row justify-content-center">
                                        <button id="home" class="btn btn-dark btn-sm border-light rounded text-white">See Wolves</a>
                                    </div>`
        
                        $('#content').html(content); // dynamically generates webpage
                    },
                    error: (err) => {
                        console.log(err.responseJSON.errors);
                    }
                });
            },
            error: (err) => {
                console.log(err.responseJSON.errors);
                // Adds errors messages dynamically to content
                if (err.responseJSON.errors.name) {
                    nameError = `<p class=text-danger>${err.responseJSON.errors.name.message}</p>`
                    $('#name-errors').html(nameError);
                }
                if (err.responseJSON.errors.role) {
                    roleError = `<p class=text-danger>${err.responseJSON.errors.role.message}</p>`
                    $('#role-errors').html(roleError);
                }
                if (err.responseJSON.errors.age) {
                    ageError = `<p class=text-danger>${err.responseJSON.errors.age.message}</p>`
                    $('#age-errors').html(ageError);
                }
            }
        });
    });
})