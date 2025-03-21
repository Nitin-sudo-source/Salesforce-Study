import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript } from 'lightning/platformResourceLoader';
import signaturePadURL from '@salesforce/resourceUrl/signature_pad';


export default class SignatureLWC extends LightningElement {

    sigPadInitialized = false;
    canvasWidth = 400;
    canvasHeight = 200;

    renderedCallback() {
        if (this.sigPadInitialized) {
            return;
        }
        this.sigPadInitialized = true;

        Promise.all([
            loadScript(this, signaturePadURL)
        ])
            .then(() => {
                this.initialize();
            })
            .catch(error => {
                console.log(error);
            });
    }

    initialize() {
        const canvas = this.template.querySelector('canvas.signature-pad');
        this.signaturePad = new window.SignaturePad(canvas);
    }

    handleClick() {
        console.log(this.signaturePad.toDataURL())
    }

    downloadPDF() {
        const canvas = this.template.querySelector('canvas.signature-pad');

        // Use HTML2Canvas to capture the content of the canvas
        html2canvas(canvas).then(canvasImage => {
            // Create a new jsPDF instance
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4',
            });

            // Add the canvas image to the PDF
            const imgData = canvasImage.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0, 297, 210); // Adjust width and height as needed

            // Save the PDF to a file
            pdf.save('signature.pdf');
        });
    }


}