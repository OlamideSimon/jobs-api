export interface EmploymentInterface {
  employer: string;
  title: string;
  level:
    | 'no experience'
    | 'internship & graduate'
    | 'entry'
    | 'mid'
    | 'senior'
    | 'executive';
  country: string;
  startDate: Date;
  endDate?: Date; // Optional if the employment has ended
  responsibilities: string[]; // An array of responsibilities for the role
  skills: string[]; // An array of skills required for the role
  achievements?: string[]; // Optional: An array of achievements in the role
  isCurrentRole?: boolean; // Optional: Indicates if it's the current employment
  calculateDurationInMonths(): number;
  // Method to format the employment details as a string
  toString(): string;
}

// sample
class Employment implements EmploymentInterface {
  constructor(
    public employer: string,
    public title: string,
    public level:
      | 'no experience'
      | 'internship & graduate'
      | 'entry'
      | 'mid'
      | 'senior'
      | 'executive',
    public country: string,
    public startDate: Date,
    public endDate?: Date,
    public responsibilities: string[] = [],
    public skills: string[] = [],
    public achievements: string[] = [],
    public isCurrentRole: boolean = false,
  ) {}

  calculateDurationInMonths(): number {
    const end = this.isCurrentRole ? new Date() : (this.endDate as Date);
    const durationInMilliseconds = end.getTime() - this.startDate.getTime();
    return Math.round(durationInMilliseconds / (30 * 24 * 60 * 60 * 1000)); // Approximate months
  }

  toString(): string {
    const endDateString = this.isCurrentRole
      ? 'Present'
      : this.endDate?.toLocaleDateString() || 'Present';
    return `${this.title} at ${this.employer} (${
      this.level
    }) - ${this.startDate.toLocaleDateString()} to ${endDateString}`;
  }
}

// Example usage
const employmentExample = new Employment(
  'ABC Company',
  'Software Developer',
  'mid',
  'United States',
  new Date('2022-01-01'),
  new Date(),
  ['Code implementation', 'Bug fixing'],
  ['JavaScript', 'React'],
  ['Implemented feature X'],
  true,
);

console.log(employmentExample.toString());
console.log(
  `Duration: ${employmentExample.calculateDurationInMonths()} months`,
);
