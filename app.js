window.jsPDF = window.jspdf.jsPDF;

const button = document.querySelector('#button');

button.onclick = () => {
    const blNumber = document.querySelector(".bl").value;
    const itemNumber = document.querySelector(".number").value;
    event.preventDefault();

    const doc = new jsPDF({
        unit: "mm",
        format: [150, 105]
    });

    for (var i = 1; i <= itemNumber; i++) {
        doc.addPage();
        doc.setFont("Arial", "bold");
        doc.setFontSize(90);
        doc.text(20, 70, blNumber);

        doc.setFont("Arial", "bold");
        doc.setFontSize(95);
        doc.text(35, 120, i + "/" + itemNumber);

    }
    doc.deletePage(1)
    doc.output('dataurlnewwindow');

}

//Register service worker to control making site work offline
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('sw.js')
            .then(registration => {
                console.log(`Service Worker App Messagerie enregistré!\nRessource: ${registration.scope}`);
            })
            .catch(err => {
                console.log(`Echec de l'enregistrement du Service Worker TodoList: ${err}`);
            });
    });
}

/**Bouton Installation Application*/
window.onbeforeinstallprompt = (event) => {
    event.preventDefault(); // annuler la banniere par defaut
    installBtn.classList.add("slide"); //affiche la banniere perso

    installBtn.onclick = () => {
        installBtn.classList.remove("slide"); //faire disparaitre le bouton
        setTimeout(() => installBtn.style.display = "none", 500);
        event.prompt(); //permettre l'installation
    };
};
