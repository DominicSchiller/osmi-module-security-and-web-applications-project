import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HealthInsuranceDetails } from 'src/app/models/health_insurance';
import { Representative } from 'src/app/models/representative';
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
    private router: Router,
    private route: ActivatedRoute,
    private patientApiService: PatientAPIService
  ) { }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
        if (params.patientId) {
          this.patientId = params.patientId
          this.loadInsuranceDetails()
        }
    });
   console.info(document.referrer)
  }

  public navigateBack() {
    this.router.navigate(['/restricted-space/patient'], {
      queryParams: {id: this.patientId }
    })
  }

  private loadInsuranceDetails() {
    this.patientApiService.getInsuranceDetails(this.patientId)
      .subscribe(insuranceDetails => {
        this.insuranceDetailsSubject.next(insuranceDetails)
      })
  }

}
