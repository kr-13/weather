


   
 import { LightningElement, track, wire } from 'lwc';
 import getvilles from '@salesforce/apex/Getvilles.getvilles';
 import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubsub';
 import{CurrentPageReference} from 'lightning/navigation';
 
 
 export default class pickVille extends LightningElement {
   
     selectedCity= '';
      cityoptions;
      cities;
 
     @wire(getvilles)
     wiredGetVille({ error, data }) {
         if (data) {
            
             this.cityoptions = data.map(city => {
                 return { label: city, value: city }; });

                       //only to test this is not in the code as i had errors
                        this.cities=data.map(city => {
                         return { label: city, value: city }; });
                        //finished test

                 console.log('selected are : ',data);
                 

                 
         } else if (error) {
             console.error(error);
         }

        }   
        
    
  handleChange(event) {
         this.selectedCity = event.target.value;

         //verifier le console
         console.log('la ville selectionnee est : ',this.selectedCity);
         
         
         fireEvent(this.pageRef, 'citySelected', this.selectedCity);
    }


  

//used this code for test

  /*  connectedCallback() {
        registerListener('citySelected', this.handleCitySelected, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleCitySelected(city) {
        this.selectedCity = city;
    }
     */
        
         
     }

    
  