import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { PatientAPIService } from 'src/app/services/backend/patient_api_service';
import { Record } from 'src/app/models/record';

@Component({
  selector: 'app-records-overview',
  templateUrl: './records-overview.page.html',
  styleUrls: ['./records-overview.page.scss'],
})
export class RecordsOverviewPage implements OnInit {

  private patientId: string
  private recordsSubject: BehaviorSubject<Record[]> = new BehaviorSubject<Record[]>([])
  public records: Observable<Record[]> = this.recordsSubject.asObservable()
  
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
          this.loadRecords()
        }
      });
  }

  public navigateBack() {
    this.router.navigate(['/restricted-space/patient'], {
      queryParams: {id: this.patientId }
    })
  }

  private loadRecords() {
    this.patientApiService.getRecords(this.patientId)
      .subscribe(records => {
        let sortedRecords = records.sort(this.sortRecordsByDate)
        this.recordsSubject.next(records)
      })
  }

  private sortRecordsByDate(a, b) {
    if (a.date < b.date) {
      return 1;
  }
  if (a.date > b.date) {
      return -1;
  }
  return 0;
  }

  public getDoctorFullName(record: Record): string {
    let doctor = record.doctor.personalDetails
    return `${doctor.title}${doctor.title === '' ? "" : " "}${doctor.firstName} ${doctor.lastName}`
  }

  public getFormattedDate(record: Record): string {
    var options: Intl.DateTimeFormatOptions = { /*weekday: 'long',*/ year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(record.date).toLocaleDateString("de-DE", options)
  }

}
