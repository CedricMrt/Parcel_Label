window.jsPDF = window.jspdf.jsPDF;

const button = document.querySelector("#button");

button.onclick = () => {
  const blNumber = document.querySelector(".bl").value;
  const itemNumber = document.querySelector(".number").value;
  event.preventDefault();

  const doc = new jsPDF({
    unit: "mm",
    format: [150, 105],
  });

  for (var i = 1; i <= itemNumber; i++) {
  doc.addPage();
  doc.setFont("Arial", "bold");
  doc.setFontSize(70);

  // Calcul du centrage horizontal
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth = doc.getTextWidth(blNumber);
  const centerX = (pageWidth - textWidth) / 2;

  doc.text(centerX, 50, blNumber);

  doc.setFontSize(75);
  const itemText = i + "/" + itemNumber;
  const itemTextWidth = doc.getTextWidth(itemText);
  const itemCenterX = (pageWidth - itemTextWidth) / 2;

  doc.text(itemCenterX, 100, itemText);
}
  doc.deletePage(1);
  doc.autoPrint();
  
const hiddFrame = document.createElement('iframe');
hiddFrame.style.position = 'fixed';
// "visibility: hidden" would trigger safety rules in some browsers like safari，
// in which the iframe display in a pretty small size instead of hidden.
// here is some little hack ~
hiddFrame.style.width = '1px';
hiddFrame.style.height = '1px';
hiddFrame.style.opacity = '0.01';
const isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
if (isSafari) {
  // fallback in safari
  hiddFrame.onload = () => {
    try {
      hiddFrame.contentWindow.document.execCommand('print', false, null);
    } catch (e) {
      hiddFrame.contentWindow.print();
    }
  };
}
hiddFrame.src = doc.output('bloburl');
document.body.appendChild(hiddFrame);

  const newBlNumber = parseInt(blNumber) + 1;
  document.querySelector(".bl").value = newBlNumber;

  document.querySelector(".number").value = "";
};

//Register service worker to control making site work offline
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((registration) => {
        console.log(
          `Service Worker App Messagerie enregistré!\nRessource: ${registration.scope}`
        );
      })
      .catch((err) => {
        console.log(
          `Echec de l'enregistrement du Service Worker TodoList: ${err}`
        );
      });
  });
}

/**Bouton Installation Application*/
window.onbeforeinstallprompt = (event) => {
  event.preventDefault(); // annuler la banniere par defaut
  installBtn.classList.add("slide"); //affiche la banniere perso

  installBtn.onclick = () => {
    installBtn.classList.remove("slide"); //faire disparaitre le bouton
    setTimeout(() => (installBtn.style.display = "none"), 500);
    event.prompt(); //permettre l'installation
  };
};
