export enum Status {
  PENDING = 'pending',
  REJECTED = 'rejected',
  REVIEWED = 'reviewed',
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

export enum ExperienceLevel {
  ENTRY = 'entry',
  INTERMEDIATE = 'intermediate',
  SENIOR = 'senior',
}

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
  Company = 'company',
}

export enum Levels {
  'no experience',
  'internship & graduate',
  'entry',
  'mid',
  'senior',
  'executive',
}
