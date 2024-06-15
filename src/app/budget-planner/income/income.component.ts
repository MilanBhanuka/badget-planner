import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent implements OnInit {
  incomeForm:any;
  selectedMonth:any;
  januaryIncome:any = [
    {source: 'Salary', amount: 50000, investment:'401(k)'},
    {source: 'Freelancing', amount: 10000, investment:'Stocks'},
  ];

  februaryIncome:any = [
    {source: 'Salary', amount: 50000, investment:'401(k)'},
    {source: 'Rental Income', amount: 20000, investment:'Real Estate'}
  ];

  marchIncome:any = [
    {source: 'Salary', amount: 50000, investment:'401(k)'},
    {source: 'Freelancing', amount: 10000, investment:'Stocks'},
    {source: 'Rental Income', amount: 500, investment:'Real Estate'}
  ];

  monthSelected:boolean = false;

  constructor(public fb: FormBuilder ,public router: Router) {
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', { month: 'long' });
  }

  ngOnInit() {
    this.incomeForm = this.fb.group({
      month: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', Validators.required],
      investments: ['', Validators.required]
    })
  }

  onChange(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredIncome();
  }

  calculateTotalIncome(month:string): number {
    let totalIncome = 0;
    for(const income of this.getIncomesForMonth(month)) {
      totalIncome += income.amount;
    }
    return totalIncome;
  }

  getIncomesForMonth(month:string): any[] {
    switch(month) {
      case 'January':
        return this.januaryIncome;
      case 'February':
        return this.februaryIncome;
      case 'March':
        return this.marchIncome;
      default:
        return [];
    }
  }

  getFilteredIncome() {
    let filteredIncomes: any[] = [];
    switch(this.selectedMonth) {
      case 'January':
        filteredIncomes = [...this.januaryIncome];
        break;
      case 'February':
        filteredIncomes = [...this.februaryIncome];
        break;
      case 'March':
        filteredIncomes = [...this.marchIncome];
        break;
      default:
          break;
    }
    return filteredIncomes;
  }

  onSubmit() {
    if(this.incomeForm.valid) {
      const newIncome = this.incomeForm.value;
      switch(this.selectedMonth) {
        case 'January':
          this.januaryIncome.push(newIncome);
          break;
        case 'February':
          this.februaryIncome.push(newIncome);
          break;
        case 'March':
          this.marchIncome.push(newIncome);
          break;
        default:
          break;
      }
      this.incomeForm.reset();
      this.incomeForm.patchValue({month: '', source: '', amount: '', investment: ''});
    }
  }

  saveForm() {
    if(this.incomeForm.valid) {
      const incomeData = this.incomeForm.value;
      this.incomeForm.reset({month: this.selectedMonth});
      this.getFilteredIncome().push(incomeData);
    }
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }
}
