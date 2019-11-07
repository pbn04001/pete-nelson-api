const SKILL_TYPES = {
  LANGUAGE: 'LANGUAGE',
  UI_FRAMEWORK: 'UI_FRAMEWORK',
  UI: 'UI',
  SERVER: 'SERVER',
  DESIGN: 'DESIGN',
  DATABASE: 'DATABASE',
  TESTING: 'TESTING',
}
exports.skillTypes = SKILL_TYPES;

exports.skills = [{
  type: SKILL_TYPES.LANGUAGE,
  name: 'JavaScript'
}, {
  type: SKILL_TYPES.LANGUAGE,
  name: 'Java',
}, {
  type: SKILL_TYPES.LANGUAGE,
  name: 'Scala',
}, {
  type: SKILL_TYPES.LANGUAGE,
  name: 'Python',
}, {
  type: SKILL_TYPES.LANGUAGE,
  name: 'Swift',
}, {
  type: SKILL_TYPES.UI_FRAMEWORK,
  name: 'React/Redux',
}, {
  type: SKILL_TYPES.UI_FRAMEWORK,
  name: 'Angular',
}, {
  type: SKILL_TYPES.UI_FRAMEWORK,
  name: 'Vue',
}, {
  type: SKILL_TYPES.UI_FRAMEWORK,
  name: 'ExtJS',
}, {
  type: SKILL_TYPES.UI,
  name: 'CSS',
}, {
  type: SKILL_TYPES.UI,
  name: 'SASS',
}, {
  type: SKILL_TYPES.UI,
  name: 'PostCSS',
}, {
  type: SKILL_TYPES.UI,
  name: 'SVG',
}, {
  type: SKILL_TYPES.UI,
  name: 'HTML5',
}, {
  type: SKILL_TYPES.SERVER,
  name: 'Node',
}, {
  type: SKILL_TYPES.SERVER,
  name: 'Express',
}, {
  type: SKILL_TYPES.SERVER,
  name: 'Spring',
}, {
  type: SKILL_TYPES.SERVER,
  name: 'Rest',
  description: 'Representational State Transfer is an architectural style for distributed hypermedia systems'
}, {
  type: SKILL_TYPES.SERVER,
  name: 'Soap',
}, {
  type: SKILL_TYPES.SERVER,
  name: 'Kafka',
}, {
  type: SKILL_TYPES.SERVER,
  name: 'Spark',
}, {
  type: SKILL_TYPES.DESIGN,
  name: 'Illustrator',
}, {
  type: SKILL_TYPES.DESIGN,
  name: 'Photoshop',
}, {
  type: SKILL_TYPES.DESIGN,
  name: 'Sketch',
}, {
  type: SKILL_TYPES.DATABASE,
  name: 'Postgres',
}, {
  type: SKILL_TYPES.DATABASE,
  name: 'MySQL',
}, {
  type: SKILL_TYPES.DATABASE,
  name: 'SQL Server',
}, {
  type: SKILL_TYPES.DATABASE,
  name: 'Hadoop',
}, {
  type: SKILL_TYPES.DATABASE,
  name: 'OpenTSDB',
}, {
  type: SKILL_TYPES.TESTING,
  name: 'Enzyme',
}, {
  type: SKILL_TYPES.TESTING,
  name: 'Karma',
}, {
  type: SKILL_TYPES.TESTING,
  name: 'Chai',
}, {
  type: SKILL_TYPES.TESTING,
  name: 'Sinon',
}, {
  type: SKILL_TYPES.TESTING,
  name: 'Nightwatch',
}, {
  type: SKILL_TYPES.TESTING,
  name: 'Cucumber',
}]

