
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,SideNavComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  expenseForm:any;
  selectedMonth:any;

  expenses:{month:string,expenseAmount:number}[]=[
    {month:'January',expenseAmount:1500},
    {month:'February',expenseAmount:2000},
    {month:'Marcch',expenseAmount:500}
  ];

  januaryExpense:any = [
    {expenseType:'Rent',expenseAmount:2000},
    {expenseType:'Groceris',expenseAmount:1000}
  ];

  februaryExpense:any = [
    {expenseType:'Rent',expenseAmount:2000},
    {expenseType:'Utility',expenseAmount:800}
  ];

  marchExpense:any = [
    {expenseType:'Rent',expenseAmount:2000},
    {expenseType:'Groceris',expenseAmount:1000}
  ];

  monthSelected:boolean = false;

  constructor(public fb: FormBuilder ,public router: Router) {
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', { month: 'long' });
  }

  ngOnInit() {
    this.expenseForm = this.fb.group({
      month: ['', Validators.required],
      expenseType:['', Validators.required],
      expenseAmount:['', Validators.required],
    })
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpense();
  }

  calculateTotalExpense(month:string): number {
    let totalExpene = 0;
    for(const expense of this.getExpenseForMonth(month)) {
      totalExpene += expense.expenseAmount;
    }
    return totalExpene;
  }

  getExpenseForMonth(month:string): any[] {
    switch(month) {
      case 'January':
        return this.januaryExpense;
      case 'February':
        return this.februaryExpense;
      case 'March':
        return this.marchExpense;
      default:
        return [];
    }
  }

  getFilteredExpense() {
    let filteredExpenses: any[] = [];
    switch(this.selectedMonth) {
      case 'January':
        filteredExpenses = [...this.januaryExpense];
        break;
      case 'February':
        filteredExpenses = [...this.februaryExpense];
        break;
      case 'March':
        filteredExpenses = [...this.marchExpense];
        break;
      default:
          break;
    }
    return filteredExpenses;
  }

  onSubmitExpense() {
    if(this.expenseForm.valid) {
      const newIncome = this.expenseForm.value;
      switch(this.selectedMonth) {
        case 'January':
          this.januaryExpense.push(newIncome);
          break;
        case 'February':
          this.februaryExpense.push(newIncome);
          break;
        case 'March':
          this.marchExpense.push(newIncome);
          break;
        default:
          break;
      }
      this.expenseForm.reset();
      this.expenseForm.patchValue({month: '', source: '', amount: '', investment: ''});
    }
  }

  saveForm() {
    console.log("Form saved successfully!")
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }
}
