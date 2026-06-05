export interface Description {
  languageCode: string
  description: string
}

export interface BusinessId {
  value: string
  registrationDate: string
  source: string
}

export interface Name {
  name: string
  type: string
  registrationDate: string
  endDate: string | null
  version: number
  source: string
}

export interface CompanyForm {
  type: string
  descriptions: Description[]
  endDate: string | null
  version: number
  source: string
}

export interface MainBusinessLine {
  type: string
  descriptions: Description[]
  typeCodeSet: string
  registrationDate: string
  source: string
}

export interface Address {
  type: string
  street: string
  postCode: string
  postOffices: { languageCode: string; city: string; municipalityCode?: string }[]
  registrationDate: string
  source: string
  endDate: string | null
}

export interface Website {
  url: string
  registrationDate: string
  source: string
}

export interface Company {
  businessId: BusinessId
  names: Name[]
  mainBusinessLine: MainBusinessLine | null
  companyForms: CompanyForm[]
  addresses: Address[]
  website?: Website
  tradeRegisterStatus: string
  status: string
  registrationDate: string
  endDate: string | null
  lastModified?: string
}

export interface SearchResult {
  totalResults: number
  companies: Company[]
}