exports.jobs = [{
  title: 'Staff Engineer',
  company: 'Aetna',
  location: {
    city: 'Denver',
    state: 'CO',
  },
  dates: [{
    from: {
      month: 'July',
      year: '2016',
    },
    to: null
  }],
  achievements: [
    'Currently working as a Staff Engineer to deliver advanced implementations across the web, server and ios platforms.',
    'Technical lead on agile team responsible for delivering features for a React and Angular application.',
    'Developed rest services in both Node and Java.',
    'Architected a custom CMS solution for our applications to delivery content to users in a quick, reliable and performant manner.',
    'Worked on our flag ship IOS application using Swift.',
    'Unit and integration test all applications using Enzyme, Karma, Chai and Cucumber.',
  ]
}, {
  title: 'Senior UI Engineer',
  company: 'Level 3 Communications',
  location: {
    city: 'Broomfield',
    state: 'CO',
  },
  dates: [{
    from: {
      month: 'August',
      year: '2015',
    },
    to: {
      month: 'July',
      year: '2016',
    }
  }],
  achievements: [
    'Lead UI developer on primary security threat portal. Designed and developed final solution using Illustrator, AngularJS, and Scala.',
    'Created scripts in Scala and Python for analyzing 20k network transactions a second. Used Spark and Kafka to store the resulting metrics into OpenTSDB.',
    'Built interactive charting dashboard for all metrics using D3 charts.',
    'Integration tests written for portal using Protractor.',
  ]
}, {
  title: 'Senior UI Java Developer',
  company: 'J.B. Hunt Transport',
  location: {
    city: 'Lowell',
    state: 'AR',
  },
  dates: [{
    from: {
      month: 'February',
      year: '2008',
    },
    to: {
      month: 'October',
      year: '2008',
    }
  }, {
    from: {
      month: 'August',
      year: '2009',
    },
    to: {
      month: 'August',
      year: '2015',
    }
  }],
  achievements: [
    'Lead developer on a team of 15 responsible for our flagship application "J.B. Hunt 360". used by customers for booking, tracking, and reporting on shipments. Built using ExtJS.',
    'Designed and developed 3 generations of UI component library for entire organization.',
    'Developed and maintained our public facing websites. jbhunt.com and jbhunt.jobs.',
    'Developed multiple rest and soap services used for integrating with SQLServer and DB2, as well as multiple 3rd party vendors such as SalesForce, ExactTarget, Omniture and Google.',
    'Taught several classes on the subjects of JavaScript, ExtJS and JSF.',
    'Built a custom link and email tracking system for our marketing emails.',
  ]
}, {
  title: 'Chief Technical Officer',
  company: 'FlipFire LLC',
  location: {
    city: 'Fayetteville',
    state: 'AR',
  },
  dates: [{
    from: {
      month: 'October',
      year: '2008',
    },
    to: {
      month: 'August',
      year: '2009',
    }
  }],
  achievements: [
    'Managed a team of eight employees consisting of Graphic Designers, Server / UI Developers,and System Administrators.',
    'Invented a video player allowing users to watch videos uninterrupted in same window while browsing our site. Listed as inventor for a filed patent.',
    'Developed full stack application for browsing and playing videos from our site.',
    'Designed and implemented a distributed system for receiving, rendering, and approving user submitted videos into our system.',
  ]
}, {
  title: 'Java Software Developer',
  company: 'Acxiom',
  location: {
    city: 'Fayetteville',
    state: 'AR',
  },
  dates: [{
    from: {
      month: 'May',
      year: '2006',
    },
    to: {
      month: 'February',
      year: '2008',
    }
  }],
  achievements: [
    'Responsible for design and development of JSF web application with emphasis using ajax to create fluid interface for partitioning data sets.',
    'Developed UI components to use across our applications for integrating into our backend using ajax.',
  ]
}, {
  title: 'Graphic Designer',
  company: 'Cuerdon Signs',
  location: {
    city: 'Conway',
    state: 'AR',
  },
  dates: [{
    from: {
      month: 'January',
      year: '2004',
    },
    to: {
      month: 'May',
      year: '2006',
    }
  }],
  achievements: [
    'Designed and installed signs using Corel Draw'
  ]
}, {
  title: 'Graphic Designer',
  company: 'Best Banner and Sign',
  location: {
    city: 'Rogers',
    state: 'AR',
  },
  dates: [{
    from: {
      month: 'September',
      year: '1999',
    },
    to: {
      month: 'January',
      year: '2004',
    }
  }],
  achievements: [
    'Designed and installed signs using FlexiSign.'
  ]
}]

exports.providers = [{
  id: 1,
  name: 'Sam Dude',
  location: 'Denver, CO'
}, {
  id: 2,
  name: 'Jason Gruff',
  location: 'New York, NY'
}, {
  id: 3,
  name: 'Grumpy Man',
  location: 'Cambridge, MA'
}, {
  id: 4,
  name: 'Carl Carlson',
  location: 'Key West, FL'
}]
