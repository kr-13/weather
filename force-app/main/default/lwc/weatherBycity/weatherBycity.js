import { LightningElement, wire } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import{CurrentPageReference} from 'lightning/navigation';
import getWeatherByCity from '@salesforce/apex/Weather.getWeatherByCity';
import gettemperature from '@salesforce/apex/Weather.gettemperature';



export default class weatherBycity extends LightningElement{

    @wire(CurrentPageReference) pageRef;
    
    weather;
    city;
    
   
    
    connectedCallback() {
        registerListener('citySelected', this.handleCitySelected, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }



/*
    handleCitySelected(city) {
        this.city = city;
        getWeatherByCity({ city: this.city })
            .then(result => {
                this.weather = result;
            })
            .catch(error => {
                console.error(error);
            });
    }

    */

    handleCitySelected(city) {
        this.city = city;
        gettemperature({ city: this.city })
            .then(result => {
                this.weather = result;
            })
            .catch(error => {
                console.error(error);
            });
    }

}


