// Saves options to chrome.storage
function save_options() {
  console.log("saving opptions");
  var color = document.getElementById("color").value;
  var loggingEnabled = document.getElementById("logging").checked;

  var updatedOptions = {
    favoriteColor: color,
    loggingEnabled: loggingEnabled,
  };

  console.log("saving opptions");

  chrome.storage.sync.set(updatedOptions, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.textContent = "Options saved.";
    setTimeout(function () {
      status.textContent = "";
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get(
    {
      favoriteColor: "red",
      loggingEnabled: false,
    },
    function (items) {
      document.getElementById("color").value = items.favoriteColor;
      document.getElementById("logging").checked = items.likesColor;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
