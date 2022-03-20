import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Json from '../../../../assets/data.json';
import { AddEditDetailsComponent } from '../add-edit-details/add-edit-details.component';
import * as uuid from 'uuid';
import { SortableHeaderDirective } from '../../directives/sortable-headers.directive';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  details: any;
  searchString: string = '';
  checkAll: boolean = false;
  pageIndex: number = 0;
  showFirstLastButtons: boolean = true;
  pageSize: number = 5;
  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective> | any;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.details = Json;
      this.initializeData();
    }, 3000);
  }

  initializeData(): void {
    this.details.map((item: any) => {
      item.checked = false;
      item.totalPrice = item.pricePerUnit * item.quantity;
      return item;
    });
  }

  openAddEditDetailsDialog(value: any = null, isEdit: boolean = false): void {
    let dialogRef = this.dialog.open(AddEditDetailsComponent, {
      width: '70%',
      hasBackdrop: false,
      disableClose: true,
      data: { isEdit: isEdit, details: value }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (isEdit) {
          this.editDetails(result);
        } else {
          this.addDetails(result);
        }
      }
    });
  }

  checkAllData(): void {
    this.details.map((item: any, index: number) => {
      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = (this.pageIndex + 1) * this.pageSize;
      if (index >= startIndex && index < endIndex) {
        item.checked = this.checkAll
      }
    });
  }

  onItemChecked(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = (this.pageIndex + 1) * this.pageSize;
    this.checkAll = false;
    if (!this.details.some((item: any, index: number) => !item.checked && index >= startIndex && index < endIndex)) {
      this.checkAll = true;
    }
  }

  handlePageEvent(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.onItemChecked();
  }

  addDetails(value: any): void {
    value.id = uuid.v4();
    this.details.unshift(value);
    this.initializeData();
  }

  editDetails(value: any): void {
    this.details.map((element: any) => {
      if (element.id === value.id) {
        element.id = value.id
        element.name = value.name
        element.description = value.description
        element.pricePerUnit = value.pricePerUnit
        element.category = value.category
        element.unitOfMeasurement = value.unitOfMeasurement
        element.quantity = value.quantity
      }
      return element;
    });
    this.initializeData();
  }

  deleteDetails(value: any = null): void {
    if (value) {
      this.details = this.details.filter((element: any) => element.id !== value.id);
    } else {
      this.details = this.details.filter((element: any) => !element.checked);
    }
    this.initializeData();
  }

  compare(v1: any, v2: any) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  onSort({ column, direction }: any) {
    this.details = this.sortData(this.headers, column, direction, this.details);
  }

  sortData(headers: any, column: string, direction: string, arrList: any) {
    headers.forEach((header: { sortable: string; direction: string; }) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    let data;
    if (direction === '') {
      data = [...arrList];
    } else {
      data = [...arrList].sort((a, b) => {
        const res = this.compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
    return data;
  }

}
