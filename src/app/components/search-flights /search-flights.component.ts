import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CrudService } from '../../core/service/crud.service';
import { NotificationService } from '../../core/service/notification.service';
import { AppInjector } from '../../app.injector';
import * as moment from 'moment';
@Component({
    selector: 'app-search-flights',
    templateUrl: './search-flights.component.html',
    styleUrls: ['./search-flights.component.scss']
})
export class SearchFlightsComponent implements OnInit {


  protected formBuilder: FormBuilder = AppInjector.get(FormBuilder);
  protected service: CrudService = AppInjector.get(CrudService);

  public editForm: FormGroup;

  public loading = false;

  public items = {
    sideA: [],
    sideB: []
  };

    constructor(private notification: NotificationService) {
    }

    ngOnInit() {
      this.editForm = this.formBuilder.group(this.getFormControls());
    }

    getFormControls(): Object {
      return {
        origin: this.formBuilder.control(undefined, [Validators.required]),
        destination: this.formBuilder.control(undefined, [Validators.required]),
        startDate: this.formBuilder.control(undefined, [Validators.required]),
        endDate: this.formBuilder.control(undefined, []),
      };
    }

    search() {
      const origin = this.editForm.value.origin.toUpperCase();
      const destination = this.editForm.value.destination.toUpperCase();
      const startDate = this.editForm.value.startDate;
      const endDate = this.editForm.value.endDate ? this.editForm.value.endDate : moment(startDate).add(1, "M").format('YYYY-MM-DD');
      console.log(endDate)
      const URL = `/calendar/month?originAirportCode=${origin}&destinationAirportCode=${destination}&startDate=${startDate}&endDate=${endDate}&startDate2=${startDate}&endDate2=${endDate}&departureDate=${startDate}&returnDate=${endDate}&adults=1&children=0&infants=0&forceCongener=false&cabin=ALL&bestFare=true`
         
      
      this.loading = true
      this.service.get(URL)
      .subscribe(
        result => {
          this.processResult(result)
        },
        error => {
          this.loading = false;
          this.notification.error(error.message);
        });
    }

    private processResult(result) {
      this.items = {
        sideA: [],
        sideB: []
      }
      
      result.calendarSegmentList[0].calendarDayList.forEach(element => {
        this.items.sideA.push(element)
      });

      result.calendarSegmentList[1].calendarDayList.forEach(element => {
        this.items.sideB.push(element)
      });

      this.loading = false;
    }

}
