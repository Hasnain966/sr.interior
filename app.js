import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKMet9QUW3rq9t2qc4tqr8Cla4q2jiQ0s",
  authDomain: "sr-interior786.firebaseapp.com",
  projectId: "sr-interior786",
  storageBucket: "sr-interior786.appspot.com",
  messagingSenderId: "533934651869",
  appId: "1:533934651869:web:2b3e8e9d7a0a0d20e89e34"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function showToast(msg, type="success") {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.style.background = type=="success" ? "#25d366" : "#e53935";
  toast.style.color = "#fff";
  toast.style.padding = "1rem";
  toast.style.borderRadius = "8px";
  toast.style.position = "fixed";
  toast.style.bottom = "2rem";
  toast.style.right = "2rem";
  toast.style.opacity = "1";
  setTimeout(() => toast.style.opacity="0", 3000);
}

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if(!name || !email || !message){
    showToast("Please fill all fields!", "error");
    return;
  }

  try {
    await addDoc(collection(db, "contacts"), {
      name: name,
      email: email,
      message: message,
      timestamp: serverTimestamp()
    });
    showToast("Message sent successfully!");
    contactForm.reset();
  } catch(err) {
    console.error(err);
    showToast("Failed to send message!", "error");
  }
});
    