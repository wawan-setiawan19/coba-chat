var firebaseConfig = {
  apiKey: "AIzaSyDl1EL64HdTrc2jC_lVrk3pSbSAG6b-bVE",
  authDomain: "my-test-project-89885.firebaseapp.com",
  projectId: "my-test-project-89885",
  storageBucket: "my-test-project-89885.appspot.com",
  messagingSenderId: "292312429900",
  appId: "1:292312429900:web:e8110f147a79b40b0a0be9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let myName = "";
function ambilNama() {
  myName = prompt("Enter Your name");
    if (myName == undefined) ambilNama();
    if (myName == '') ambilNama();
}

ambilNama();
const inputElement = document.querySelector("#message");
inputElement.addEventListener("keypress", (e) => {
  if (e.which == 13) sendMessage();
});

function sendMessage() {
  // get message
  let message = inputElement.value;

  // save in database
  firebase.database().ref("messages").push().set({
    sender: myName,
    message: message,
  });

  inputElement.value = "";
  // prevent from submitting
  return false;
}

// listen for incoming messages
function show() {
  document.getElementById("messages").innerHTML = "";
  let id = 0;
  firebase
    .database()
    .ref("messages")
    .on("child_added", function (snapshot) {
      let html = "";
      id++;
      if (myName === snapshot.val().sender) {
        html += `<li class="right" id="chat${id}">${snapshot.val().sender}: ${
          snapshot.val().message
        }</li>`;
      } else {
        html += `<li  id="chat${id}">${snapshot.val().sender}: ${
          snapshot.val().message
        }</li>`;
      }

      document.getElementById("messages").innerHTML += html;
      document.getElementById(`chat${id}`).scrollIntoView(true);
    });
}

firebase
  .database()
  .ref("messages")
  .on("child_changed", function (snapshot) {
    show();
  });

firebase
  .database()
  .ref("messages")
  .on("child_removed", function (snapshot) {
    show();
  });

show();
