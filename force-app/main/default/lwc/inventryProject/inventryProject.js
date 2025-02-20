import { LightningElement, wire } from 'lwc';
import getProject from '@salesforce/apex/ProjectSetup.getProject';
import getTower from '@salesforce/apex/ProjectSetup.getTower';
import getUnit from '@salesforce/apex/ProjectSetup.getUnit';
import { NavigationMixin } from 'lightning/navigation';
import { loadScript } from "lightning/platformResourceLoader";
import CONFETTI from "@salesforce/resourceUrl/Celebration";


export default class InventryProject extends NavigationMixin(LightningElement) {
  projectId;
  towerId;
  unitMap;
  recordId;




  connectedCallback(){
    Promise.all([loadScript(this, CONFETTI )])
      .then(()=>{
        this.setUpCanvas();
      })
      .catch(error => {
        console.log(error)
      });
}

setUpCanvas(){
    var confettiCanvas = this.template.querySelector("canvas.confettiCanvas");
    this.myconfetti = confetti.create(confettiCanvas, { resize: true });
    this.myconfetti({
        zIndex: 10000
    });
}
//Celebration Themes

basicCannon(){
  confetti({
      particleCount: 100,
      spread: 70,
      origin: {
      y: 0.6
      }
  });
}

randomFun(min, max){
  return Math.random() * (max - min) + min;
}


randomCannon(){
  confetti({
      angle: this.randomFun(55, 125),
      spread: this.randomFun(50, 70),
      particleCount: this.randomFun(50, 100),
      origin: {
          y: 0.6
      }
  });
}


fireworks() {
  var end = Date.now() + 15 * 1000;
  let interval = setInterval(function() {
      if (Date.now() > end) {
      return clearInterval(interval);
      }
      confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: {
              x: Math.random(),
              y: Math.random() - 0.2
          }
          });
  }, 200);
}

shower(){
  var end = Date.now() + (15 * 100);
  (function frame() {
      confetti({
      particleCount: 10,
      startVelocity: 0,
      ticks: 300,
      origin: {
      x: Math.random(),
      y: 0
          },
      });
      if (Date.now() < end) {
      requestAnimationFrame(frame);
      }
  }());
}

celebration(){
  var end = Date.now() + (15 * 100);
  (function frame() {
  confetti({
      particleCount: 10,
      angle: 60,
      spread: 25,
      origin:{
      x: 0,
      y : 0.65
          }, 
      });
  confetti({
      particleCount: 10,
      angle: 120,
      spread: 25,
      origin:{
      x: 1,
      y : 0.65
          },  
      });
  if (Date.now() < end) {
      requestAnimationFrame(frame);
      }
  }());
}

burst(){
  var end = Date.now() + (15 * 75);
  (function frame() {
      // #1
      confetti({
      particleCount: 7,
      startVelocity: 25,
      angle: 335,
      spread: 10,
      origin:{
      x: 0,
      y: 0,
          },
          }); 
      // #2
      confetti({
      particleCount: 7,
      startVelocity: 25,
      angle: 205,
      spread: 10,
      origin:{
          x: 1,
          y: 0,
          },
          });
      // #3
      confetti({
      particleCount: 7,
      startVelocity: 35,
      angle: 140,
      spread: 30,
      origin:{
      x: 1,
      y: 1,
          },
          });
      // #4
      confetti({
      particleCount: 7,
      startVelocity: 35,
      angle: 40,
      spread: 30,
      origin: {
          x: 0,
          y: 1,
              },
          });
          if (Date.now() < end) {
              requestAnimationFrame(frame);
          }
  }());
}




  @wire(getProject)
  projectResult;

  @wire(getTower, { ProjectId: '$projectId' })
  towerResult;

  get projectOptions() {
    return this.projectResult.data ? this.projectResult.data.map(p => ({ label: p.Name, value: p.Id })) : [];
  }

  get towerOptions() {
    return this.towerResult.data ? this.towerResult.data.map(t => ({ label: t.Name, value: t.Id })) : [];
  }

  @wire(getUnit, { TowerId: '$towerId' })
  wiredUnitMap({data}) {
    if (data) {
      let arraydata = [];
      for(let key in data){
        arraydata.push({key:key , value:data[key]})
        this.unitMap = arraydata.sort(function (a, b) { return a.key - b.key }).reverse();

      }
      this.unitMap = arraydata;
      console.log(this.unitMap);
    }
  }
  handleClick(event) {
    this.unitMap = event.target.value;
    console.log(this.unitMap);
    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: {
        recordId : this.unitMap,
        objectApiName: 'Unit__c',
        actionName: 'view'
      }
    });
    eval("$A.get('e.force:refreshView').fire();");
  }

  handleProjectChange(event) {
    console.log(this.projectResult.data);
    this.projectId = event.target.value;
    
    alert(this.projectId);
    this.showSuccessAlert();
   // this.towerId = null;
    //this.unitMap = null;
  }
 

  handleTowerChange(event) {
    this.towerId = event.target.value;
    alert(this.towerId);
    this.celebration();

    getUnit({ TowerId: this.towerId }) // call the getUnit Apex method with the selected tower's ID
  }
}