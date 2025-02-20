import { LightningElement, track } from 'lwc';
import jsPDF from '@salesforce/resourceUrl/jspdf';
import { loadScript } from 'lightning/platformResourceLoader';

export default class NitinChoudharyResume extends LightningElement {
    jsPdfInitialized = false;

    renderedCallback() {
        if (this.jsPdfInitialized) {
            return;
        }
        this.jsPdfInitialized = true;
        Promise.all([
            loadScript(this, jsPDF)
        ]).then(() => {
            console.log('jsPDF loaded successfully.');
        }).catch((error) => {
            console.error('jsPDF failed to load:', error);
        });
    }

    @track name = 'Nitin Choudhary';
    @track position = 'Salesforce Developer';
    @track address = 'Pune';
    @track mobile = '8839783836';
    @track email = 'nitinc793@gmail.com';
    @track objective =
        'To work in a competitive and challenging environment where I can learn and grow my skills to pursue a challenging career.';
    @track education = [
        {
            degree: 'Master of Computer Application',
            college: 'IICMR College Nigdi Pune (MH)',
            location: 'Pune',
        },
        {
            degree: 'Bachelors of Computer Application',
            college: 'BIMTS College Burhanpur (MP)',
            location: 'Burhanpur',
        },
    ];
    @track skills = [
        'Apex Triggers',
        'Lightning Web Component',
        'Visual force Page',
        'Flows',
        'Salesforce.com Standard Object',
        'Apex language, Apex Trigger, Apex Class, and Asynchronous Apex, SOQl',
    ];
    @track certification = 'Salesforce Platform Developer';
    @track nationality = 'Indian';
    @track dob = '30-11-1996';
    @track maritalStatus = 'Unmarried';

    handleDownload() {
        const resumeData = {
            name: this.name,
            position: this.position,
            address: this.address,
            mobile: this.mobile,
            email: this.email,
            objective: this.objective,
            education: this.education,
            skills: this.skills,
            certification: this.certification,
            nationality: this.nationality,
            dob: this.dob,
            maritalStatus: this.maritalStatus
        };

        this.generatePdf(resumeData);
    }



    generatePdf(resumeData) {
        const { jsPDF } = window.jspdf;


        const text = [
            `Name: ${resumeData.name}`,
            `Position: ${resumeData.position}`,
            `Address: ${resumeData.address}`,
            `Mobile: ${resumeData.mobile}`,
            `Email: ${resumeData.email}`,
            `Objective: ${resumeData.objective}`,
            `Education: ${resumeData.education.degree}`,
        ];
        

        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
            compress: true,
            encryption: {
                userPassword: "user",
                ownerPassword: "owner",
                userPermissions: ["print", "modify", "copy", "annot-forms"]
                // try changing the user permissions granted
            }
        });

        doc.text(text, 20, 20);
        doc.save("demo.pdf");
    }

}