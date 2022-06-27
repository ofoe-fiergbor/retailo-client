import { AfterViewInit, Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MerchantRequestModel } from 'src/app/service/merchant-request/merchant-request.model';
import { MerchantRequestService } from 'src/app/service/merchant-request/merchant-request.service';
import { UtilService } from 'src/app/service/util/util.service';

@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class RequestTableComponent implements AfterViewInit {
  dataSource: MerchantRequestModel[] = [];
  columnsToDisplay = [
    'createDate',
    'firstName',
    'lastName',
    'email',
    'phone',
    'status',
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement?: MerchantRequestModel;
  isLoadingResults = false;
  constructor(
    private merchantRequestService: MerchantRequestService,
    private util: UtilService
  ) {}

  ngAfterViewInit() {
    this.isLoadingResults = true;
    this.merchantRequestService.getAllRequests().subscribe(
      (data) => {
        this.dataSource = data.requests;
        this.isLoadingResults = false;
      },
      (error) => console.log(error)
    );
  }

  updateRequest(
    status: 'PENDING' | 'GRANTED' | 'DENIED' | 'REVOKED',
    userId: number
  ) {
    this.checkStatus(userId);
    this.merchantRequestService
      .updateMerchantRequest(
        {
          status: status,
          comment: '',
        },
        userId
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.dataSource.forEach((e) => {
            if (e.userId === res.userId) {
              e.status = res.status;
            }
          });
          this.util.openSnackBar(
            `${status} status has successfully been set for ${res.firstName} ${res.lastName}`
          );
        },
        (err) => {
          this.util.openSnackBar('Something went wrong, try again!');
        }
      );
  }

  checkStatus(userId: number) {
    const request = this.dataSource.filter((req) => req.userId === userId)[0];
    if (request.status === status) {
      this.util.openSnackBar(
        `${status} status has already been set for ${request.firstName} ${request.lastName}`
      );
      return;
    }
  }
}
