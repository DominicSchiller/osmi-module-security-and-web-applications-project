import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HealthInsuranceDetails } from 'src/app/models/health_insurance';
import { PatientAPIService } from 'src/app/services/backend/patient_api_service';

@Component({
  selector: 'app-insurance-details',
  templateUrl: './insurance-details.page.html',
  styleUrls: ['./insurance-details.page.scss'],
})
export class InsuranceDetailsPage implements OnInit {

  private patientId: string
  private insuranceDetailsSubject: BehaviorSubject<HealthInsuranceDetails> = new BehaviorSubject<HealthInsuranceDetails>(null)
  public insuranceDetails: Observable<HealthInsuranceDetails> = this.insuranceDetailsSubject.asObservable()

  constructor(
    private route: ActivatedRoute,
    private patientApiService: PatientAPIService
  ) { }

  ngOnInit() {
    this.route.queryParams
    // .filter(params => params.order)
    .subscribe(params => {
        if (params.patientId) {
          this.patientId = params.patientId
          this.loadInsuranceDetails()
        }
    });
   
  }

  private loadInsuranceDetails() {
    this.patientApiService.getInsuranceDetails(this.patientId)
      .subscribe(insuranceDetails => {
        console.warn(insuranceDetails)
        this.insuranceDetailsSubject.next(insuranceDetails)
      })
  }

}
