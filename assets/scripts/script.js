let previousUserDepartment;
let previousUserEmail;
let previousUserFirst;
let previousUserJob;
let previousUserLast;
let previousUserLoc;
let previousDepartmentName;
let previousDepartmentLocation;
let previousLocName;
let departmentSaveID;
let locationSaveID;
let locName;
let locID;
let depName;
let deleteVal;
let deleteName;
let userDelete;
let getAllFunc = false;
let getByDepartmentFunc = false;
let getByLocationFunc = false;
let locationsName = false;
let locationsSize = false;
let departmentsName = false;
let departmentsSize = false;
let editPage = false;
let specificDepartment = false;
let specificLocation = false;
let lengthOfData = 0;
let lengthOfDepartments = 0;
let lengthOfLocations = 0;
let department;
let depNameFunc;
let locNameFunc;
$boxHeader = $("#box-header");
$subHeader = $("#box-sub-header");
$headerIcon = $('#header-icon');

//!Renders HTML
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
    <div id="department-header"class="form-row-names card-title bg-night-sky">
    <label for="department-name"><i class="fas fa-building" style="color: white;"></i></label>
    <br>
    <input class="department-placeholder" id="department-name-${id}" name="department-name"type="text" value="${department}" required>

    </div>
 
    <div class="form-row">
    <label for="employees" ><i class="fas fa-users" data-toggle="tooltip" title="Total employees"></i></label>
    <input id="department-employees-${id}"  name="employees"type="number" value="${employees}" disabled="disabled">
    </div>
    
    <div class="form-row">
    <label for="location"><i class="fas fa-thumbtack" data-toggle="tooltip" title="Location"></i></label>
    <select id="department-location-${id}" name="location" class="department-location" value="${locationID}">
    <option value=${locationID}>${location}</option>
    </select>
    </div>
    </fieldset>
    <button id="save-btn-${id}"type="submit" style="display: none;"class="save-btn btn btn-default btn-primary"><i class="fas fa-check" style="color: white;font-size:1rem;"></i></button>
    <button id="edit-btn-${id}"type="button"  class="edit-btn btn btn-default btn-primary"><i class="fas fa-edit" style="color: white;font-size:1rem;"></i></button>
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

//!Gets last call
const getLastCall = (id, name) => {
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
    getLocationCardsBySize();
  } else if (departmentsName) {
    getDepartmentCards();
  } else if (departmentsSize) {
    getDepartmentCardsBySize();
  } else if (editPage) {
    getDepartmentByLocation(department);
  } else if (specificDepartment) {
    getEmployeeBySpecificDepartment(department, depNameFunc);
  } else if (specificLocation) {
    getEmployeeBySpecificLocation(locNameFunc);
  }
};

