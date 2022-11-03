import { patch } from "./patch.js";

document.getElementById('ua-upload').onchange = async function (e) {
  patch(e.target.files[0], document.querySelector('input[type=radio]:checked').value)
}
