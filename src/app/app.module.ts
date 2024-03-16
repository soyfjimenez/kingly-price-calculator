import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TreeSelectModule } from 'primeng/treeselect';
import { DropdownModule } from 'primeng/dropdown';
import { TreeModule } from 'primeng/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayTableComponent } from './display-table/display-table.component';
import { CustomerDataComponent } from './customer-data/customer-data.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayTableComponent,
    CustomerDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    InputNumberModule,
    FormsModule,
    ButtonModule,
    TreeSelectModule,
    DropdownModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
