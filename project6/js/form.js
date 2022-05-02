document.addEventListener("DOMContentLoaded", function(){
  console.log('White Lies is a great band');
  document.getElementById('form-submit').addEventListener('click', formSubmit);
  loadTable();
  toggleVisible();
});

function formSubmit() {
  console.log('Form submitted');
  let name = document.getElementById('form-name');
  let location = document.getElementById('form-location');
  let email = document.getElementById('form-email');
  let student = document.getElementById('form-student');
  let professor = document.getElementById('form-professor');
  let investor = document.getElementById('form-investor');

  // Input verification
  if (name.value == false || location.value == false || email.value == false) {
    console.log('Invalid text')
    return// Exit here and do not save
  }

  // Add to the table and load the updated version
  let id = visitors.length + 1;
  visitors.push(new Visitor(id, name.value, location.value, email.value, {student:student.checked, professor:professor.checked, investor:investor.checked}));
  loadTable();

  // Reset the form values
  name.value = '';
  location.value = '';
  email.value = '';
  student.checked = false;
  professor.checked = false;
  investor.checked = false;
  toggleVisible();
}

class Visitor {
  constructor(id, name, location, email, roleObj){
     this.id = id;
     this.name = name;
     this.location = location;
     this.email = email;
     this.roleObj = roleObj;
  }
  get strRole() { //returns roles in a string form
    let roles = ''
    for (var x in this.roleObj) {
      if (this.roleObj[x] == true) {
        roles += x + ', ';
      }
    }
    // Return after removing the last comma and space
    return roles.substring(0, roles.length - 2);
  }
}

let visitors = [
  new Visitor(1,"Mikael Blomkvist","Sweden","kalle@expo.se", {student:false,professor:true,investor:false}),
  new Visitor(2, "David Wagstaff","St George","david@gmail.com", {student:false,professor:true,investor:true}),
  new Visitor(3, "Tunde","Nigeria","tunde@leopoldogout.net", {student:false,professor:false,investor:true}),
  new Visitor(4, "Timothy","Arizona","neverwrong@spacex.com", {student:true,professor:false,investor:false}),
  new Visitor(5, "Mark Watney","Mars","mark.watney@nasa.gov", {student:false,professor:true,investor:false}),
  new Visitor(6, "Philip J Fry","New New York","fry@planet.express", {student:false,professor:false,investor:false}),
  new Visitor(7, "Max Caulfield","Oregon","max@pricefield.com", {student:false,professor:true,investor:false}),
];

function tableDelete(id, ask=false) {
  if (!ask || confirm('Are you sure you want to delete this entry?')) {
    visitors.splice(id-1, 1);
  loadTable();
  }
}

function tableEdit(id) {
  // Move thr record data to the form to edit
  arrPlace = id - 1;
  let name = document.getElementById('form-name');
  let location = document.getElementById('form-location');
  let email = document.getElementById('form-email');
  let student = document.getElementById('form-student');
  let professor = document.getElementById('form-professor');
  let investor = document.getElementById('form-investor');
  name.value = visitors[arrPlace].name;
  location.value = visitors[arrPlace].location;
  email.value = visitors[arrPlace].email;
  let roles = visitors[arrPlace].roleObj;
  student.checked = roles.student;
  professor.checked = roles.professor;
  investor.checked = roles.investor;

  // Delete and reload the table
  tableDelete(id);
  loadTable();
  toggleVisible();
}

function loadTable() {
  console.log('Loading the table');

  // Clear the table
  let table = document.getElementById('record-table');
  while(table.childElementCount) {
    table.removeChild(table.firstChild);
  }
  // Add the table header
  let row = table.insertRow(-1);
  var nameCell = row.insertCell(0);
  var locationCell = row.insertCell(1);
  var emailCell = row.insertCell(2);
  var roleCell = row.insertCell(3);
  var manageCell = row.insertCell(4);
  nameCell.innerHTML = '<b>Name</b>';
  locationCell.innerHTML = '<b>Location</b>';
  emailCell.innerHTML = '<b>Email</b>';
  roleCell.innerHTML = '<b>Role</b>';
  manageCell.innerHTML = '<b>Manage</b>';

  // Loop through the visitor array and add the content to the table
  for (let x=0; x < visitors.length; x++) {
    // Add the row (tr)
    let row = table.insertRow(-1);
    // Add the cells (th)
    var nameCell = row.insertCell(0);
    var locationCell = row.insertCell(1);
    var emailCell = row.insertCell(2);
    var roleCell = row.insertCell(3);
    var manageCell = row.insertCell(4);
    // Add the content to the cell
    nameCell.innerHTML = visitors[x].name;
    locationCell.innerHTML = visitors[x].location;
    emailCell.innerHTML = visitors[x].email;
    roleCell.innerHTML = visitors[x].strRole;
    id = x+1;
    manageCell.innerHTML = '<button id="edit-btn" onclick="tableEdit('+id+')">Edit</button> <button id="del-btn" onclick="tableDelete('+id+', ask=true)">Delete</button>';
  }
}

function toggleVisible() {
  let table = document.getElementById('tableBox');
  let input = document.getElementById('inputBox');

  if (table.style.display == 'block') {
    input.style.display = 'block';
    table.style.display = 'none';
  } else {
    table.style.display = 'block';
    input.style.display = 'none';
  }
}