import "/src/styles/index.scss";
import { cipher_image as cipherImage } from "./image-cipher/image_cipher";

const inputFile = document.getElementById("cipher-form__input-file");
const cipherForm = document.querySelector(".cipher-form");
const downloadButton = document.querySelector(".cipher-form a");

inputFile.addEventListener("change", onSelectFile);
cipherForm.addEventListener("submit", onSubmit);

let inputData;
let outputData;

function onSelectFile() {
  cipherForm.classList.add("cipher-form--with-border");
  const inputImage = inputFile.files[0];
  console.log(`${inputImage.name} selected`);

  const reader = new FileReader();

  reader.onloadstart = () => {
    console.log("reading selected file");
    cipherForm.classList.add("cipher-form--loading");
  };

  reader.onloadend = () => {
    cipherForm.classList.remove("cipher-form--loading");
    cipherForm.classList.add("cipher-form--insert-key");
    console.log("read complete");
    inputData = new Uint8Array(reader.result);
  };

  reader.readAsArrayBuffer(inputImage);

}


function onSubmit(e) {
  e.preventDefault();
  const key = cipherForm.querySelector('.cipher-form__key').value;

  cipherForm.classList.remove("cipher-form--insert-key");
  cipherForm.classList.add("cipher-form--loading");
  setTimeout(() => {
    outputData = new Blob([cipherImage(inputData, key)], { type: "image/png" });
    cipherForm.classList.add("cipher-form--download");
    cipherForm.classList.remove("cipher-form--loading");
    downloadButton.href = URL.createObjectURL(outputData);

  }, 300);

}
