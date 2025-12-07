// ==============----------------------------
var contactsContainer = document.getElementById("contactsContainer");
var totalCounter = document.querySelector(".icons-section-1 ~ div p"); //   contactsعدد
var favCounter = document.querySelector(".icons-section-2 ~ div p"); // Favorite (~)->الاخ
var emergCounter = document.querySelector(".icons-section-3 ~ div p"); // Emergency

var contactsList = JSON.parse(localStorage.getItem("contacts")) || [];
var globalIndex = null; //  لتحديث الكنتاكت

// ==================== display Contacts ====================
function displayContacts() {
  // تحديث الـ counters
  totalCounter.textContent = contactsList.length;

  // حساب الـ favorites
  var favCount = 0;
  var emergCount = 0;
  for (var i = 0; i < contactsList.length; i++) {
    if (contactsList[i].favorite) favCount++;
    if (contactsList[i].emergency) emergCount++;
  }
  favCounter.textContent = favCount;
  emergCounter.textContent = emergCount;

  // كل ال  اللي اتعملت contacts
  var allHTML = "";
  if (contactsList.length === 0) {
    allHTML = `<p class="text-center mt-3">No contacts found</p>
    <p class="text-center mt-3 text-secondary">Click "Add Contact" to get started</p>
    `;
  } else {
    for (var i = 0; i < contactsList.length; i++) {
      var contact = contactsList[i];
      allHTML += `
      <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="contact-card shadow-custom p-3 rounded-4 bg-white">
          <div>
            <div class="d-flex">
              <div class="profile-box d-flex justify-content-center align-items-center text-white fw-bold position-relative">
                <img src="${
                  contact.photo || "img/no image.jpg"
                }" alt="" class="rounded-3" />
                ${
                  contact.favorite
                    ? '<span class="star-badge"><i class="fa-solid fa-star"></i></span>'
                    : ""
                }
                ${
                  contact.emergency
                    ? '<span class="heart-badge"><i class="fa-solid fa-heart-pulse"></i></span>'
                    : ""
                }
              </div>
              <div class="d-flex flex-column ms-4">
                <h5 class="fw-bold mb-2">${contact.fullName}</h5>
                <p class="text-muted mb-2">
                  <span class="bg-blue-icon me-2 p-1 rounded-3">
                    <i class="fa-solid fa-phone text-primary"></i>
                  </span>
                  ${contact.phone}
                </p>
              </div>
            </div>

            <div class="mt-3">
              ${
                contact.email
                  ? '<p class="text-muted mb-2"><span class="bg-purple-icon me-2 p-1 rounded-3"><i class="fa-solid fa-envelope text-purple"></i></span>' +
                    contact.email +
                    "</p>"
                  : ""
              }
              ${
                contact.address
                  ? '<p class="text-muted mb-2"><span class="bg-green-icon me-2 p-1 rounded-3"><i class="fa-solid fa-location-dot text-success"></i></span>' +
                    contact.address +
                    "</p>"
                  : ""
              }
              ${
                contact.group
                  ? '<span class="badge bg-purple-light text-purple fw-semibold">' +
                    contact.group +
                    "</span>"
                  : ""
              }
            </div>
          </div>

          <div class="d-flex justify-content-between mt-3 pt-2 border-top">
            <div class="d-flex gap-3">
             <a href="tel:${contact.phone}" title="Call" class="text-decoration-none"> <i class="d-flex justify-content-center align-items-center py-2 px-3 fa-solid fa-phone action-icon text-success"></i></a>
            <a href="mailto:${contact.email}" title="Send Email" class="text-decoration-none"><i class="d-flex justify-content-center align-items-center py-2 px-3 fa-solid fa-envelope action-icon text-purple"></i></a>

            </div>
            <div class="d-flex gap-3">
<i onclick="toggleFavorite(${i})" class="d-flex justify-content-center align-items-center py-2 px-3 ${
        contact.favorite ? "fa-solid" : "fa-regular"
      } fa-star action-icon text-warning"></i>

<i onclick="toggleEmergency(${i})" class="d-flex justify-content-center align-items-center py-2 px-3 ${
        contact.emergency ? "fa-solid fa-heart-pulse " : "fa-regular fa-heart"
      } fa-heart action-icon text-danger"></i>

              <i onclick="editContact(${i})" class="d-flex justify-content-center align-items-center py-2 px-3 fa-solid fa-pen action-icon text-secondary"></i>
              <i onclick="deleteContact(${i})" class="d-flex justify-content-center align-items-center py-2 px-3 fa-solid fa-trash action-icon text-dark"></i>
            </div>
          </div>
        </div>
      </div>
      `;
    }
  }
  contactsContainer.innerHTML = allHTML;

  // Favorites
  displayFavorites();
  // Emergency
  displayEmergency();
}

