import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule,SideNavComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  // income
  lastMonthsIncome = ['January: $.1000' , 'February: $.2000', 'March: $.3000'];
  currentMonthIncome = '$.5000';

  // income
  lastMonthsExpense = ['January: $.1000' , 'February: $.2000', 'March: $.3000'];
  currentMonthExpense = '$.5000';

  // Todo Transactions
  todoTransactions = [
    {description: 'Pay Electricity Bill'},
    {description: 'Submit Monthly Report'},
    {description: 'Buy Groceries'},
    {description: 'Pay Rent'}
  ];


  totalCurrentMonthIncome = 2000;
  totalCurrentMonthExpense = 1000;

  constructor(public router: Router) {}

  onIncome(){
    this.router.navigate(['/budget-planner/income']);
  }

  onExpense(){
    this.router.navigate(['/budget-planner/expense']);
  }

  onTodo(){
    this.router.navigate(['/budget-planner/todo']);
  }

  get currentMonthSavings(): number {
    return this.totalCurrentMonthIncome - this.totalCurrentMonthExpense;
  }
}
