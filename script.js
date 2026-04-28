function analyzePassword(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*]/.test(password)) score++;

  let color = "red";
  let label = "WEAK";

  if (score > 2) {
    color = "orange";
    label = "MEDIUM";
  }
  if (score > 4) {
    color = "green";
    label = "STRONG";
  }

  let percent = (score / 6) * 100;

  document.getElementById("strengthFill").style.width = percent + "%";
  document.getElementById("strengthFill").style.background = color;
  document.getElementById("strengthLabel").innerText = label;
}

// HASH
async function generateHash() {
  const text = document.getElementById("hashInput").value;
  if (!text) return alert("Enter text");

  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

  document.getElementById("hashOutput").innerText = hashHex;
}

// BASE64
function b64Encode() {
  const text = document.getElementById("b64Input").value;
  alert("Encoded: " + btoa(text));
}

function b64Decode() {
  try {
    const text = document.getElementById("b64Input").value;
    alert("Decoded: " + atob(text));
  } catch {
    alert("Invalid Base64");
  }
}
function copyHash() {
  const text = document.getElementById("hashOutput").innerText;
  if (!text) return alert("Nothing to copy!");

  navigator.clipboard.writeText(text);
  alert("Copied to clipboard!");
}