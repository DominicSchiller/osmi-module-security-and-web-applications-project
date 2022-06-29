import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Representative } from 'src/app/models/representative';
import { PatientAPIService } from 'src/app/services/backend/patient_api_service';

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
    private route: ActivatedRoute,
    private patientApiService: PatientAPIService
  ) { }

  ngOnInit() {
    this.route.queryParams
    // .filter(params => params.order)
    .subscribe(params => {
        if (params.patientId) {
          this.patientId = params.patientId
          this.loadRepresentatives()
        }
    });
  }

  private loadRepresentatives() {
    this.patientApiService.getRepresentatives(this.patientId)
      .subscribe(representatives => {
        console.info(representatives)
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

}