//!Clears div
const clearEmployeeBox = () => {
  $("#employeeDiv").empty();
  $('#managementDiv').empty();
};
//!Fills location lists
const getAllLocations = () => {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
  $.ajax({
    url: "./assets/php/getAllLocations.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      $("#delete-location-val").empty();
      $("#locations-list").empty();
      $("#create-department-location").empty();

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


      if ($(window).width() < 1250){
        $('.location-filter').on('click', () => {
          $('.app-container').removeClass('sidebar-mobile-open');
          $('.hamburger').removeClass('is-active');
        })
        }

      locName = $("#delete-location-val option:selected").text();
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};
//!Fills department lists
const fillDepartmentsList = () => {
  $.ajax({
    url: "./assets/php/getAllDepartments.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      $(".department-location").empty();

      $("#departments-list").empty();
      $(".departments-list").empty();

      result.data.forEach((element) => {
        $(".department-select").append(
          `<option value=${element.id}>${element.name}</option>`
        );
      });

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


      if ($(window).width() < 1250){
        $('.department-filter').on('click', () => {
          $('.app-container').removeClass('sidebar-mobile-open');
          $('.hamburger').removeClass('is-active');
        })
        }

      depName = $("#delete-department-val option:selected").text();
    },

    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};
//!Employee calls & filters
const getAll = () => {
  specificLocation = false;
  editPage = false;
  getAllFunc = true;
  getByDepartmentFunc = false;
  getByLocationFunc = false;
  locationsName = false;
  locationsSize = false;
  departmentsName = false;
  departmentsSize = false;
  specificDepartment = false;
  $.ajax({
    url: "./assets/php/getAll.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      $(".search-input").attr("id", "employee-search");
      clearEmployeeBox();
      let i = 0;
      $boxHeader.html("Employees");
      $subHeader.html(
        `You are currently viewing all ${result.data.length} employees sorted alphabetically by last name.`
      );
      $headerIcon.html(`
      <i class="fas fa-users"></i>
      `)

      result.data.forEach((element) => {
        if (element.id >= lengthOfData) {
          lengthOfData = parseInt(element.id);
        }
        $("#employeeDiv").append(
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
      fillDepartmentsList();
      getAllLocations();
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};

const getEmployeeBySpecificDepartment = (departmentId, departmentName) => {
  specificDepartment = true;
  specificLocation = false;
  getAllFunc = false;
  editPage = false;
  getByDepartmentFunc = false;
  getByLocationFunc = false;
  locationsName = false;
  locationsSize = false;
  departmentsName = false;
  departmentsSize = false;
  department = departmentId;
  depNameFunc = departmentName;
  $.ajax({
    url: "./assets/php/getEmployeesBySpecificDepartment.php",
    type: "POST",
    dataType: "json",
    data: {
      department: parseInt(departmentId),
    },
    success: function (result) {
      $(".search-input").attr("id", "employee-search");
      $boxHeader.html("Employees");
      $headerIcon.html(`
      <i class="fas fa-users"></i>
      `)
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


      result.data.forEach((element) => {
        if (
          element.jobTitle.toLowerCase().includes("lead") ||
          element.jobTitle.toLowerCase().includes("ceo") ||
          element.jobTitle.toLowerCase().includes("head") ||
          element.jobTitle.toLowerCase().includes("manager")
        ) {
          $("#managementDiv").append(
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
        } else { 
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
      fillDepartmentsList();
      getAllLocations();
      bindEdit();
      bindCancel();
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};
const getEmployeeBySpecificLocation = (name) => {
  specificDepartment = false;
  specificLocation = true;
  getAllFunc = false;
  editPage = false;
  getByDepartmentFunc = false;
  getByLocationFunc = false;
  locationsName = false;
  locationsSize = false;
  departmentsName = false;
  departmentsSize = false;
  locNameFunc = name;
  $.ajax({
    url: "./assets/php/getEmployeesBySpecificLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      location: JSON.stringify(name),
    },
    success: function (result) {
      $(".search-input").attr("id", "employee-search");
      $boxHeader.html("Employees");
      $subHeader.html(
        `You are currently viewing ${result.data.length} employees that work in ${name}.`
      );
      $headerIcon.html(`
      <i class="fas fa-users"></i>
      `)
      clearEmployeeBox();
      result.data.forEach((element) => {
        $("#employeeDiv").append(
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
      fillDepartmentsList();
      bindDelete("Are you sure you want to delete this user?");
      bindEdit();
      getAllLocations();
      //  bindSave("Are you sure you want to update this user?");
      bindCancel();
    },
    error: function (textStatus) {
      //console.log(textStatus);
    },
  });
};
const getEmployeesByDepartment = () => {
  getAllFunc = false;
  editPage = false;
  specificLocation = false;
  getByDepartmentFunc = true;
  getByLocationFunc = false;
  locationsName = false;
  locationsSize = false;
  departmentsName = false;
  departmentsSize = false;
  specificDepartment = false;
  $.ajax({
    url: "assets/php/getEmployeesByDepartment.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      if (result.status.code == 200) {
        $(".search-input").attr("id", "employee-search");
        $boxHeader.html("Employees");
        $subHeader.html(
          `You are currently viewing all ${result.data.length} employees sorted alphabetically by department.`
        );
        $headerIcon.html(`
        <i class="fas fa-users"></i>
        `)
        let i = 0;
        result.data.forEach((element) => {
          i += 1;
          $("#employeeDiv").append(
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
        fillDepartmentsList();
        getAllFunc = false;
        getByDepartmentFunc = true;
        getByLocationFunc = false;
        bindDelete("Are you sure you want to delete this user?");
        bindEdit();
        getAllLocations();
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
  editPage = false;
  specificLocation = false;
  specificDepartment = false;
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
      $(".search-input").attr("id", "employee-search");
      if (result.status.code == 200) {
        $boxHeader.html("Employees");
        $subHeader.html(
          `You are currently viewing all ${result.data.length} employees sorted alphabetically by location.`
        );
        $headerIcon.html(`
        <i class="fas fa-users"></i>
        `)
        let i = 0;
        result.data.forEach((element) => {
          i += 1;
          $("#employeeDiv").append(
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
        fillDepartmentsList();
        bindDelete("Are you sure you want to delete this user?");
        bindEdit();
        getAllLocations();
        //  bindSave("Are you sure you want to update this user?");
        bindCancel();
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(`Database error: ${textStatus}`);
    },
  });
};

//!Gets location cards
const getLocationCards = () => {
  getAllFunc = false;
  editPage = false;
  specificLocation = false;
  getByDepartmentFunc = false;
  getByLocationFunc = false;
  locationsName = true;
  locationsSize = false;
  departmentsName = false;
  departmentsSize = false;
  specificDepartment = false;
  $.ajax({
    url: "./assets/php/getLocationCards.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      $(".search-input").attr("id", "location-search");
      clearEmployeeBox();
      result.data.forEach((element) => {
        if (parseInt(element.id) > lengthOfLocations) {
          lengthOfLocations = parseInt(element.id);
        }
        $("#employeeDiv").append(
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
      $headerIcon.html(`
      <i class="fas fa-thumbtack"></i>
      `)
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
  editPage = false;
  specificLocation = false;
  specificDepartment = false;
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
      $(".search-input").attr("id", "location-search");
      clearEmployeeBox();
      result.data.forEach((element) => {
        if (parseInt(element.id) > lengthOfLocations) {
          lengthOfLocations = parseInt(element.id);
        }
        $("#employeeDiv").append(
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
      $headerIcon.html(`
      <i class="fas fa-thumbtack"></i>
      `)
      bindEdit();
      bindCancel();
      bindLocationDelete();
      //bindLocationSave();
      getAllLocations();
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};

//!Gets department cards
const getDepartmentCards = () => {
  getAllFunc = false;
  editPage = false;
  specificLocation = false;
  specificDepartment = false;
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
      $(".search-input").attr("id", "department-search");

      clearEmployeeBox();

      result.data.forEach((element) => {
        if (parseInt(element.id) > lengthOfDepartments) {
          lengthOfDepartments = parseInt(element.id);
        }
        $("#employeeDiv").append(
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
      $headerIcon.html(`
      <i class="fas fa-building"></i>
      `)
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
const getDepartmentCardsBySize = () => {
  specificLocation = false;
  getAllFunc = false;
  editPage = false;
  specificDepartment = false;
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
      $(".search-input").attr("id", "department-search");
      $boxHeader.html("Departments");
      $subHeader.html(
        `You are currently viewing all ${result.data.length} departments sorted by department size.`
      );
      $headerIcon.html(`
      <i class="fas fa-building"></i>
      `)
      clearEmployeeBox();
      result.data.forEach((element) => {
        if (parseInt(element.id) > lengthOfDepartments) {
          lengthOfDepartments = parseInt(element.id);
        }
        $("#employeeDiv").append(
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
      //bindDepartmentSave("Are you sure you want to edit this location?");
      getAllLocations();
      bindDepartmentDelete();
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};
const getDepartmentByLocation = (id) => {
  specificLocation = false;
  getAllFunc = false;
  editPage = true;
  getByDepartmentFunc = false;
  getByLocationFunc = false;
  locationsName = false;
  locationsSize = false;
  departmentsName = false;
  departmentsSize = false;
  specificDepartment = false;
  department = id;
  $.ajax({
    url: "./assets/php/getDepartmentByLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      id: id,
    },
    success: function (result) {
      $(".search-input").attr("id", "department-search");

      clearEmployeeBox();
      result.data.forEach((element) => {
        if (parseInt(element.id) > lengthOfDepartments) {
          lengthOfDepartments = parseInt(element.id);
        }
        $("#employeeDiv").append(
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

//!Handles deletion
const deleteEmployee = (num) => {
  $.ajax({
    url: "./assets/php/deleteUserByID.php",
    type: "POST",
    dataType: "json",
    data: {
      id: parseInt(num),
    },
    success: function (result) {
      setLoading('Deleting employee...', 'Employee deleted.')
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
      $(".form-overlay").fadeOut("slow");
      setLoading('Deleting department...', 'Department deleted')
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
      if (!editPage) {
        setLoading('Deleting location...', 'Location deleted.');
      }
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};


$('#confirm-form').on('submit', (e) => {
  e.preventDefault();
  $('#confirm-overlay').fadeOut();
  $('body').css('overflow','auto')
  $('.form-overlay').fadeOut();
})

const setLoading = (str1, str2) => {
  $('#loading-overlay').css('display', 'flex')
  $('#loader').show()
  $('#loading-text').html(str1)
  setTimeout(() => {
    $('#loading-text').html(str2)
  }, 2000);
  setTimeout(() => {
    $('#confirm-ajax').html('');
    $('#loading-overlay').hide();
    getLastCall();
  }, 3000);
}

$('.cancel-confirm').on('click', () => {
  $('#confirm-overlay').fadeOut();
  $('body').css('overflow','auto')
  $('.form-overlay').fadeOut();
})

const confirmForm = (msg, sbmt) => {
        $('#confirm-overlay').css('display', 'flex');
        $('body').css('overflow','hidden')
        $('#confirmation-msg').html(msg);
        $('#confirm-form').attr('onsubmit', sbmt);
}


//!Handles deletion checks
const deleteDepartmentCheck = (num, name) => {


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

        confirmForm("You can't delete a department with employees.<br/>Manage these employees now?", "getEmployeeBySpecificDepartment(deleteVal, deleteName)")


       
      } else {

        confirmForm("Are you sure you want to delete this department?", "deleteDepartment(deleteVal)")
        }
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};
const deleteLocationCheck = (id, name) => {


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
      if (!result.data[0]) {
        confirmForm("Are you sure you want to delete this location?", "deleteLocation(locID)")
      } else {
        confirmForm("You can't delete a location with employees. Move these departments now?", "getDepartmentByLocation(locID)")
      }
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};

//!Handles creation
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
      setLoading('Creating user...', 'User created.')
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
      $(".form-overlay").fadeOut();
      setLoading('Creating department...', 'Department created.')
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
      setLoading("Creating location...", "Location created")
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
};

//!Handles editting
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
        setLoading('Updating user...', 'User updated.')
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(`Database error: ${textStatus}`);
      console.log(jqXHR);
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
        setLoading('Updating location...', 'Location updated!')
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(`Database error: ${textStatus}`);
      console.log(jqXHR);
    },
  });
};
const editDepartment = (id) => {
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
        setLoading('Updating department...', 'Department updated.')
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert(`Database error: ${textStatus}`);
      console.log(jqXHR);
    },
  });
}
const bindSave = (id) => {
editEmployee(id);
};
const bindLocationSave = (id) => {
editLocation(id)
};
const bindDepartmentSave = (id) => {
  editDepartment(id);
};
//!Handles search
$(".search-input").on("keyup", () => {
  if ($(".search-input").val() != "") {
    $subHeader.css("visibility", "hidden");
  } else {
    $subHeader.css("visibility", "visible");
  }
  if ($(".search-input").attr("id") === "employee-search") {
    for (let i = 0; i <= lengthOfData; i++) {
      if (!$(`#user-first-name-${i}`).val()) {
        continue;
      } else {
        if (
          !$(`#user-first-name-${i}`)
            .val()
            .toLowerCase()
            .includes($(".search-input").val().toLowerCase()) &&
          !$(`#user-last-name-${i}`)
            .val()
            .toLowerCase()
            .includes($(".search-input").val().toLowerCase()) &&
          !$(`#user-job-${i}`)
            .val()
            .toLowerCase()
            .includes($(".search-input").val().toLowerCase()) &&
          !$(`#user-department-${i} option:selected`)
            .text()
            .toLowerCase()
            .includes($(".search-input").val().toLowerCase()) &&
          !$(`#user-location-${i} option:selected`)
            .text()
            .toLowerCase()
            .includes($(".search-input").val().toLowerCase())
        ) {
          $(`#user-card${i}`).hide();
        } else {
          $(`#user-card${i}`).show();
        }
      }
    }
  } else if ($(".search-input").attr("id") === "department-search") {
    for (let i = 0; i <= lengthOfDepartments; i++) {
      if (!$(`#department-name-${i}`).val()) {
        continue;
      } else {
        if (
          !$(`#department-name-${i}`)
            .val()
            .toLowerCase()
            .includes($(".search-input").val().toLowerCase()) &&
            !$(`#department-location-${i} option:selected`)
              .text()
              .toLowerCase()
              .includes($(".search-input").val().toLowerCase())
        ) {
          $(`#department-card-${i}`).hide();
        } else {
          $(`#department-card-${i}`).show();
        }
      }
    }
  } else if ($(".search-input").attr("id") === "location-search") {
    for (let i = 0; i <= lengthOfLocations; i++) {
      if (!$(`#location-name-${i}`).val()) {
        continue;
      } else {
        if (
          !$(`#location-name-${i}`)
            .val()
            .toLowerCase()
            .includes($(".search-input").val().toLowerCase())
        ) {
          $(`#location-card-${i}`).hide();
        } else {
          $(`#location-card-${i}`).show();
        }
      }
    }
  }
});

//!Binds buttons
const bindDelete = (str) => {
  $(".delete-btn").bind("click", (e) => {
    btnNum = $(e.currentTarget).attr("id");
    dynamicNum = btnNum.replace(/[^\d]/g, "");
    userDelete = dynamicNum;
   confirmForm('Are you sure you want to delete this user?', 'deleteEmployee(userDelete)')
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

//!Resets editting
const handleCancel = (target, dynamicNum) => {
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
};
//!Handles dropdown change
$("#delete-location-val").on("change", () => {
  locName = $("#delete-location-val option:selected").text();
});
$("#delete-department-val").on("change", () => {
  depName = $("#delete-department-val option:selected").text();
});

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

//!Initialise box with all employees and fills location/department options

//! Prevents default on submit
$(".create-form").on("submit", (e) => {
  e.preventDefault();
});

$(".login-form").on("submit", (e) => {
  e.preventDefault();
});


$(document).on('keyup', (e) => {
  if (e.keyCode == 27) {
   $('.form-overlay').fadeOut();
  }
})

$('.close').on('click', () => {
  $('.search-input').val("");
  $('.card').show();
})

const handleLogin = () => {
  $('.err-warning').hide();
  $('#login-form').removeClass('animate__animated animate__shakeX')
  $.ajax({
    url: "./assets/php/login.php",
    type: "POST",
    dataType: "json",
    data: {
      username: JSON.stringify($('#username').val()),
      password: JSON.stringify($('#user-password').val())
    },
    success: function (result) {
      if (result.data[0]){
        $('#login').fadeOut();
        getAll();
        $('#username').val('');
        $('#user-password').val('');
      } else {
        $('#login-form').addClass('animate__animated animate__shakeX')
        $('.err-warning').show();
      }
    },
    error: function (textStatus) {
      console.log(textStatus);
    },
  });
}

$('.signout-icon').on('click', () => {
  $('#employeeDiv').empty();
  $('#managementDiv').empty();
  $('#login').show();
})

$('.hamburger').on('click tap', () => {
  $('.hamburger').toggleClass('is-active');
})

$(window).on('resize', () => {
if ($(window).width() < 1250){
$('.close-sidebar').on('click', () => {
  $('.app-container').removeClass('sidebar-mobile-open');
  $('.hamburger').removeClass('is-active');
})
}
})
