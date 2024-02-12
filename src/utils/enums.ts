export enum Status {
  PENDING = 'pending',
  REJECTED = 'rejected',
  REVIEWED = 'reviewed',
  SHORTLISTED = 'shortlisted',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  OTHERS = 'others',
}

export enum Availability {
  FULL_TIME = 'full',
  PART_TIME = 'part',
  LIVE_IN = 'live_in',
  OTHERS = 'others',
}

export enum JobAvailabilityStatus {
  OpenForOpportunities = 'Open for Opportunities',
  NotLooking = 'Not Looking',
  ActivelySeeking = 'Actively Seeking',
  PassiveJobSeeker = 'Passive Job Seeker',
  ConsideringOffers = 'Considering Offers',
  FreelanceContractWork = 'Freelance/Contract Work',
  PartTimeAvailability = 'Part-Time Availability',
  RemoteWork = 'Remote Work',
  InternshipSeeker = 'Internship Seeker',
  TemporaryPositions = 'Temporary Positions',
}

export enum JobsType {
  FULL_TIME = 'full',
  PART_TIME = 'part',
  CONTRACT = 'contract',
  REMOTE = 'remote',
  INTERNSHIP = 'internship',
}

export const JobsTypeDescriptions: Record<JobsType, string> = {
  [JobsType.FULL_TIME]: 'Full Time',
  [JobsType.PART_TIME]: 'Part Time',
  [JobsType.CONTRACT]: 'Contract',
  [JobsType.REMOTE]: 'Remote',
  [JobsType.INTERNSHIP]: 'Internship',
};

export enum ExperienceLevel {
  NoExperience = 'no experience',
  InternshipAndGraduate = 'internship & graduate',
  Entry = 'entry',
  Mid = 'mid',
  Senior = 'senior',
  Executive = 'executive',
}

export const ExperienceLevelDescriptions: Record<ExperienceLevel, string> = {
  [ExperienceLevel.NoExperience]: 'No Experience',
  [ExperienceLevel.InternshipAndGraduate]: 'Internship & Graduate',
  [ExperienceLevel.Entry]: 'Entry',
  [ExperienceLevel.Mid]: 'Mid',
  [ExperienceLevel.Senior]: 'Senior',
  [ExperienceLevel.Executive]: 'Executive',
};

export enum IndustriesType {
  AccountingFinance = 'accounting & finance',
  AdministrativeClerical = 'administrative & clerical',
  CustomerService = 'customer service',
  EducationTraining = 'education & training',
  Engineering = 'engineering',
  Healthcare = 'healthcare',
  HumanResources = 'human resources',
  InformationTechnology = 'information technology',
  Legal = 'legal',
  Management = 'management',
  MarketingCommunications = 'marketing & communications',
  Sales = 'sales',
  Science = 'science',
  SkilledTrades = 'skilled trades',
  SupplyChainLogistics = 'supply chain & logistics',
  CreativeArtsDesign = 'creative arts & design',
  RealEstate = 'real estate',
  HospitalityTourism = 'hospitality & tourism',
  ManufacturingProduction = 'manufacturing & production',
  Miscellaneous = 'miscellaneous',
}

export enum UserType {
  Seeker = 'seeker',
  Employer = 'employer',
}

export enum Levels {
  NoExperience = 'no experience',
  InternshipAndGraduate = 'internship & graduate',
  Entry = 'entry',
  Mid = 'mid',
  Senior = 'senior',
  Executive = 'executive',
}

export enum NotificationPreferences {
  APPLICATIONS = 'applications',
  JOBS = 'jobs',
  ALL = 'all',
}

export enum Currency {
  NAIRA = 'NGN',
  DOLLAR = 'USD',
}