// ==================== display Favorites ====================
function displayFavorites() {
  var favContainer = document.querySelector(".Favorites-cards");
  if (!favContainer) return;

  var favContacts = [];
  for (var i = 0; i < contactsList.length; i++) {
    if (contactsList[i].favorite) {
      favContacts.push(contactsList[i]);
    }
  }

  var html = "";
  if (favContacts.length === 0) {
    html = '<p class="text-center mb-0">No favorites yet ^_^ </p>';
  } else {
    for (var i = 0; i < favContacts.length; i++) {
      var c = favContacts[i];
      html += `
    <div class="d-flex justify-content-between align-items-center bg-gray-Favorites p-2 rounded-3">
      <div class="d-flex">
        <div class="profile-box text-white">
          <img src="${
            c.photo || "img/no image.jpg"
          }" alt="avatar" class="rounded-4" />
        </div>
        <div class="d-flex flex-column ms-3">
          <h5 class="mb-1">${c.fullName}</h5>
          <p class="text-muted mb-2">${c.phone}</p>
        </div>
      </div>
<a href="tel:${c.phone}" title="Call" class="text-decoration-none">  <span class="p-2 rounded-3" id="phoneee"><i class="fa-solid fa-phone"></i></span></a>
    </div>
      `;
    }
  }

  favContainer.innerHTML = html;
}

// ==================== display Emergency ====================
function displayEmergency() {
  var emergContainer = document.querySelector(".Emergency-cards");
  if (!emergContainer) return;

  var emergContacts = [];
  for (var i = 0; i < contactsList.length; i++) {
    if (contactsList[i].emergency) {
      emergContacts.push(contactsList[i]);
    }
  }

  var html = "";
  if (emergContacts.length === 0) {
    html = '<p class="text-center mb-0">No emergency contacts ^_^ </p>';
  } else {
    for (var i = 0; i < emergContacts.length; i++) {
      var c = emergContacts[i];
      html += `
<div class="d-flex justify-content-between align-items-center bg-gray-Emergency p-2 rounded-3">
  <div class="d-flex">
    <div class="profile-box text-white">
      <img src="${c.photo || "img/no image.jpg"}" alt="" class="rounded-4" />
    </div>
    <div class="d-flex flex-column ms-3">
      <h5 class="mb-1">${c.fullName}</h5>
      <p class="text-muted mb-2">${c.phone}</p>
    </div>
  </div>
 <a href="tel:${c.phone}" title="Call" class="text-decoration-none">  <span class="p-2 rounded-3" id="phoneee"><i class="fa-solid fa-phone"></i></span></a>

</div>
      `;
    }
  }

  emergContainer.innerHTML = html;
}

// ==================== Add Contact =================================================
document.getElementById("addContactBtn").addEventListener("click", function () {
  openContactForm();
});

// ==================== Toggle Favorite ====================
function toggleFavorite(index) {
  contactsList[index].favorite = !contactsList[index].favorite;
  localStorage.setItem("contacts", JSON.stringify(contactsList));
  displayContacts();
}

