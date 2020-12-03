let previousUserDepartment;
let previousUserEmail;
let previousUserFirst;
let previousUserJob;
let previousUserLast;
let previousUserLoc;
let previousDepartmentName;
let previousDepartmentLocation;
let previousLocName;
let locName;
let depName;
let getAllFunc = false;
let getByDepartmentFunc = false;
let getByLocationFunc = false;
let locationsName = false;
let locationsSize = false;
let departmentsName = false;
let departmentsSize = false;
const emailRegex = /\S+@\S+\.\S+/;
const nameRegex = /^[a-z ,.'-]+$/i;
$boxHeader = $("#box-header");
$subHeader = $("#box-sub-header");
const userHtml = (
  userId,
  firstName,
  lastName,
  job,
  email,
  location,
  locationId,
  departmentId,
  department
) => {
  return ` <div id="user-card${userId}"class="card text-center">
  <form class="user-card-form" id="edit-form-${userId}" onsubmit="return bindSave(${userId})">
    <fieldset id="fieldset-${userId}"class="user-card-fieldset" disabled="disabled">
    <div class="form-row-names card-title">
    <label for="first-name"><i class="fas fa-user" style="color: white;"></i></label>
    <br>
    <input id="user-first-name-${userId}" name="first-name"type="text" value="${firstName}" required placeholder="First Name"> 
    <input id="user-last-name-${userId}" name="last-name"type="text" value="${lastName}" required placeholder="Last Name">
  
    </div>
 
    <div class="form-row">
    <label for="job"><i class="fas fa-hammer"></i></label>
    <input id="user-job-${userId}" name="job" type="text" value="${job}" required placeholder="Job Title">

    </div>
    <div class="form-row">
    <label for="email"><i class="fas fa-envelope"></i></label>
    <input id="user-email-${userId}" name="email"type="email" value="${email}" required placeholder="Email">

    </div>
    <div class="form-row">
    <div class="form-row">
    <label for="department"><i class="fas fa-building"></i></label>
    <select id="user-department-${userId}" class="department-select" name="department">
    <option value="${departmentId}">${department}</option>
    </select>

    </div>
    <label for="location"><i class="fas fa-thumbtack"></i></label>
    <select id="user-location-${userId}" name="location" disabled="disabled">
    <option value=${locationId}>${location}</option>
    </select
    </div>
    </fieldset>
    <button id="save-btn-${userId}"type="submit" style="display: none;"class="save-btn btn btn-default btn-primary"><i class="fas fa-check" style="color: white;font-size:1rem;"></i></button>
    <button id="edit-btn-${userId}"type="button" class="edit-btn btn btn-default btn-primary"><i class="fas fa-edit" style="color: white;font-size:1rem;"></i></button>
    <button id="delete-btn-${userId}" type="button" class="delete-btn btn-default btn btn-danger"><i class="fas fa-trash" style="color: white;font-size:1rem;"></i></button>
    <button id="cancel-btn-${userId}"type="button" style="display: none;" class="cancel-btn btn-default btn btn-danger"><i class="fas fa-times" style="color: white;font-size:1rem;"></i></button>        
</form>
  </div>`;
};

const departmentHtml = (department, employees, location, id, locationID) => {
  return ` <div id="department-card-${id}"class="card text-center" >
  <form id="edit-form-${id}" class="department-card-form card-form" method="POST" onsubmit="return bindDepartmentSave(${id});">
    <fieldset class="user-card-fieldset" disabled="disabled">
    <div id="department-header"class="form-row-names card-title">
    <label for="department-name"><i class="fas fa-building" style="color: white;"></i></label>
    <br>
    <input class="department-placeholder" id="department-name-${id}" name="department-name"type="text" value="${department}" required>

    </div>
 
    <div class="form-row">
    <label for="employees"><i class="fas fa-users"></i></label>
    <input id="department-employees-${id}" name="employees"type="number" value="${employees}" disabled="disabled">
    </div>
    
    <div class="form-row">
    <label for="location"><i class="fas fa-thumbtack"></i></label>
    <select id="department-location-${id}" name="location" class="department-location" value="${locationID}">
    <option value=${locationID}>${location}</option>
    </select>
    </div>
    </fieldset>
    <button id="save-btn-${id}"type="submit" style="display: none;"class="save-btn btn btn-default btn-primary"><i class="fas fa-check" style="color: white;font-size:1rem;"></i></button>
    <button id="edit-btn-${id}"type="button" class="edit-btn btn btn-default btn-primary"><i class="fas fa-edit" style="color: white;font-size:1rem;"></i></button>
    <button id="delete-btn-${id}" type="button" class="delete-btn btn-default btn btn-danger"><i class="fas fa-trash" style="color: white;font-size:1rem;"></i></button>
    <button id="cancel-btn-${id}"type="button" style="display: none;" class="cancel-btn btn-default btn btn-danger"><i class="fas fa-times" style="color: white;font-size:1rem;"></i></button>        
</form>
  </div>`;
};

const locationHTML = (id, name, departments, employees) => {
  return ` <div id="location-card-${id}"class="card text-center">
  <form class="location-card-form" onsubmit="return bindLocationSave(${id})" id="edit-form-${id}">
    <fieldset class="user-card-fieldset" disabled="disabled">
    <div id="department-header"class="form-row-names card-title">
    <label for="first-name"><i class="fas fa-thumbtack" style="color: white;"></i></label>
    <br>
    <input class="location-placeholder" id="location-name-${id}" name="location-name"type="text" value="${name}" required>
    </div>
 
    <div class="form-row">
    <label for="employees"><i class="fas fa-users"></i></label>
    <input id="location-employees-${id}" name="employees"type="number" value="${employees}" disabled="disabled">
    </div>

    <div class="form-row">
    <label for="employees"><i class="fas fa-building"></i></label>
    <input id="location-departments-${id}" name="departments"type="number" value="${departments}" disabled="disabled">
    </div>
    

    </fieldset>
    <button id="save-btn-${id}"type="submit" style="display: none;"class="save-btn btn btn-default btn-primary"><i class="fas fa-check" style="color: white;font-size:1rem;"></i></button>
    <button id="edit-btn-${id}"type="button" class="edit-btn btn btn-default btn-primary"><i class="fas fa-edit" style="color: white;font-size:1rem;"></i></button>
    <button id="delete-btn-${id}" type="button" class="delete-btn btn-default btn btn-danger"><i class="fas fa-trash" style="color: white;font-size:1rem;"></i></button>
    <button id="cancel-btn-${id}"type="button" style="display: none;" class="cancel-btn btn-default btn btn-danger"><i class="fas fa-times" style="color: white;font-size:1rem;"></i></button>        
</form>
  </div>`;
};

const getLastCall = () => {
  clearEmployeeBox();

  if (getAllFunc) {
    getAll();
  } else if (getByDepartmentFunc) {
    getEmployeesByLocation();
  } else if (getByLocationFunc) {
    getEmployeesByLocation();
  } else if (locationsName) {
    getLocationCards();
  } else if (locationsSize) {
    getLocationCardsSize();
  } else if (departmentsName) {
    getDepartmentCards();
  } else if (departmentsSize) {
    getDepartmentCardsBySize();
  }
  
  getAllLocations();
  fillDepartmentsList();
};

const checkFunction = (e) => {
  let arr = [];
  arr.push(e);

  console.log(arr[0]);
  return false;
};

const clearEmployeeBox = () => {
  $("#employees-box").empty();
};

const getAll = () => {
  getAllFunc = true;
  getByDepartmentFunc = false;
  getByLocationFunc = false;
  locationsName = false;
  locationsSize = false;
  departmentsName = false;
  departmentsSize = false;
  $.ajax({
    url: "./assets/php/getAll.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      clearEmployeeBox();
      let i = 0;
      $boxHeader.html("Employees");
      $subHeader.html(
        `You are currently viewing all ${result.data.length} employees sorted alphabetically by last name.`
      );

      result.data.forEach((element) => {
        i += 1;
        $("#employees-box").append(
          userHtml(
            element.id,
            element.firstName,
            element.lastName,
            element.jobTitle,
            element.email,
            element.location,
            element.locationID,
            element.departmentId,
            element.department
          )
        );
      });

      bindDelete("Are you sure you want to delete this user?");
      bindEdit();
      // bindSave("Are you sure you want to update this user?");
      bindCancel();
      getAllDepartments();
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};

const getAllDepartments = () => {
  getAllFunc = false;
  getByDepartmentFunc = true;
  getByLocationFunc = false;
  locationsName = false;
  locationsSize = false;
  departmentsName = false;
  departmentsSize = false;
  $.ajax({
    url: "./assets/php/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      result.data.forEach((element) => {
        $(".department-select").append(
          `<option value=${element.id}>${element.name}</option>`
        );
      });
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};

const getDepartmentCards = () => {
  getAllFunc = false;
  getByDepartmentFunc = false;
  getByLocationFunc = false;
  locationsName = false;
  locationsSize = false;
  departmentsName = true;
  departmentsSize = false;
  $.ajax({
    url: "./assets/php/getDepartmentCards.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      clearEmployeeBox();
      console.log(result);
      result.data.forEach((element) => {
        $("#employees-box").append(
          departmentHtml(
            element.department,
            element.employees,
            element.location,
            element.id,
            element.locationID
          )
        );
      });
      $boxHeader.html("Departments");
      $subHeader.html(
        `You are currently viewing all ${result.data.length} departments sorted alphabetically.`
      );
      bindEdit();
      bindCancel();
      //bindDepartmentSave("Are you sure you want to edit this location?");
      getAllLocations();
      bindDepartmentDelete();
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};

const getLocationCards = () => {
  getAllFunc = false;
  getByDepartmentFunc = false;
  getByLocationFunc = false;
  locationsName = true;
  locationsSize = false;
  departmentsName = false;
  departmentsSize = false;
  $.ajax({
    url: "./assets/php/getLocationCards.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      console.log(result);
      clearEmployeeBox();
      result.data.forEach((element) => {
        $("#employees-box").append(
          locationHTML(
            element.id,
            element.name,
            element.departments,
            element.employees
          )
        );
      });
      $boxHeader.html("Locations");
      $subHeader.html(
        `You are currently viewing all ${result.data.length} locations sorted alphabetically.`
      );
      bindEdit();
      bindCancel();
      //bindLocationSave();
      getAllLocations();
      bindLocationDelete();
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};

const getLocationCardsBySize = () => {
  getAllFunc = false;
  getByDepartmentFunc = false;
  getByLocationFunc = false;
  locationsName = false;
  locationsSize = true;
  departmentsName = false;
  departmentsSize = false;
  $.ajax({
    url: "./assets/php/getLocationCardsBySize.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      console.log(result);
      clearEmployeeBox();
      result.data.forEach((element) => {
        $("#employees-box").append(
          locationHTML(
            element.id,
            element.name,
            element.departments,
            element.employees
          )
        );
      });
      $boxHeader.html("Locations");
      $subHeader.html(
        `You are currently viewing all ${result.data.length} locations sorted by location size.`
      );
      bindEdit();
      bindCancel();
      //bindLocationSave();
      getAllLocations();
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};

const getDepartmentCardsBySize = () => {
  getAllFunc = false;
  getByDepartmentFunc = false;
  getByLocationFunc = false;
  locationsName = false;
  locationsSize = false;
  departmentsName = false;
  departmentsSize = true;
  $.ajax({
    url: "./assets/php/getDepartmentCardsBySize.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      $boxHeader.html("Departments");
      $subHeader.html(
        `You are currently viewing all ${result.data.length} departments sorted by department size.`
      );
      clearEmployeeBox();
      console.log(result);
      result.data.forEach((element) => {
        $("#employees-box").append(
          departmentHtml(
            element.department,
            element.employees,
            element.location,
            element.id,
            element.locationID
          )
        );
      });
      bindEdit();
      bindCancel();
      bindDepartmentDelete();
      getAllLocations();
      fillDepartmentsList();
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};


const fillDepartmentsList = () => {
  $.ajax({
    url: "./assets/php/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      $('.department-location').empty();
      $('.department-select').empty();
      $("#departments-list").empty();
      $(".departments-list").empty();


      result.data.forEach((element) => {
         
        let name = element.name;
        if (name.length > 20) {
          name = name.split(" ")[0] + "...";
        }
        $("#departments-list").append(`   <li>
        <a title="${element.name}"class="department-filter" name=${element.id} href="#">
          <i class="metismenu-icon"></i>
        ${name}
        </a>
      </li>`);
        $(".departments-list").append(`
      <option value=${element.id}>${element.name}</option>
      `);
      });
      $(".department-filter").on("click", (e) => {
        let departmentId = $(e.currentTarget).attr("name");
        let departmentName = $(e.currentTarget).attr("title");
        getEmployeeBySpecificDepartment(departmentId, departmentName);
      });


      depName= $("#delete-department-val option:selected").text();
    },



    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};

const deleteEmployee = (num) => {
  $.ajax({
    url: "./assets/php/deleteUserByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: parseInt(num),
    },
    success: function (result) {
      console.log(result);
      getLastCall();
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};

const getEmployeeBySpecificDepartment = (departmentId, departmentName) => {
  getAllFunc = false;
  getByDepartmentFunc = true;
  getByLocationFunc = false;
  locationsName = false;
  locationsSize = false;
  departmentsName = false;
  departmentsSize = false;
  $.ajax({
    url: "./assets/php/getEmployeesBySpecificDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      department: parseInt(departmentId),
    },
    success: function (result) {
      $boxHeader.html("Employees");
      let employee;
      if (result.data.length === 1) {
        employee = "employee";
      } else {
        employee = "employees";
      }
      $subHeader.html(
        `You are currently viewing ${result.data.length} ${employee} from the ${departmentName} department.`
      );
      clearEmployeeBox();
      let i = 0;
      $('#employees-box').append(`<div id="managementDiv"></div>
      <div id="employeeDiv"></div>`)

      result.data.forEach(element => {
        if (element.jobTitle.toLowerCase().includes('lead') || element.jobTitle.toLowerCase().includes('ceo') || element.jobTitle.toLowerCase().includes('head') || element.jobTitle.toLowerCase().includes('manager')){
          $('#managementDiv').append( userHtml(
            element.id,
            element.firstName,
            element.lastName,
            element.jobTitle,
            element.email,
            element.location,
            element.locationID,
            element.departmentID,
            element.department
          ))
        }
      })

      result.data.forEach((element) => {
        if (!element.jobTitle.toLowerCase().includes('lead') && !element.jobTitle.toLowerCase().includes('ceo') && !element.jobTitle.toLowerCase().includes('head') && !element.jobTitle.toLowerCase().includes('manager')){
        $("#employeeDiv").append(
          userHtml(
            element.id,
            element.firstName,
            element.lastName,
            element.jobTitle,
            element.email,
            element.location,
            element.locationID,
            element.departmentID,
            element.department
          )
        );
      }
      });
    
      bindDelete("Are you sure you want to delete this user?");
      getAllDepartments();
      bindEdit();
      // bindSave("Are you sure you want to update this user?");
      bindCancel();
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};

/*
$(".search-input").on("keyup", (e) =>  {
  let searchVal = $(e.currentTarget).val().toLowerCase();
  console.log(searchVal);
  $.ajax({
    url: "./assets/php/getAllLocations.php",
    type: "POST",
    dataType: "json",
    success: function (result) {

      $('#delete-location-val').empty();
      $("#locations-list").empty();
      $('#department-location').empty();
  
      result.data.forEach((element) => {
        $("#locations-list").append(` <li>
        <a id="location-${element.id}" class="location-filter" href="#">
          <i class="metismenu-icon"> </i>${element.name}
        </a>
      </li>`);
      $(".department-location").append(`
      <option value="${element.id}">${element.name}</option>
      `);

      });


      $(".location-filter").on("click", (e) => {
        let name = $(e.currentTarget).html().split(">");
        let loc = name[2].trim();
       

        getEmployeeBySpecificLocation(loc);
      });

      locName= $("#delete-location-val option:selected").text();
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
})
*/

const getAllLocations = () => {
  $.ajax({
    url: "./assets/php/getAllLocations.php",
    type: "POST",
    dataType: "json",
    success: function (result) {

      $('#delete-location-val').empty();
      $("#locations-list").empty();
      $('#department-location').empty();
  
      result.data.forEach((element) => {
        $("#locations-list").append(` <li>
        <a id="location-${element.id}" class="location-filter" href="#">
          <i class="metismenu-icon"> </i>${element.name}
        </a>
      </li>`);
      $(".department-location").append(`
      <option value="${element.id}">${element.name}</option>
      `);

      });


      $(".location-filter").on("click", (e) => {
        let name = $(e.currentTarget).html().split(">");
        let loc = name[2].trim();
       

        getEmployeeBySpecificLocation(loc);
      });

      locName= $("#delete-location-val option:selected").text();
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};

const getEmployeeBySpecificLocation = (name) => {
  $.ajax({
    url: "./assets/php/getEmployeesBySpecificLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      location: JSON.stringify(name),
    },
    success: function (result) {
      $boxHeader.html("Employees");
      $subHeader.html(
        `You are currently viewing ${result.data.length} employees that work in ${name}.`
      );
      clearEmployeeBox();
      result.data.forEach((element) => {
        $("#employees-box").append(
          userHtml(
            element.id,
            element.firstName,
            element.lastName,
            element.jobTitle,
            element.email,
            element.location,
            element.locationID,
            element.departmentId,
            element.department
          )
        );
      });
      getAllDepartments();
      bindDelete("Are you sure you want to delete this user?");
      bindEdit();
      //  bindSave("Are you sure you want to update this user?");
      bindCancel();
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};
const getEmployeesByDepartment = () => {
  $.ajax({
    url: "assets/php/getEmployeesByDepartment.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      if (result.status.code == 200) {
        $boxHeader.html("Employees");
        $subHeader.html(
          `You are currently viewing all ${result.data.length} employees sorted alphabetically by department.`
        );
        let i = 0;
        result.data.forEach((element) => {
          i += 1;
          $("#employees-box").append(
            userHtml(
              element.id,
              element.firstName,
              element.lastName,
              element.jobTitle,
              element.email,
              element.location,
              element.locationID,
              element.departmentId,
              element.department
            )
          );
        });
        getAllDepartments();
        getAllFunc = false;
        getByDepartmentFunc = true;
        getByLocationFunc = false;
        bindDelete("Are you sure you want to delete this user?");
        bindEdit();
        //   bindSave("Are you sure you want to update this user?");
        bindCancel();
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(`Database error: ${textStatus}`);
    },
  });
};

const getEmployeesByLocation = () => {
  getAllFunc = false;
  getByDepartmentFunc = false;
  getByLocationFunc = true;
  locationsName = false;
  locationsSize = false;
  departmentsName = false;
  departmentsSize = false;
  $.ajax({
    url: "assets/php/getEmployeesByLocation.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      if (result.status.code == 200) {
        $boxHeader.html("Employees");
        $subHeader.html(
          `You are currently viewing all ${result.data.length} employees sorted alphabetically by location.`
        );
        let i = 0;
        result.data.forEach((element) => {
          i += 1;
          $("#employees-box").append(
            userHtml(
              element.id,
              element.firstName,
              element.lastName,
              element.jobTitle,
              element.email,
              element.location,
              element.locationID,
              element.departmentId,
              element.department
            )
          );
        });
        getAllDepartments();
        bindDelete("Are you sure you want to delete this user?");
        bindEdit();
        //  bindSave("Are you sure you want to update this user?");
        bindCancel();
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(`Database error: ${textStatus}`);
    },
  });
};
const editLocation = (num) => {
  $.ajax({
    url: "assets/php/editLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      id: parseInt(num),
      name: JSON.stringify($(`#location-name-${num}`).val()),
    },
    success: function (result) {
      if (result.status.name == "ok") {
        console.log(result);
        alert("User updated!");
        getLastCall();
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(`Database error: ${textStatus}`);
      console.log(jqXHR);
    },
  });
};
const createUser = () => {
  $.ajax({
    url: "./assets/php/createNewEmployee.php",
    type: "POST",
    dataType: "json",
    data: {
      first: JSON.stringify($("#create-user-first").val()),
      last: JSON.stringify($("#create-user-last").val()),
      job: JSON.stringify($("#create-user-job").val()),
      email: JSON.stringify($("#create-user-email").val()),
      depID: parseInt($("#create-user-department").val()),
    },
    success: function (result) {
      $(".form-overlay").fadeOut();
      getLastCall();
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};

const createDepartment = () => {
  let name = $("#create-department-department").val().trim();
  let locId = $("#create-department-location").val();
  $.ajax({
    url: "./assets/php/insertDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      name: name,
      locationID: parseInt(locId),
    },
    success: function (result) {
      $("#create-user-department").empty();
      $("#departments-list").empty();
      $(".form-overlay").fadeOut();
      getLastCall();
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};

const insertLocation = () => {
  $.ajax({
    url: "./assets/php/insertLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      name: JSON.stringify($("#create-location-name").val().trim()),
    },
    success: function (result) {
      $(".form-overlay").fadeOut();
      getLastCall();
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};

const deleteLocation = (id) => {
  let locID;
  if (!id) {
    locID = $("#delete-location-val").val();
  } else {
    locID = id;
  }
  $.ajax({
    url: "./assets/php/deleteLocationByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: parseInt(id),
    },
    success: function (result) {
      $(".form-overlay").fadeOut("slow");
      getLastCall();
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};

const deleteDepartmentCheck = (num, name) => {
  let deleteVal;
  let deleteName;
 
  if (!num && !num) {
    deleteVal = $("#delete-department-val").val();
    deleteName = depName;
  } else {
    deleteVal = num;
    deleteName = name;
  }
  $.ajax({
    url: "./assets/php/getDepartmentForDelete.php",
    type: "POST",
    dataType: "json",
    data: {
      department: parseInt(deleteVal),
    },
    success: function (result) {
      if (result.data[0]) {
        if (
          confirm(
            "You cannot delete departments with employed personnel! Edit these employees now?"
          )
        ) {
          $('.form-overlay').fadeOut();
          getEmployeeBySpecificDepartment(deleteVal, deleteName);
        }
      } else {
        if (confirm("Are you sure you want to delete this department?")) {
          deleteDepartment(deleteVal);
        }
      }
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};

const deleteDepartment = (id) => {
  $.ajax({
    url: "./assets/php/deleteDepartmentByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: parseInt(id),
    },
    success: function (result) {
      console.log(result);
      $(".form-overlay").fadeOut("slow");
      getLastCall();
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};

//!Binds buttons
const bindDelete = (str) => {
  $(".delete-btn").bind("click", (e) => {
    btnNum = $(e.currentTarget).attr("id");
    dynamicNum = btnNum.replace(/[^\d]/g, "");
    if (confirm(str)) {
      deleteEmployee(dynamicNum);
    }
  });
};

const bindDepartmentDelete = (str) => {
  $(".delete-btn").bind("click", (e) => {
    btnNum = $(e.currentTarget).attr("id");
    dynamicNum = btnNum.replace(/[^\d]/g, "");
    departmentName = $(`#department-name-${dynamicNum}`).val();
    deleteDepartmentCheck(dynamicNum, departmentName);
  });
};

const bindEdit = () => {
  $(".edit-btn").bind("click", (e) => {
    $(e.currentTarget).siblings().removeAttr("disabled");
    $(e.currentTarget).hide();
    $(e.currentTarget).siblings(".save-btn").show();
    btnNum = $(e.currentTarget).attr("id");
    dynamicNum = btnNum.replace(/[^\d]/g, "");
    $(e.currentTarget).siblings(".delete-btn").hide();
    $(e.currentTarget).siblings(".cancel-btn").show();
    $(".edit-btn").attr("disabled", "disabled");
    $(".delete-btn").attr("disabled", "disabled");
    $(`#edit-form-${dynamicNum}`).on("submit", (e) => {
      e.preventDefault();
    });
    previousDepartmentName = $(`#department-name-${dynamicNum}`).val();
    previousDepartmentLocation = $(`#depratment-location-${dynamicNum}`).val();
    previousUserLoc = $(`#user-location-${dynamicNum}`).val();
    previousUserEmail = $(`#user-email-${dynamicNum}`).val();
    previousUserDepartment = $(`#user-department-${dynamicNum}`).val();
    previousUserFirst = $(`#user-first-name-${dynamicNum}`).val();
    previousUserLast = $(`#user-last-name-${dynamicNum}`).val();
    previousUserJob = $(`#user-job-${dynamicNum}`).val();
    previousLocName = $(`#location-name-${dynamicNum}`).val();
  });
};

const bindSave = (id) => {
  $(".form-warning").css("visibility", "hidden");
  if (
    emailRegex.test($(`#user-email-${id}`).val()) &&
    nameRegex.test($(`#user-first-name-${id}`).val()) &&
    nameRegex.test($(`#user-last-name-${id}`).val()) &&
    nameRegex.test($(`#user-job-${id}`).val()) &&
    $(`#user-department-${id}`).val() != ""
  ) {
    if (confirm("Are you sure you want to edit this user?")) {
      editEmployee(id);
    } else {
      handleCancel($(`#save-btn-${id}`), id);
    }
  } else {
    if (
      !nameRegex.test($(`#user-first-name-${id}`).val()) ||
      !nameRegex.test($(`#user-last-name-${id}`).val())
    ) {
      $(`#name-warning-${id}`).css("visibility", "visible");
    }
    if (!nameRegex.test($(`#user-job-${id}`).val())) {
      $(`#job-warning-${id}`).css("visibility", "visible");
    }
    if (!emailRegex.test($(`#user-email-${id}`).val())) {
      $(`#email-warning-${id}`).css("visibility", "visible");
    }
  }
};

const editEmployee = (num) => {
  $.ajax({
    url: "assets/php/editEmployee.php",
    type: "POST",
    dataType: "json",
    data: {
      id: parseInt(num),
      first: JSON.stringify($(`#user-first-name-${num}`).val().trim()),
      last: JSON.stringify($(`#user-last-name-${num}`).val().trim()),
      email: JSON.stringify($(`#user-email-${num}`).val().trim()),
      job: JSON.stringify($(`#user-job-${num}`).val().trim()),
      depID: parseInt($(`#user-department-${num}`).val()),
    },
    success: function (result) {
      if (result.status.name == "ok") {
        alert("User updated!");
        getLastCall();
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(`Database error: ${textStatus}`);
      console.log(jqXHR);
    },
  });
};

const bindLocationSave = (id) => {
  if (confirm("Are you sure you want to edit this location?")) {
    editLocation(id);
  } else {
    handleCancel($(`save-btn-${id}`), id);
  }
};
const bindDepartmentSave = (id) => {
  if (!nameRegex.test($(`#department-name-${id}`).val())) {
    $(`#department-name-warning-${id}`).css("visibility", "visible");
  } else {
    if (confirm("Are you sure you want to update this department?")) {
      $.ajax({
        url: "assets/php/editDepartment.php",
        type: "POST",
        dataType: "json",
        data: {
          id: parseInt(id),
          name: JSON.stringify($(`#department-name-${id}`).val()),
          locationID: parseInt($(`#department-location-${id}`).val()),
        },
        success: function (result) {
          if (result.status.name == "ok") {
            console.log(result);
            alert("Department updated!");
            getLastCall();
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          alert(`Database error: ${textStatus}`);
          console.log(jqXHR);
        },
      });
    } else {
      handleCancel($(`#save-btn-${id}`), id);
    }
  }
};
const bindCancel = () => {
  $(".cancel-btn").bind("click", (e) => {
    btnNum = $(e.currentTarget).attr("id");
    dynamicNum = btnNum.replace(/[^\d]/g, "");
    handleCancel(e.currentTarget, dynamicNum);
  });
};





const bindLocationDelete = (str) => {
  $(".delete-btn").bind("click", (e) => {
    btnNum = $(e.currentTarget).attr("id");
    dynamicNum = btnNum.replace(/[^\d]/g, "");
    let name = $(`#location-name-${dynamicNum}`).val();
    deleteLocationCheck(dynamicNum, name);
  });
};

const deleteLocationCheck = (id, name) => {
  let locID;
  
  
  if (!id && !name) {
    
    let locValues = $("#delete-location-val");
    locID = locValues.val();
  } else {
    locID = id;
    locName = name;
  }
  $.ajax({
    url: "./assets/php/getEmployeesBySpecificLocation.php",
    type: "POST",
    dataType: "json",
    data: {
     location: JSON.stringify(locName),
    },
    success: function (result) {
      console.log(result)
      console.log(locName)
     if (!result.data[0]){
     deleteLocation(locID);
     } else {
      if (confirm("You can't delete a location with departments. Move these departments to a different location now?")){
        $('.form-overlay').fadeOut();
       getDepartmentCards();
      } else {
        console.log("You cancelled")
      }
     }
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};

//!Resets editting
const handleCancel = (target, dynamicNum) => {
  if (confirm("Are you sure you want to cancel?")) {
    $(".save-btn").hide();
    $(`.edit-btn`).show();
    $(`.delete-btn`).show();
    $(`.cancel-btn`).hide();
    $(".edit-btn").removeAttr("disabled");
    $(".delete-btn").removeAttr("disabled");
    $(".form-warning").css("visibility", "hidden");
    $(target).siblings(".user-card-fieldset").attr("disabled", "disabled");
    $(`#department-name-${dynamicNum}`).val(previousDepartmentName);
    $(`#depratment-location-${dynamicNum}`).val(previousDepartmentLocation);
    $(`#user-email-${dynamicNum}`).val(previousUserEmail);
    $(`#user-location-${dynamicNum}`).val(previousUserLoc);
    $(`#user-department-${dynamicNum}`).val(previousUserDepartment);
    $(`#user-first-name-${dynamicNum}`).val(previousUserFirst);
    $(`#user-last-name-${dynamicNum}`).val(previousUserLast);
    $(`#user-job-${dynamicNum}`).val(previousUserLast);
    $(`#location-name-${dynamicNum}`).val(previousLocName);
  }
};
//!Handles dropdown change
$("#delete-location-val").on('change', () => {
  locName = $("#delete-location-val option:selected").text();
})
$("#delete-department-val").on('change', () => {
  depName = $("#delete-department-val option:selected").text();
})

//!Shows create user form
$("#create-user").on("click", () => {
  $(".form-overlay").fadeIn();
  $(".form-overlay").css("display", "flex");
  $(".form-container").hide();
  $("#create-user-form").show();
});
$("#create-department").on("click", () => {
  $(".form-overlay").fadeIn();
  $(".form-overlay").css("display", "flex");
  $(".form-container").hide();
  $("#create-department-form").show();
});
$("#create-location").on("click", () => {
  $(".form-overlay").fadeIn();
  $(".form-overlay").css("display", "flex");
  $(".form-container").hide();
  $("#create-location-form").show();
});
$("#department-delete").on("click", () => {
  $(".form-overlay").fadeIn();
  $(".form-overlay").css("display", "flex");
  $(".form-container").hide();
  $("#delete-department-form").show();
});

$("#delete-location").on("click", () => {
  $(".form-overlay").fadeIn();
  $(".form-overlay").css("display", "flex");
  $(".form-container").hide();
  $("#delete-location-form").show();
});
$("#department-by-size").on("click", () => {
  getDepartmentCardsBySize();
});
$("#sort-department-names").on("click", () => {
  getDepartmentCards();
});
$("#sort-location-name").on("click", () => {
  getLocationCards();
});
$("#sort-location-size").on("click", () => {
  getLocationCardsBySize();
});
$("#show-all-users").on("click", () => {
  clearEmployeeBox();
  getAll();
});
$("#sort-user-department").on("click", () => {
  clearEmployeeBox();
  getEmployeesByDepartment();
});
$("#sort-user-location").on("click", () => {
  clearEmployeeBox();
  getEmployeesByLocation();
});


//!Closes create user form
$(".deleteMeetingClose").on("click", () => {
  $(".form-overlay").fadeOut();
});

//!Initialise box with all employees
getAll();

fillDepartmentsList();
getAllLocations();

$(".create-form").on("submit", (e) => {
  e.preventDefault();
});
