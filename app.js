window.jsPDF = window.jspdf.jsPDF;

const button = document.querySelector("#button");

button.onclick = (event) => {
  event.preventDefault();

  const blNumber = document.querySelector(".bl").value;
  const itemNumber = parseInt(document.querySelector(".number").value, 10);

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [150, 105],
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const centerX = pageWidth / 2;

  for (let i = 1; i <= itemNumber; i++) {
    if (i > 1) doc.addPage();

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(60);
    doc.text(blNumber.toString(), centerX, pageHeight / 2 - 10, {
      align: "center",
    });

    doc.setFontSize(75);
    doc.text(`${i}/${itemNumber}`, centerX, pageHeight / 2 + 25, {
      align: "center",
    });
  }

  doc.autoPrint();

  const hiddFrame = document.createElement("iframe");
  hiddFrame.style.position = "fixed";
  hiddFrame.style.width = "1px";
  hiddFrame.style.height = "1px";
  hiddFrame.style.opacity = "0.01";

  const isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
  if (isSafari) {
    hiddFrame.onload = () => {
      try {
        hiddFrame.contentWindow.document.execCommand("print", false, null);
      } catch (e) {
        hiddFrame.contentWindow.print();
      }
    };
  }

  hiddFrame.src = doc.output("bloburl");
  document.body.appendChild(hiddFrame);

  document.querySelector(".bl").value = parseInt(blNumber, 10) + 1;
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