// ==================== Toggle Emergency ====================
function toggleEmergency(index) {
  contactsList[index].emergency = !contactsList[index].emergency;
  localStorage.setItem("contacts", JSON.stringify(contactsList));
  displayContacts();
}

// ============================ delete ====================
function deleteContact(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(function (result) {
    if (result.isConfirmed) {
      contactsList.splice(index, 1);
      localStorage.setItem("contacts", JSON.stringify(contactsList));
      displayContacts();
      Swal.fire("Deleted!", "Contact has been deleted.", "success");
    }
  });
}

// ================================= edit====================
function editContact(index) {
  globalIndex = index;
  var contact = contactsList[index];
  openContactForm(contact);
}

// ==================== open Form ====================
function openContactForm(contact) {
  contact = contact || null;
  Swal.fire({
    title: contact ? "Edit Contact" : "Add New Contact",
    width: "600px",
    showCancelButton: false,
    showConfirmButton: false,
    html: `

   <div class="text-center mb-3">
      <div id="preview" 
           class="rounded-circle mx-auto mb-2"
           style="width: 80px; height: 80px; background:#f3f4f6; display:flex; justify-content:center; align-items:center; overflow:hidden;">
        <i class="fa-solid fa-user fs-1 text-secondary"></i>
      </div>
      <input type="file" id="imageInput" accept="image/*" hidden>
      <button id="changePhotoBtn" class="btn btn-light btn-sm">Change Photo</button>
      <div class="text-start">
        <label class="form-label">Full Name <span class="text-danger">*</span></label>
        <input id="fullName" type="text" class="form-control mb-3" placeholder="Enter full name" oninput="ValidateAll(this)">
        <div class="invalid-feedback" id="fullNameError"></div>


        <label class="form-label">Phone Number <span class="text-danger">*</span></label>
        <input id="phone" type="text" class="form-control mb-3" placeholder="e.g., 01012345678" oninput="ValidateAll(this)">
<div class="invalid-feedback" id="phoneError"></div>


        <label class="form-label">Email Address</label>
        <input id="email" type="email" class="form-control mb-3" placeholder="name@example.com" oninput="ValidateAll(this)">
<div class="invalid-feedback" id="emailError"></div>

        <label class="form-label">Address</label>
        <input id="address" type="text" class="form-control mb-3" placeholder="Enter address" oninput="ValidateAll(this)">
<div class="invalid-feedback" id="addressError"></div>

        <label class="form-label">Group</label>
        <select id="group" class="form-select mb-3" oninput="ValidateAll(this)">
          <option value="" selected disabled>Select a group</option>
          <option>Work</option>
          <option>Family</option>
          <option>Friends</option>
        </select>
<div class="invalid-feedback" id="groupError"></div>

        <label class="form-label">Notes</label>
        <textarea id="notes" class="form-control mb-3" placeholder="Add notes about this contact" oninput="ValidateAll(this)"></textarea>
        <div class="invalid-feedback" id="notesError"></div>

        <div class="d-flex align-items-center gap-3 mt-2">
          <label><input type="checkbox" id="favorite"> <i class="fa-solid fa-star text-warning"></i> Favorite</label>
          <label><input type="checkbox" id="emergency"> <i class="fa-solid fa-heart-pulse text-danger"></i> Emergency</label>
        </div>
        <div class="mt-4 d-flex justify-content-center">
          <button id="cancelBtn" class="btn btn-light px-4 border border-2 px-5 me-5">Cancel</button>
          <button id="saveBtn" class="btn btn-primary px-4 text-white ">${
            contact ? "Update Contact" : "Save Contact"
          }</button>
        </div>
      </div>
    </div>
    `,
    didOpen: function () {
      var selectedPhoto = contact?.photo || null;

      // Fill existing data if editing
      if (contact) {
        document.getElementById("fullName").value = contact.fullName;
        document.getElementById("phone").value = contact.phone;
        document.getElementById("email").value = contact.email;
        document.getElementById("address").value = contact.address;
        document.getElementById("group").value = contact.group;
        document.getElementById("notes").value = contact.notes;
        document.getElementById("favorite").checked = contact.favorite;
        document.getElementById("emergency").checked = contact.emergency;

        if (selectedPhoto) {
          var preview = document.getElementById("preview");
          preview.innerHTML = "";
          var img = document.createElement("img");
          img.src = selectedPhoto;
          img.style.width = "100%";
          img.style.height = "100%";
          img.style.objectFit = "cover";
          preview.appendChild(img);
        }
      }

      // Cancel
      document.getElementById("cancelBtn").onclick = function () {
        Swal.close();
      };

      // Change photo
      document.getElementById("changePhotoBtn").onclick = function () {
        document.getElementById("imageInput").click();
      };

      document
        .getElementById("imageInput")
        .addEventListener("change", function () {
          var file = this.files[0];
          if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
              selectedPhoto = e.target.result;
              var preview = document.getElementById("preview");
              preview.innerHTML = "";
              var img = document.createElement("img");
              img.src = selectedPhoto;
              img.style.width = "100%";
              img.style.height = "100%";
              img.style.objectFit = "cover";
              preview.appendChild(img);
            };
            reader.readAsDataURL(file);
          }
        });

      // Save or Update
      document.getElementById("saveBtn").onclick = function () {
        var data = {
          fullName: document.getElementById("fullName").value,
          phone: document.getElementById("phone").value,
          email: document.getElementById("email").value,
          address: document.getElementById("address").value,
          group: document.getElementById("group").value,
          notes: document.getElementById("notes").value,
          favorite: document.getElementById("favorite").checked,
          emergency: document.getElementById("emergency").checked,
          photo: selectedPhoto || "",
        };

        //التأكد الاول قبل الحفظ
        var isValid =
          ValidateAll(document.getElementById("fullName")) &&
          ValidateAll(document.getElementById("phone")) &&
          ValidateAll(document.getElementById("email")) &&
          ValidateAll(document.getElementById("address")) &&
          ValidateAll(document.getElementById("group")) &&
          ValidateAll(document.getElementById("notes"));

        if (!isValid) {
          Swal.fire({
            icon: "error",
            title: "Invalid data",
            text: "Please correct the highlighted fields before saving.",
          });
          return;
        }
        //========================

        if (contact) {
          contactsList[globalIndex] = data;
        } else {
          contactsList.push(data);
        }

        localStorage.setItem("contacts", JSON.stringify(contactsList));
        Swal.close();
        displayContacts();
        Swal.fire({
          icon: "success",
          title: contact ? "Contact Updated!" : "Contact Saved!",
          timer: 1500,
          showConfirmButton: false,
        });
      };
    },
  });
}

