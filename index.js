var siteName = document.getElementById("site-name");
var siteUrl = document.getElementById("site-url");
var submitBtn = document.getElementById("submitBtn");
var bookmarksTable = document.getElementById("bookmarksTable");
var Bookmarks = [];
var usernameRegex = /^[a-zA-Z0-9_-]{3,}$/;
var urlRegex =
  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;

if (localStorage.getItem("Bookmarks")) {
  Bookmarks = JSON.parse(localStorage.getItem("Bookmarks"));
  displayBookmarks();
}


function addNewBookmark() {
  var inputSitename = siteName.value;
  var inputSiteUrl = siteUrl.value;

  validate(siteName, usernameRegex); 
  validate(siteUrl, urlRegex); 

  if (
    siteName.classList.contains("is-invalid") ||
    siteUrl.classList.contains("is-invalid")
  ) {
    openModal();
        return; 
  }

  var newBookmark = { siteName: inputSitename, siteUrl: inputSiteUrl };


  var storedBookmarks = JSON.parse(localStorage.getItem("Bookmarks"));
  if (storedBookmarks) {
    Bookmarks = storedBookmarks; 
  }

  Bookmarks.push(newBookmark); 

  localStorage.setItem("Bookmarks", JSON.stringify(Bookmarks));

  console.log(JSON.parse(localStorage.getItem("Bookmarks")));
  clearForm(); 

  displayBookmarks();
}

function displayBookmarks() {
  bookmarksTable.innerHTML = "";

  for (var index = 0; index < Bookmarks.length; index++) {
    var bookmark = Bookmarks[index];
    var row = `
      <tr>
        <td>${index + 1}</td>
        <td>${bookmark.siteName}</td>
        <td><button  onclick="openLink('${bookmark.siteUrl}')" type="button" class="btn btn-success">Visit</button></td>
        <td><button onclick="deleterow('${index}')" type="button" class="btn btn-danger">Delete</button></td>
      </tr>
    `;
    bookmarksTable.innerHTML += row;
}

}

function validate(testedElement, regex) {
  var testedValue = testedElement.value; 
  if (regex.test(testedValue)) {
    testedElement.classList.add("is-valid");
    testedElement.classList.remove("is-invalid");
  } else {
    testedElement.classList.add("is-invalid");
    testedElement.classList.remove("is-valid");
  }
}

function clearForm() {
  siteName.value = "";
  siteUrl.value = "";
}
function openLink(url) {
    window.open(url, "_blank"); 
}

function deleterow(index) {
    Bookmarks.splice(index,1);
    localStorage.setItem("Bookmarks", JSON.stringify(Bookmarks));
    displayBookmarks();
    
}


function openModal() {
    document.getElementById("customModal").style.display = "flex";
  }
 function closeModal() {
    document.getElementById("customModal").style.display = "none";
  }

window.onclick = function(event) {
    const modal = document.getElementById("customModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };