const downloadButton = document.getElementById('download-pdf');

downloadButton.addEventListener('click', () => {
    const pdfUrl = './CV/DiegoFinnilaCV.pdf';
    
    const anchor = document.createElement('a');
    anchor.href = pdfUrl;
    anchor.download = 'DiegoFinnilaCV.pdf';
    anchor.style.display = 'none';
    
    document.body.appendChild(anchor);
    
    anchor.click();
    
    document.body.removeChild(anchor);
});
let currentTextIndex = 0;
const texts = document.getElementsByClassName("text");

function toggleRectangleText() {
  for (let text of texts) {
    text.classList.remove("visible");
  }
  texts[currentTextIndex].classList.add("visible");
  currentTextIndex = (currentTextIndex + 1) % texts.length;
}

toggleRectangleText();
setInterval(toggleRectangleText, 1500);

function openTab(tabName) {
  var i;
  var x = document.getElementsByClassName("tab-selected");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  var buttons = document.getElementsByClassName("tab-button");
  for (i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }
  
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.classList.add("active");
}
