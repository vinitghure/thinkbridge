import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ViewDetailsComponent } from './components/view-details/view-details.component';
import { AddEditDetailsComponent } from './components/add-edit-details/add-edit-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FilterPipe } from './pipes/filter.pipe';
import { SortableHeaderDirective } from './directives/sortable-headers.directive';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    PagesComponent,
    ViewDetailsComponent,
    AddEditDetailsComponent,
    FilterPipe,
    SortableHeaderDirective
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    NgxSkeletonLoaderModule.forRoot(),
    MatCheckboxModule,
    MatPaginatorModule
  ]
})
export class PagesModule { }