// ==================== Search ====================
function searchContacts(input) {
  var filter = input.value.toLowerCase();
  var box = "";

  for (var i = 0; i < contactsList.length; i++) {
    var contact = contactsList[i];
    // البحث في الاسم + الايميل + رقم التليفون
    if (
      (contact.fullName && contact.fullName.toLowerCase().includes(filter)) ||
      (contact.email && contact.email.toLowerCase().includes(filter)) ||
      (contact.phone && contact.phone.toLowerCase().includes(filter))
    ) {
      box += `
      <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="contact-card shadow-custom p-3 rounded-4 bg-white">
          <div>
            <div class="d-flex">
              <div class="profile-box d-flex justify-content-center align-items-center text-white fw-bold position-relative">
                <img src="${
                  contact.photo || "img/no image.jpg"
                }" alt="" class="rounded-3" />
                ${
                  contact.favorite
                    ? '<span class="star-badge"><i class="fa-solid fa-star"></i></span>'
                    : ""
                }
                ${
                  contact.emergency
                    ? '<span class="heart-badge"><i class="fa-solid fa-heart-pulse"></i></span>'
                    : ""
                }
              </div>
              <div class="d-flex flex-column ms-4">
                <h5 class="fw-bold mb-2">${contact.fullName}</h5>
                <p class="text-muted mb-2">
                  <span class="bg-blue-icon me-2 p-1 rounded-3">
                    <i class="fa-solid fa-phone text-primary"></i>
                  </span>
                  ${contact.phone}
                </p>
              </div>
            </div>

            <div class="mt-3">
              ${
                contact.email
                  ? '<p class="text-muted mb-2"><span class="bg-purple-icon me-2 p-1 rounded-3"><i class="fa-solid fa-envelope text-purple"></i></span>' +
                    contact.email +
                    "</p>"
                  : ""
              }
              ${
                contact.address
                  ? '<p class="text-muted mb-2"><span class="bg-green-icon me-2 p-1 rounded-3"><i class="fa-solid fa-location-dot text-success"></i></span>' +
                    contact.address +
                    "</p>"
                  : ""
              }
              ${
                contact.group
                  ? '<span class="badge bg-purple-light text-purple fw-semibold">' +
                    contact.group +
                    "</span>"
                  : ""
              }
            </div>
          </div>

          <div class="d-flex justify-content-between mt-3 pt-2 border-top">
            <div class="d-flex gap-3">
              <i class="d-flex justify-content-center align-items-center py-2 px-3 fa-solid fa-phone action-icon text-success"></i>
              <i class="d-flex justify-content-center align-items-center py-2 px-3 fa-solid fa-envelope action-icon text-purple"></i>
            </div>
            <div class="d-flex gap-3">
              <i onclick="toggleFavorite(${i})" class="d-flex justify-content-center align-items-center py-2 px-3 ${
        contact.favorite ? "fa-solid" : "fa-regular"
      } fa-star action-icon text-warning"></i>
              <i onclick="toggleEmergency(${i})" class="d-flex justify-content-center align-items-center py-2 px-3 ${
        contact.emergency ? "fa-solid fa-heart-pulse " : "fa-regular fa-heart"
      } action-icon text-danger"></i>
              <i onclick="editContact(${i})" class="d-flex justify-content-center align-items-center py-2 px-3 fa-solid fa-pen action-icon text-secondary"></i>
              <i onclick="deleteContact(${i})" class="d-flex justify-content-center align-items-center py-2 px-3 fa-solid fa-trash action-icon text-dark"></i>
            </div>
          </div>
        </div>
      </div>
      `;
    }
  }

  if (box === "") {
    box = '<p class="text-center mt-3">No contacts found</p>';
  }

  contactsContainer.innerHTML = box;
}

