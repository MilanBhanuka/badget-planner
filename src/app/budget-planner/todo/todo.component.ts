import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})

export class TodoComponent implements OnInit {
  todoForm:any;
  selectedMonth:any;

  expenses:{month:string,expenseAmount:number}[]=[
    {month:'January',expenseAmount:1500},
    {month:'February',expenseAmount:2000},
    {month:'Marcch',expenseAmount:500}
  ];

  januaryExpense:any[] = [
    {expenseType:'Rent',expenseAmount:2000},
    {expenseType:'Groceris',expenseAmount:1000}
  ];

  februaryExpense:any[] = [
    {expenseType:'Rent',expenseAmount:2000},
    {expenseType:'Utility',expenseAmount:800}
  ];

  marchExpense:any[] = [
    {expenseType:'Rent',expenseAmount:2000},
    {expenseType:'Groceris',expenseAmount:1000}
  ];

  monthSelected:boolean = false;

  constructor(public fb: FormBuilder ,public router: Router) {
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', { month: 'long' });
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
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
    for(const expense of this.gettodoForMonth(month)) {
      totalExpene += expense.amount;
    }
    return totalExpene;
  }

  gettodoForMonth(month:string): any[] {
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
    if(this.todoForm.valid) {
      const newIncome = this.todoForm.value;
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
      this.todoForm.reset();
      this.todoForm.patchValue({month: '', source: '', amount: '', investment: ''});
    }
  }

  onSave(){
    if(this.todoForm.valid) {
      const todoData = this.todoForm.value;
      this.todoForm.reset({month: this.selectedMonth});
      this.getFilteredExpense();
    }

  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }

  toggleSelected(todoTransaction: any) {
    todoTransaction.selected = !todoTransaction.selected;
  }
}
