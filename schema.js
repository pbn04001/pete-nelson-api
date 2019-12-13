import {skillTypes} from "./data";

const jobSkills = `
enum SkillType {
    ${skillTypes.LANGUAGE}
    ${skillTypes.UI_FRAMEWORK}
    ${skillTypes.UI}
    ${skillTypes.SERVER}
    ${skillTypes.DESIGN}
    ${skillTypes.DATABASE}
    ${skillTypes.TESTING}
  }
  
  enum State {
    AR
    CO
  }
  
  type Skill {
    type: SkillType!
    name: String!
  }
  
  type Location {
    city: String!
    state: State!
  }
  
  type Date {
    month: String
    year: String
  }
  
  type DateRange {
    from: Date,
    to: Date
  }
  
  type Job {
    title: String!
    company: String!
    location: Location!
    dates: [DateRange!]!
    achievements: [String!]!
  }
`

const complex = `
    type Task {
        id: Int!
        task: String!
        status: String!
    }

    type Complex {
        name: String!
        location: String!
        tasks: [Task]
    }
`

const providerPricing = `
    type ProviderList {
    providers: [Provider!]!
    uuid: String!
  }
  
  type Provider {
    id: Int!
    name: String!
    location: String!
  }
  
  input NewProvider {
    name: String!
    location: String!
  }
  
  type ProviderPrice {
    id: Int!
    price: Float!
  }
`

export default `
  ${jobSkills}
  ${complex}
  ${providerPricing}
  type Query {
    skills(type: SkillType): [Skill!]!
    jobs(state: State): [Job!]!
    providers: ProviderList!
    providerPrices(uuid: String!): [ProviderPrice!]!
    complex: Complex!
  }
  
  type Mutation {
    addProvider(provider: NewProvider!): Provider
  }
`
