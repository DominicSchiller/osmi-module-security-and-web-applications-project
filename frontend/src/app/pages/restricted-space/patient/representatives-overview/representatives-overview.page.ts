import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Representative } from 'src/app/models/representative';
import { PatientAPIService, PatientApiServiceAction } from 'src/app/services/backend/patient_api_service';

@Component({
  selector: 'app-representatives-overview',
  templateUrl: './representatives-overview.page.html',
  styleUrls: ['./representatives-overview.page.scss'],
})
export class RepresentativesOverviewPage implements OnInit {

  private patientId: string
  private representativesSubject: BehaviorSubject<Representative[]> = new BehaviorSubject<Representative[]>([])
  public representatives: Observable<Representative[]> = this.representativesSubject.asObservable()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private patientApiService: PatientAPIService
  ) {
    let params = new HttpParams();
    params = params.append('newOrdNum','123');
   }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
        if (params.patientId) {
          this.patientId = params.patientId
          this.loadRepresentatives()
        }
    });

    this.performRetryActions()
  }

  private performRetryActions() {
    this.patientApiService.performRetryActions(this.patientId)
  }

  private loadRepresentatives() {
    this.patientApiService.getRepresentatives(this.patientId)
      .subscribe(representatives => {
        this.representativesSubject.next(representatives)
      })
  }

  public getFullName(representative: Representative) {
    let personalDetails = representative.personalDetails
    return `${personalDetails.title}${personalDetails.title === '' ? "" : " "}${personalDetails.firstName} ${personalDetails.lastName}`
  }

  public getAddress(representative: Representative) {
    let address = representative.personalDetails.address
    return `${address.street}, ${address.zipCode} ${address.city}`
  }

  public removeRepresentative(representative: Representative) {
    this.patientApiService.removeRepresentative(this.patientId, representative._id)
      .subscribe(result => {
        this.loadRepresentatives()
      })
  }

  public navigateBack() {
    this.router.navigate(['/restricted-space/patient'], {
      queryParams: {id: this.patientId }
    })
  }

}
