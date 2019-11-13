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
  
  type Skill {
    type: SkillType!
    name: String!
    description: String
  }
  
  enum State {
    AR
    CO
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

export default `
  ${jobSkills}
  type Query {
    skills(type: SkillType): [Skill!]!
    jobs(state: State): [Job!]!
  }
`
