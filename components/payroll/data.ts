
import { PayrollRecord } from '../../types';
import { mockEmployees } from '../projects/data';

const generatePayrollForMonth = (employeeId: number, month: string): PayrollRecord => {
    const basicSalary = 50000 + (employeeId * 1000);
    const allowances = basicSalary * 0.2;
    const deductions = basicSalary * 0.1;
    const netSalary = basicSalary + allowances - deductions;

    return {
        id: `payroll-${employeeId}-${month.replace(' ', '-')}`,
        employeeId,
        month,
        basicSalary,
        allowances,
        deductions,
        netSalary,
        status: 'Paid',
    };
};

const months = [
    "July 2024",
    "June 2024",
    "May 2024",
    "April 2024"
];

export const mockPayroll: PayrollRecord[] = mockEmployees.flatMap(employee => {
    return months.map(month => generatePayrollForMonth(employee.id, month));
});
