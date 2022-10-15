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
        doc.setFontSize(70);
        doc.text(20, 50, blNumber);

        doc.setFont("Arial", "bold");
        doc.setFontSize(75);
        doc.text(35, 100, i + "/" + itemNumber);

    }
    doc.deletePage(1)
    doc.output('dataurlnewwindow');



}