// ===================================================== ValidateAll ====================
function ValidateAll(element) {
  var text = element.value.trim();

  var regex = {
    fullName: /^[A-Za-z\u0600-\u06FF ]{2,50}$/,
    phone: /^(010|011|012|015)[0-9]{8}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    address: /^.{3,50}$/,
    notes: /^.{0,200}$/,
    group: /^(Work|Family|Friends)?$/,
  };

  var optionalFields = ["email", "address", "notes", "group"];

  var messages = {
    fullName: "Name should contain only letters and spaces (2-50 characters)",
    phone: "Phone must be a valid Egyptian number",
    email: "Invalid email format",
    address: "Address must be 3-50 characters",
    notes: "Notes must be 0-200 characters",
    group: "Please select a valid group",
  };

  var errorDiv = document.getElementById(element.id + "Error");

  if (optionalFields.includes(element.id) && text === "") {
    element.classList.remove("is-invalid");
    element.classList.remove("is-valid");
    if (errorDiv) errorDiv.textContent = "";
    return true;
  }

  if (regex[element.id] && regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    if (errorDiv) errorDiv.textContent = "";
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    if (errorDiv)
      errorDiv.textContent = messages[element.id] || "Invalid input";
    return false;
  }
}

// ============================== Initial Display ====================
displayContacts();
