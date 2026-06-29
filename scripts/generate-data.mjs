/**
 * CDOT Compass — seed data generator (dev tool, not shipped in the app).
 *
 * Curated, fictional CDOT content is defined here. The script wires up all
 * cross-references (project rosters -> employee.projects, division membership,
 * etc.), validates referential integrity, and writes the JSON datasets to
 * `src/data`. The app only ever reads those JSON files.
 *
 * Run with:  node scripts/generate-data.mjs
 *
 * Determinism: no Date.now()/Math.random() — output is byte-stable.
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = resolve(__dirname, '../src/data')

/* ------------------------------------------------------------------ */
/* Departments                                                         */
/* ------------------------------------------------------------------ */

const DEPARTMENTS = [
  {
    id: 'dept-01',
    name: 'Bridge Asset Management',
    shortName: 'Bridge',
    slug: 'bridge-asset-management',
    mission: 'Keep every Colorado bridge safe, reliable, and built to last.',
    description:
      'The Bridge Asset Management division designs, inspects, rates, and maintains the thousands of state-owned bridges that carry Colorado over rivers, canyons, and interstates. The team blends structural engineering with data-driven asset management to decide where to invest for the next 50 years.',
    tags: ['Structures', 'Inspection', 'Asset Management'],
    skills: ['Structural Analysis', 'LRFD Design', 'Bridge Inspection', 'Load Rating', 'Steel & Concrete Design', 'Asset Management'],
    software: ['AASHTOWare BrDR', 'MicroStation', 'OpenBridge Modeler', 'ProjectWise'],
    careerPaths: ['Bridge Engineer I → II', 'Structural Design Engineer', 'Bridge Inspection Lead', 'Bridge Asset Manager'],
    internTasks: ['Assist with load rating calculations', 'Shadow bridge inspections in the field', 'Update bridge inventory data', 'Draft structural details in MicroStation'],
    relatedDepartments: ['materials', 'hydraulics', 'construction'],
    careerGrowth: 'Grow from design and inspection support into structural design, then into asset management and program leadership.',
  },
  {
    id: 'dept-02',
    name: 'Hydraulics',
    shortName: 'Hydraulics',
    slug: 'hydraulics',
    mission: 'Protect Colorado’s roads and bridges from the power of water.',
    description:
      'The Hydraulics division models rivers, designs culverts and storm systems, maps floodplains, and analyzes bridge scour. Their work keeps highways open and structures standing through flash floods, snowmelt, and 100-year storms.',
    tags: ['Water Resources', 'Drainage', 'Floodplains'],
    skills: ['Hydrologic Modeling', 'Hydraulic Modeling', 'Scour Analysis', 'Floodplain Mapping', 'Culvert Design', 'Stormwater'],
    software: ['HEC-RAS', 'HEC-HMS', 'HY-8', 'ArcGIS'],
    careerPaths: ['Hydraulics Engineer I → II', 'Water Resources Engineer', 'Senior Hydraulics Engineer', 'Hydraulics Program Manager'],
    internTasks: ['Build HEC-RAS models from survey data', 'Size culverts with HY-8', 'Map floodplains in GIS', 'Support scour evaluations for bridges'],
    relatedDepartments: ['environmental', 'bridge-asset-management', 'maintenance'],
    careerGrowth: 'Move from modeling support to leading hydraulic design on major river crossings and statewide drainage programs.',
  },
  {
    id: 'dept-03',
    name: 'Construction',
    shortName: 'Construction',
    slug: 'construction',
    mission: 'Turn designs into the roads and bridges Coloradans rely on.',
    description:
      'The Construction division manages CDOT projects in the field — administering contracts, inspecting work, tracking budgets and schedules, and ensuring quality from groundbreaking to ribbon-cutting on everything from rural resurfacing to billion-dollar interstates.',
    tags: ['Field Engineering', 'Project Delivery', 'Quality'],
    skills: ['Construction Management', 'Contract Administration', 'Project Controls', 'Cost Estimating', 'Inspection', 'Quality Assurance'],
    software: ['AASHTOWare Project', 'Primavera P6', 'Bluebeam Revu', 'ProjectWise'],
    careerPaths: ['Construction Engineer I → II', 'Construction Inspector', 'Project Engineer', 'Resident Engineer'],
    internTasks: ['Shadow inspectors on active sites', 'Track quantities and pay estimates', 'Review submittals in Bluebeam', 'Support project scheduling'],
    relatedDepartments: ['materials', 'bridge-asset-management', 'traffic-safety'],
    careerGrowth: 'Advance from field inspection and project controls to running entire projects as a resident engineer.',
  },
  {
    id: 'dept-04',
    name: 'Planning',
    shortName: 'Planning',
    slug: 'planning',
    mission: 'Shape the future of how Colorado moves.',
    description:
      'The Planning division develops long-range plans, corridor studies, and multimodal strategies. Combining travel data, modeling, and public engagement, the team decides which projects rise to the top and how communities stay connected.',
    tags: ['Long-Range', 'Multimodal', 'Data & Engagement'],
    skills: ['Transportation Planning', 'Travel Demand Modeling', 'Data Analysis', 'Public Engagement', 'Multimodal Planning', 'GIS'],
    software: ['TransCAD', 'ArcGIS', 'Synchro', 'Remix'],
    careerPaths: ['Planning Analyst I → II', 'Transportation Planner', 'Senior Planner', 'Planning Program Manager'],
    internTasks: ['Analyze travel and crash datasets', 'Build maps and visualizations in GIS', 'Support public meetings', 'Help draft corridor studies'],
    relatedDepartments: ['environmental', 'traffic-safety', 'applied-research'],
    careerGrowth: 'Progress from data analysis into corridor and long-range planning leadership shaping statewide policy.',
  },
  {
    id: 'dept-05',
    name: 'Environmental',
    shortName: 'Environmental',
    slug: 'environmental',
    mission: 'Build infrastructure while protecting Colorado’s land, air, and wildlife.',
    description:
      'The Environmental division guides projects through NEPA review, permitting, and compliance. From wetlands and wildlife crossings to air quality and stormwater, the team balances mobility with stewardship of the state’s natural resources.',
    tags: ['NEPA', 'Permitting', 'Stewardship'],
    skills: ['NEPA', 'Permitting', 'Wetlands Delineation', 'Wildlife Biology', 'Air Quality (AERMOD)', 'Stormwater Compliance'],
    software: ['ArcGIS', 'AERMOD', 'ECOS'],
    careerPaths: ['Environmental Engineer I → II', 'NEPA Specialist', 'Wildlife Biologist', 'Environmental Program Manager'],
    internTasks: ['Support NEPA documentation', 'Field-verify wetlands and habitat', 'Track permit conditions', 'Map resources in GIS'],
    relatedDepartments: ['hydraulics', 'planning', 'maintenance'],
    careerGrowth: 'Develop from documentation support into specialized environmental science and program management roles.',
  },
  {
    id: 'dept-06',
    name: 'Maintenance',
    shortName: 'Maintenance',
    slug: 'maintenance',
    mission: 'Keep Colorado’s highways open, safe, and in good repair year-round.',
    description:
      'The Maintenance division keeps the system running — plowing snow, mitigating avalanches and rockfall, preserving pavement, managing fleet, and maintaining drainage. Increasingly data-driven, the team decides where every maintenance dollar does the most good.',
    tags: ['Operations', 'Snow & Ice', 'Asset Care'],
    skills: ['Snow & Ice Operations', 'Avalanche Mitigation', 'Pavement Preservation', 'Fleet Management', 'Asset Management', 'Drainage Maintenance'],
    software: ['AssetWise', 'ArcGIS', 'RoadView'],
    careerPaths: ['Maintenance Technician → II', 'Avalanche Mitigation Specialist', 'Maintenance Asset Manager', 'Maintenance Superintendent'],
    internTasks: ['Inventory roadway assets in GIS', 'Analyze winter operations data', 'Support pavement preservation planning', 'Ride along with maintenance crews'],
    relatedDepartments: ['materials', 'hydraulics', 'traffic-safety'],
    careerGrowth: 'Move from operations and asset data into specialized mitigation work and maintenance leadership.',
  },
  {
    id: 'dept-07',
    name: 'Traffic & Safety',
    shortName: 'Traffic & Safety',
    slug: 'traffic-safety',
    mission: 'Use data and technology to move people safely.',
    description:
      'The Traffic & Safety division designs signals, deploys intelligent transportation systems, and runs data-driven safety programs. By studying crash patterns and modeling traffic, the team targets the improvements that save the most lives.',
    tags: ['Safety', 'Operations', 'ITS'],
    skills: ['Traffic Signal Design', 'Safety Analysis', 'Crash Data Analysis', 'ITS', 'Microsimulation', 'Signing & Striping'],
    software: ['Synchro/SimTraffic', 'VISSIM', 'HCS', 'Numetric'],
    careerPaths: ['Safety Analyst I → II', 'Traffic Operations Engineer', 'ITS Engineer', 'Traffic & Safety Program Manager'],
    internTasks: ['Analyze crash data', 'Build Synchro/VISSIM models', 'Support signal timing studies', 'Map safety projects in GIS'],
    relatedDepartments: ['applied-research', 'planning', 'maintenance'],
    careerGrowth: 'Grow from safety analysis into traffic operations, ITS deployment, and statewide safety leadership.',
  },
  {
    id: 'dept-08',
    name: 'Applied Research & Innovation',
    shortName: 'Applied Research',
    slug: 'applied-research',
    mission: 'Pilot the innovations that become tomorrow’s standards.',
    description:
      'The Applied Research & Innovation branch tests new ideas — connected vehicles, advanced materials, data science, and emerging technology. The team partners across divisions to turn research questions into evidence that improves how CDOT builds and operates.',
    tags: ['Innovation', 'Data Science', 'Research'],
    skills: ['Research Design', 'Data Analysis', 'Statistics', 'Machine Learning', 'Python', 'Pavement Modeling'],
    software: ['Python', 'R', 'Power BI', 'MATLAB'],
    careerPaths: ['Research Analyst I → II', 'Data Scientist', 'Research Engineer', 'Applied Research Manager'],
    internTasks: ['Clean and analyze research datasets', 'Build dashboards in Power BI', 'Support field pilots', 'Conduct literature reviews'],
    relatedDepartments: ['traffic-safety', 'planning', 'materials'],
    careerGrowth: 'Advance from data analysis into leading research studies and statewide innovation initiatives.',
  },
  {
    id: 'dept-09',
    name: 'Materials & Geotechnical',
    shortName: 'Materials',
    slug: 'materials',
    mission: 'Make sure what Colorado builds on, and with, will last.',
    description:
      'The Materials & Geotechnical division designs pavements, tests construction materials, and investigates the soils and slopes beneath every project. From mix designs to rockfall mitigation, the team safeguards quality and stability.',
    tags: ['Geotechnical', 'Pavement', 'Lab & Field'],
    skills: ['Geotechnical Engineering', 'Pavement Design', 'Materials Testing', 'Soils & Foundations', 'Rockfall Mitigation', 'QA/QC'],
    software: ['gINT', 'LIMS', 'PaveDAT'],
    careerPaths: ['Materials Technician → II', 'Pavement Materials Engineer', 'Geotechnical Engineer', 'Geotechnical Program Manager'],
    internTasks: ['Run material tests in the lab', 'Log soil borings with gINT', 'Support pavement mix designs', 'Assist with rockfall assessments'],
    relatedDepartments: ['construction', 'bridge-asset-management', 'maintenance'],
    careerGrowth: 'Progress from lab and field testing into pavement and geotechnical design, then program leadership.',
  },
  {
    id: 'dept-10',
    name: 'Aeronautics',
    shortName: 'Aviation',
    slug: 'aviation',
    mission: 'Keep Colorado connected by air, from the plains to the peaks.',
    description:
      'The Division of Aeronautics supports Colorado’s 70+ public-use airports with planning, pavement and drainage design, grant administration, and aviation system strategy — keeping mountain and rural communities linked to the wider world.',
    tags: ['Airports', 'Planning', 'Grants'],
    skills: ['Airport Planning', 'Pavement Management', 'Grant Administration (FAA)', 'Drainage', 'Aviation Safety', 'GIS'],
    software: ['PAVEAIR', 'ArcGIS', 'AutoCAD'],
    careerPaths: ['Aviation Engineer I → II', 'Aviation Planner', 'Airport Engineer', 'Aeronautics Division Manager'],
    internTasks: ['Support airport layout plans', 'Analyze pavement condition data', 'Help administer FAA grants', 'Map airport assets in GIS'],
    relatedDepartments: ['materials', 'hydraulics', 'planning'],
    careerGrowth: 'Move from airport design support into aviation planning, engineering, and division leadership.',
  },
]

// Curated, verified Unsplash transportation photos (each id confirmed to
// return a real landscape image). Grouped by theme; mapped to divisions below.
const UNSPLASH = {
  highway: ['1542242476-5a3565835a38', '1494783367193-149034c05e8f', '1486673748761-a8d18475c757', '1478059299873-f047d8c5fe1a', '1477951233099-d2c5fbd878ee', '1471958680802-1345a694ba6d'],
  bridge: ['1529926691761-20fb82067c71', '1522775559573-2f76d540932b', '1515674744565-0d7112cd179a', '1506946526854-9aad1ec915cb', '1536099629323-44806c1ea264'],
  construction: ['1503708928676-1cb796a0891e', '1575281923032-f40d94ef6160', '1517089596392-fb9a9033e05b', '1529792083865-d23889753466', '1583024011792-b165975b52f5'],
  airport: ['1556388158-158ea5ccacbd', '1503412345334-7d4ca6c34f61', '1638555063519-d009e6f3b28b', '1572198404182-2c115d89fb26', '1619659085985-f51a00f0160a'],
  river: ['1597758812648-b474225b9cbb', '1636589714835-f8d5aaaca493', '1507274274451-b203cf128a8f', '1648691963120-0263f3d7d8e0'],
  mountain: ['1679163255376-b7767bd3bac5', '1653688107875-38c6dfe0e59b', '1683089884357-aaa2063966a2', '1657570391450-6095159087eb'],
  snow: ['1518203441944-e9578e4b1635', '1612770132420-297b1e77f2b2', '1546480771-43932e42a04d', '1615169279328-dd4d50d5a700'],
  tech: ['1550751827-4bd374c3f58b', '1581091226825-a6a2a5aee158', '1581092160562-40aa08e78837', '1581092163144-b7ae3c00adbc'],
}

const DIVISION_THEME = {
  'bridge-asset-management': 'bridge',
  hydraulics: 'river',
  construction: 'construction',
  planning: 'highway',
  environmental: 'mountain',
  maintenance: 'snow',
  'traffic-safety': 'highway',
  'applied-research': 'tech',
  materials: 'construction',
  aviation: 'airport',
}

// Images are bundled locally under src/assets/images/photos/<id>.jpg and
// resolved to hashed URLs at load time in utils/data.ts. The JSON stores just
// the filename so the dataset stays portable.
const photoFile = (id) => `${id}.jpg`

/** Deterministic, theme-mapped photo for a division slug (varied by index). */
const themeImage = (slug, idx) => {
  const pool = UNSPLASH[DIVISION_THEME[slug] ?? 'highway']
  return photoFile(pool[idx % pool.length])
}

const DEGREE_FIELD = {
  'bridge-asset-management': 'Civil Engineering (Structures)',
  hydraulics: 'Civil Engineering (Water Resources)',
  construction: 'Civil Engineering',
  planning: 'Urban & Regional Planning',
  environmental: 'Environmental Engineering',
  maintenance: 'Civil Engineering',
  'traffic-safety': 'Transportation Engineering',
  'applied-research': 'Civil Engineering',
  materials: 'Civil Engineering (Geotechnical)',
  aviation: 'Aviation & Civil Engineering',
}

/* ------------------------------------------------------------------ */
/* Employees (curated core fields; arrays + flags assembled below)     */
/* ------------------------------------------------------------------ */

const EMP = [
  // Bridge Asset Management
  { name: 'Daniel Whitaker', pron: 'he/him', g: 'men', p: 12, title: 'Bridge Asset Manager', div: 'bridge-asset-management', yrs: 14, loc: 'Denver', school: 'Colorado School of Mines', skills: ['Asset Management', 'Load Rating', 'AASHTOWare BrDR', 'Structural Analysis'], bio: 'Daniel oversees the health of Colorado’s state-owned bridges, turning inspection data into long-term investment plans.', fav: 'Knowing the bridges I help maintain carry millions of people safely every year.', adv: 'Learn to read a bridge like a story — every crack and joint is telling you something.', fun: 'Has photographed over 300 Colorado bridges for fun.', favProj: 'Statewide Bridge Asset Management Program' },
  { name: 'Priya Nair', pron: 'she/her', g: 'women', p: 32, title: 'Senior Bridge Engineer', div: 'bridge-asset-management', yrs: 11, loc: 'Lakewood', school: 'University of Colorado Denver', skills: ['LRFD Design', 'Steel & Concrete Design', 'MicroStation', 'Structural Analysis'], bio: 'Priya designs and rehabilitates bridge structures across the I-70 mountain corridor.', fav: 'The moment a design leaves the screen and becomes steel and concrete.', adv: 'Master the fundamentals of statics — everything else builds on them.', fun: 'Plays cello in a community orchestra.', favProj: 'Floyd Hill to Veterans Memorial Tunnels Improvements' },
  { name: 'Marcus Bell', pron: 'he/him', g: 'men', p: 45, title: 'Bridge Inspection Lead', div: 'bridge-asset-management', yrs: 16, loc: 'Grand Junction', school: 'Colorado Mesa University', skills: ['Bridge Inspection', 'Load Rating', 'Asset Management', 'Rope Access'], bio: 'Marcus leads the crews that climb, rappel, and rate bridges in every corner of the state.', fav: 'Working outdoors and solving puzzles that keep people safe.', adv: 'Get into the field early; you learn more under a bridge than in any classroom.', fun: 'Certified rope-access technician and avid rock climber.', favProj: 'Colorado Bridge Inspection & Load Rating Initiative' },
  { name: 'Hannah Brooks', pron: 'she/her', g: 'women', p: 5, title: 'Bridge Engineer I', div: 'bridge-asset-management', yrs: 3, loc: 'Denver', school: 'Colorado State University', skills: ['Structural Analysis', 'LRFD Design', 'MicroStation', 'AASHTOWare BrDR'], bio: 'Hannah is an early-career structural engineer focused on bridge load ratings and rehab design.', fav: 'Learning something new from senior engineers almost every day.', adv: 'Ask questions relentlessly — curiosity is a skill.', fun: 'Builds intricate model bridges out of popsicle sticks.', favProj: 'South Platte River Bridge Scour Countermeasures' },

  // Hydraulics
  { name: 'Elena Vargas', pron: 'she/her', g: 'women', p: 25, title: 'Hydraulics Program Manager', div: 'hydraulics', yrs: 15, loc: 'Pueblo', school: 'Colorado State University Pueblo', skills: ['HEC-RAS', 'Floodplain Mapping', 'Scour Analysis', 'Stormwater'], bio: 'Elena leads CDOT’s hydraulics program, protecting roads and bridges from Colorado’s flash floods.', fav: 'Designing infrastructure that stands up to nature at its most extreme.', adv: 'Respect water — it always finds the weakness in your design.', fun: 'Whitewater kayaks the rivers she helps model.', favProj: 'Statewide Culvert & Drainage Inventory (GIS)' },
  { name: 'Tom Castellano', pron: 'he/him', g: 'men', p: 51, title: 'Senior Hydraulics Engineer', div: 'hydraulics', yrs: 12, loc: 'Glenwood Springs', school: 'University of Colorado Boulder', skills: ['HEC-RAS', 'Hydrologic Modeling', 'Culvert Design', 'HY-8'], bio: 'Tom models rivers and designs the culverts and bridges that cross them.', fav: 'Seeing a culvert I designed handle a 100-year storm without a hitch.', adv: 'Field-verify everything; the real world rarely matches the plan set.', fun: 'Fly-fishing guide on weekends.', favProj: 'I-70 Glenwood Canyon Resiliency & Rockfall Mitigation' },
  { name: 'Aisha Rahman', pron: 'she/her', g: 'women', p: 16, title: 'Water Resources Engineer', div: 'hydraulics', yrs: 7, loc: 'Fort Collins', school: 'Colorado State University', skills: ['Scour Analysis', 'Floodplain Mapping', 'GIS', 'Stormwater'], bio: 'Aisha specializes in bridge scour and floodplain analysis for major river crossings.', fav: 'The detective work of figuring out how water moves around a structure.', adv: 'Learn GIS early — spatial thinking sets great water engineers apart.', fun: 'Maintains a backyard rain-garden experiment.', favProj: 'South Platte River Bridge Scour Countermeasures' },
  { name: 'Kevin O’Donnell', pron: 'he/him', g: 'men', p: 60, title: 'Hydraulics Engineer I', div: 'hydraulics', yrs: 2, loc: 'Denver', school: 'Colorado School of Mines', skills: ['HEC-RAS', 'Culvert Design', 'HY-8', 'GIS'], bio: 'Kevin supports drainage design and floodplain studies across the Front Range.', fav: 'Turning messy field data into a clean, working model.', adv: 'Double-check your units — hydrology is unforgiving.', fun: 'Storm-chases supercells across the eastern plains.', favProj: 'Statewide Stormwater MS4 Compliance' },

  // Construction
  { name: 'Robert Tanaka', pron: 'he/him', g: 'men', p: 33, title: 'Resident Engineer', div: 'construction', yrs: 18, loc: 'Colorado Springs', school: 'University of Colorado Boulder', skills: ['Construction Management', 'Contract Administration', 'Scheduling (P6)', 'Quality Assurance'], bio: 'Robert runs major construction projects in the field, from groundbreaking to ribbon-cutting.', fav: 'Standing on a finished interchange that started as lines on paper.', adv: 'Build relationships with your contractors — trust moves projects.', fun: 'Builds his own furniture in a home wood shop.', favProj: 'I-25 South Gap Widening (Monument to Castle Rock)' },
  { name: 'Sofia Mendez', pron: 'she/her', g: 'women', p: 9, title: 'Construction Project Engineer', div: 'construction', yrs: 9, loc: 'Aurora', school: 'University of Colorado Denver', skills: ['Project Controls', 'Cost Estimating', 'Bluebeam Revu', 'Inspection'], bio: 'Sofia manages budgets, schedules, and quality on Front Range construction projects.', fav: 'Solving the daily puzzle of keeping a project on time and on budget.', adv: 'Document everything — your notes are your best memory and defense.', fun: 'Teaches salsa dance on weeknights.', favProj: 'Central 70 Project (Denver)' },
  { name: 'James Okoro', pron: 'he/him', g: 'men', p: 52, title: 'Construction Inspector', div: 'construction', yrs: 6, loc: 'Greeley', school: 'University of Northern Colorado', skills: ['Inspection', 'Quality Assurance', 'Contract Administration', 'Materials Testing'], bio: 'James verifies that what gets built matches the plans and specs, one pour at a time.', fav: 'Catching the small things before they become big problems.', adv: 'Learn to read plans fluently — it is the language of the field.', fun: 'Coaches a youth soccer team.', favProj: 'North I-25 Express Lanes (Berthoud to Fort Collins)' },
  { name: 'Megan Foster', pron: 'she/her', g: 'women', p: 20, title: 'Construction Engineer I', div: 'construction', yrs: 3, loc: 'Durango', school: 'Colorado Mesa University', skills: ['Scheduling (P6)', 'Cost Estimating', 'Bluebeam Revu', 'Inspection'], bio: 'Megan supports field engineering and project controls on rural highway projects.', fav: 'Being outside and seeing tangible progress every single day.', adv: 'Say yes to field assignments — they accelerate your learning.', fun: 'Through-hiked the 486-mile Colorado Trail.', favProj: 'US 550/US 160 Connection (Durango)' },

  // Planning
  { name: 'David Kim', pron: 'he/him', g: 'men', p: 14, title: 'Transportation Planning Manager', div: 'planning', yrs: 13, loc: 'Denver', school: 'University of Denver', skills: ['Transportation Planning', 'Travel Demand Modeling', 'Public Engagement', 'Multimodal Planning'], bio: 'David leads long-range and corridor planning that shapes Colorado’s transportation future.', fav: 'Connecting community voices to real infrastructure decisions.', adv: 'Planning is half data, half listening — get good at both.', fun: 'Collects vintage transit maps.', favProj: 'Front Range Passenger Rail Planning Study' },
  { name: 'Rachel Green', pron: 'she/her', g: 'women', p: 21, title: 'Senior Transportation Planner', div: 'planning', yrs: 10, loc: 'Lakewood', school: 'University of Colorado Boulder', skills: ['GIS', 'Data Analysis', 'TransCAD', 'NEPA'], bio: 'Rachel turns travel data into corridor plans and multimodal strategies.', fav: 'Finding the story hidden in a messy dataset.', adv: 'Learn to visualize data — a good map wins more arguments than a spreadsheet.', fun: 'Bike-commutes year-round, even through snow.', favProj: 'SH 9 Frisco to Breckenridge Multimodal' },
  { name: 'Anthony Russo', pron: 'he/him', g: 'men', p: 53, title: 'Multimodal Planner', div: 'planning', yrs: 7, loc: 'Fort Collins', school: 'Colorado State University', skills: ['Multimodal Planning', 'Public Engagement', 'GIS', 'Transportation Planning'], bio: 'Anthony plans bike, pedestrian, and transit improvements across mountain communities.', fav: 'Designing streets that work for people, not just cars.', adv: 'Spend time in the places you plan for — context is everything.', fun: 'Competitive gravel cyclist.', favProj: 'SH 9 Frisco to Breckenridge Multimodal' },
  { name: 'Linda Tran', pron: 'she/her', g: 'women', p: 30, title: 'Planning Analyst I', div: 'planning', yrs: 2, loc: 'Denver', school: 'University of Colorado Denver', skills: ['Data Analysis', 'GIS', 'Travel Demand Modeling', 'Public Engagement'], bio: 'Linda supports data analysis and public engagement for statewide planning studies.', fav: 'Helping people understand complex projects through clear visuals.', adv: 'Get comfortable with ambiguity — planning rarely has one right answer.', fun: 'Hand-letters event posters as a hobby.', favProj: 'Front Range Passenger Rail Planning Study' },

  // Environmental
  { name: 'Sarah Chen', pron: 'she/her', g: 'women', p: 1, title: 'Environmental Program Manager', div: 'environmental', yrs: 14, loc: 'Denver', school: 'Colorado State University', skills: ['NEPA', 'Permitting', 'Section 404', 'Wildlife Biology'], bio: 'Sarah guides projects through environmental review, balancing infrastructure and ecology.', fav: 'Finding solutions that move projects forward and protect Colorado’s landscapes.', adv: 'Get involved early — environmental issues are cheapest to solve at the start.', fun: 'Volunteer raptor monitor.', favProj: 'Wildlife Connectivity & Fencing Program (US 285)' },
  { name: 'Michael Berg', pron: 'he/him', g: 'men', p: 34, title: 'NEPA Specialist', div: 'environmental', yrs: 9, loc: 'Golden', school: 'Colorado School of Mines', skills: ['NEPA', 'Air Quality (AERMOD)', 'Permitting', 'GIS'], bio: 'Michael prepares the environmental documents that keep projects compliant and on schedule.', fav: 'Untangling regulations so engineers can build.', adv: 'Writing is an engineering skill — learn to make complex things clear.', fun: 'Amateur mycologist who forages mushrooms.', favProj: 'Vail Pass Auxiliary Lanes & Wildlife Crossings' },
  { name: 'Gabriela Santos', pron: 'she/her', g: 'women', p: 24, title: 'Wildlife Biologist', div: 'environmental', yrs: 6, loc: 'Durango', school: 'Colorado Mesa University', skills: ['Wildlife Biology', 'Wetlands Delineation', 'GIS', 'Permitting'], bio: 'Gabriela designs wildlife crossings and connectivity solutions for highway projects.', fav: 'Watching trail-cam footage of animals using a crossing we designed.', adv: 'Pair your science with engineering literacy — you will be unstoppable.', fun: 'Has rehabilitated injured owls.', favProj: 'Wildlife Connectivity & Fencing Program (US 285)' },
  { name: 'Eric Larsson', pron: 'he/him', g: 'men', p: 54, title: 'Environmental Engineer I', div: 'environmental', yrs: 3, loc: 'Fort Collins', school: 'Colorado State University', skills: ['Stormwater Compliance', 'NEPA', 'GIS', 'Permitting'], bio: 'Eric supports stormwater compliance and environmental permitting statewide.', fav: 'Doing work that visibly protects rivers and wildlife.', adv: 'Learn the permits cold — they shape every project schedule.', fun: 'Competitive birder with a 300-species life list.', favProj: 'Statewide Stormwater MS4 Compliance' },

  // Maintenance
  { name: 'Frank DeLuca', pron: 'he/him', g: 'men', p: 40, title: 'Maintenance Superintendent', div: 'maintenance', yrs: 20, loc: 'Glenwood Springs', school: 'Colorado Mesa University', skills: ['Snow & Ice Operations', 'Avalanche Mitigation', 'Fleet Management', 'Asset Management'], bio: 'Frank leads the crews that keep mountain highways open through Colorado winters.', fav: 'Knowing my team keeps people moving safely in brutal conditions.', adv: 'Respect the people in the field — they know things no manual teaches.', fun: 'Former backcountry ski patroller.', favProj: 'I-70 Glenwood Canyon Resiliency & Rockfall Mitigation' },
  { name: 'Nicole Adams', pron: 'she/her', g: 'women', p: 26, title: 'Maintenance Asset Manager', div: 'maintenance', yrs: 11, loc: 'Denver', school: 'University of Colorado Denver', skills: ['Asset Management', 'GIS', 'Pavement Preservation', 'Drainage Maintenance'], bio: 'Nicole uses data to decide where every maintenance dollar does the most good.', fav: 'Turning a flood of asset data into a clear plan of action.', adv: 'Data tells you where; the field tells you why — use both.', fun: 'Runs mountain ultramarathons.', favProj: 'Statewide Culvert & Drainage Inventory (GIS)' },
  { name: 'Carlos Jimenez', pron: 'he/him', g: 'men', p: 55, title: 'Avalanche Mitigation Specialist', div: 'maintenance', yrs: 8, loc: 'Durango', school: 'Colorado Mesa University', skills: ['Avalanche Mitigation', 'Snow & Ice Operations', 'GIS', 'Work Zone Safety'], bio: 'Carlos forecasts and mitigates avalanche hazards above Colorado’s mountain passes.', fav: 'Reading the snowpack and making the call that keeps a pass safe.', adv: 'In the mountains, humility is a survival skill.', fun: 'Certified avalanche forecaster and splitboarder.', favProj: 'Avalanche Forecasting & Mitigation (CAIC partnership)' },
  { name: 'Tasha Williams', pron: 'she/her', g: 'women', p: 28, title: 'Maintenance Technician II', div: 'maintenance', yrs: 5, loc: 'Sterling', school: 'University of Northern Colorado', skills: ['Snow & Ice Operations', 'Fleet Management', 'Drainage Maintenance', 'Work Zone Safety'], bio: 'Tasha keeps the eastern plains highways plowed, patched, and safe.', fav: 'The variety — no two days on the road are the same.', adv: 'Master your equipment; it is your most important teammate.', fun: 'Restores vintage pickup trucks.', favProj: 'Fleet & Maintenance Facility Modernization' },

  // Traffic & Safety
  { name: 'Brian Schultz', pron: 'he/him', g: 'men', p: 36, title: 'Traffic & Safety Program Manager', div: 'traffic-safety', yrs: 15, loc: 'Denver', school: 'University of Colorado Boulder', skills: ['Safety Analysis', 'Crash Data Analysis', 'ITS', 'Traffic Signal Design'], bio: 'Brian leads data-driven safety programs aimed at reducing serious crashes statewide.', fav: 'Knowing our work measurably saves lives.', adv: 'Let the crash data, not assumptions, point you to the fix.', fun: 'Volunteer firefighter.', favProj: 'Rural Highway Safety & Rumble Strip Deployment' },
  { name: 'Jasmine Carter', pron: 'she/her', g: 'women', p: 23, title: 'Traffic Operations Engineer', div: 'traffic-safety', yrs: 9, loc: 'Aurora', school: 'University of Colorado Denver', skills: ['Synchro/SimTraffic', 'VISSIM', 'Traffic Signal Design', 'HCS'], bio: 'Jasmine designs and retimes traffic signals to keep corridors flowing.', fav: 'Watching a corridor I retimed clear up at rush hour.', adv: 'Simulate before you build — models catch expensive mistakes.', fun: 'Competitive escape-room enthusiast.', favProj: 'Statewide Traffic Signal Retiming Program' },
  { name: 'Derek Nguyen', pron: 'he/him', g: 'men', p: 56, title: 'ITS Engineer', div: 'traffic-safety', yrs: 7, loc: 'Fort Collins', school: 'Colorado State University', skills: ['ITS', 'Crash Data Analysis', 'Traffic Signal Design', 'Safety Analysis'], bio: 'Derek deploys intelligent transportation systems on Colorado’s busiest corridors.', fav: 'Bringing new technology to roads built decades ago.', adv: 'Stay curious about tech — this field reinvents itself constantly.', fun: 'Builds home-automation gadgets for fun.', favProj: 'I-70 Mountain Corridor Variable Speed Limits' },
  { name: 'Olivia Park', pron: 'she/her', g: 'women', p: 44, title: 'Safety Analyst I', div: 'traffic-safety', yrs: 3, loc: 'Denver', school: 'University of Denver', skills: ['Crash Data Analysis', 'Safety Analysis', 'ITS', 'Signing & Striping'], bio: 'Olivia analyzes crash patterns to prioritize the state’s next safety improvements.', fav: 'Finding the pattern that explains a dangerous intersection.', adv: 'Statistics is a superpower — invest in it.', fun: 'Plays on a competitive trivia team.', favProj: 'Statewide Traffic Signal Retiming Program' },

  // Applied Research & Innovation
  { name: 'Alan Pierce', pron: 'he/him', g: 'men', p: 39, title: 'Applied Research Manager', div: 'applied-research', yrs: 17, loc: 'Lakewood', school: 'University of Colorado Boulder', skills: ['Research Design', 'Statistics', 'Machine Learning', 'Pavement Modeling'], bio: 'Alan runs CDOT’s research program, piloting the innovations that become tomorrow’s standards.', fav: 'Testing bold ideas before anyone else gets to.', adv: 'Be rigorous and brave — good research needs both.', fun: 'Holds two patents in sensor technology.', favProj: 'Connected & Automated Vehicle Pilot (RoadX)' },
  { name: 'Maya Patel', pron: 'she/her', g: 'women', p: 11, title: 'Data Scientist', div: 'applied-research', yrs: 8, loc: 'Denver', school: 'Colorado School of Mines', skills: ['Python', 'Machine Learning', 'Data Analysis', 'Power BI'], bio: 'Maya builds the models and dashboards that turn CDOT’s data into decisions.', fav: 'The first time a model predicts something real and gets it right.', adv: 'Learn to tell stories with data — models mean nothing if no one acts on them.', fun: 'Competes in data-science hackathons.', favProj: 'Statewide Traffic Signal Retiming Program' },
  { name: 'Jordan Mitchell', pron: 'they/them', g: 'men', p: 61, title: 'Research Engineer', div: 'applied-research', yrs: 6, loc: 'Fort Collins', school: 'Colorado State University', skills: ['Research Design', 'Pavement Modeling', 'Statistics', 'Python'], bio: 'Jordan investigates new pavement materials and construction methods in the field and lab.', fav: 'Bridging the gap between a lab result and a real road.', adv: 'Question the standard — every spec was once an experiment.', fun: 'Home-roasts coffee and logs every batch as data.', favProj: 'Pavement Management & Recycled Materials Study' },
  { name: 'Emily Zhao', pron: 'she/her', g: 'women', p: 31, title: 'Research Analyst I', div: 'applied-research', yrs: 2, loc: 'Denver', school: 'University of Colorado Denver', skills: ['Data Analysis', 'Python', 'R', 'Power BI'], bio: 'Emily supports research projects with data analysis, visualization, and literature review.', fav: 'Getting to learn a little about every part of CDOT.', adv: 'Build a portfolio of small projects — proof beats promises.', fun: 'Makes generative art with code.', favProj: 'Connected & Automated Vehicle Pilot (RoadX)' },

  // Materials & Geotechnical
  { name: 'Greg Halvorsen', pron: 'he/him', g: 'men', p: 48, title: 'Geotechnical Program Manager', div: 'materials', yrs: 16, loc: 'Golden', school: 'Colorado School of Mines', skills: ['Geotechnical Engineering', 'Rockfall Mitigation', 'Soils & Foundations', 'QA/QC'], bio: 'Greg leads the geotechnical team tackling Colorado’s landslides, rockfall, and foundations.', fav: 'Outsmarting a mountain that does not want a road on it.', adv: 'Get your boots muddy — geotech is learned in the field.', fun: 'Amateur geologist who hunts for fossils.', favProj: 'Wolf Creek Pass Geohazard & Avalanche Mitigation' },
  { name: 'Diana Flores', pron: 'she/her', g: 'women', p: 19, title: 'Pavement Materials Engineer', div: 'materials', yrs: 10, loc: 'Pueblo', school: 'Colorado State University Pueblo', skills: ['Pavement Design', 'Materials Testing', 'LIMS', 'QA/QC'], bio: 'Diana designs pavements and tests the materials that make Colorado’s roads last.', fav: 'Knowing the mix designs I approve will ride smooth for decades.', adv: 'Sweat the details — materials fail at the margins.', fun: 'Bakes competition-level sourdough.', favProj: 'Pavement Management & Recycled Materials Study' },
  { name: 'Sam Whitehorse', pron: 'he/him', g: 'men', p: 57, title: 'Geotechnical Engineer', div: 'materials', yrs: 7, loc: 'Durango', school: 'Colorado Mesa University', skills: ['Soils & Foundations', 'Rockfall Mitigation', 'gINT', 'Geotechnical Engineering'], bio: 'Sam investigates soils and slopes for bridges, walls, and mountain corridors.', fav: 'Drilling into a slope and finally understanding what is going on underground.', adv: 'Learn to log a boring well — it is the foundation of everything geotech.', fun: 'Volunteers on trail-building crews.', favProj: 'US 550/US 160 Connection (Durango)' },
  { name: 'Beth Coleman', pron: 'she/her', g: 'women', p: 47, title: 'Materials Lab Technician II', div: 'materials', yrs: 5, loc: 'Denver', school: 'Metropolitan State University of Denver', skills: ['Materials Testing', 'LIMS', 'QA/QC', 'Pavement Design'], bio: 'Beth runs the lab tests that decide whether materials make it onto Colorado’s roads.', fav: 'The precision — good testing is part science, part craft.', adv: 'Respect the procedure; consistency is what makes data trustworthy.', fun: 'Pottery hobbyist (also a kind of materials testing).', favProj: 'US 50 Corridor Resurfacing & Safety (Pueblo)' },

  // Aeronautics
  { name: 'Joan Reyes', pron: 'she/her', g: 'women', p: 18, title: 'Aeronautics Division Manager', div: 'aviation', yrs: 19, loc: 'Denver', school: 'University of Denver', skills: ['Airport Planning', 'Grant Administration (FAA)', 'Aviation Safety', 'Aviation System Planning'], bio: 'Joan leads Colorado’s aeronautics division, supporting the state’s 70+ public-use airports.', fav: 'Helping small mountain communities stay connected by air.', adv: 'See the whole system — aviation is a network, not a list of airports.', fun: 'Licensed private pilot.', favProj: 'Statewide Aviation System Plan Update' },
  { name: 'Patrick Mulhern', pron: 'he/him', g: 'men', p: 58, title: 'Airport Engineer', div: 'aviation', yrs: 12, loc: 'Grand Junction', school: 'Colorado Mesa University', skills: ['Pavement Management', 'Airport Planning', 'Drainage', 'CAD'], bio: 'Patrick designs runway, taxiway, and drainage improvements for airports across the Western Slope.', fav: 'Designing pavement that handles both jets and harsh mountain weather.', adv: 'Learn the FAA standards deeply — they govern everything you design.', fun: 'Restores and flies vintage gliders.', favProj: 'Colorado Airport Pavement & Drainage Program' },
  { name: 'Wendy Cho', pron: 'she/her', g: 'women', p: 22, title: 'Aviation Planner', div: 'aviation', yrs: 7, loc: 'Colorado Springs', school: 'University of Denver', skills: ['Airport Planning', 'GIS', 'Grant Administration (FAA)', 'Aviation System Planning'], bio: 'Wendy develops airport layout plans and statewide aviation studies.', fav: 'Mapping out how an airport will grow over the next 20 years.', adv: 'Relationships matter — aviation is a small, connected world.', fun: 'Plane-spotter with a photo log of 200+ aircraft.', favProj: 'Statewide Aviation System Plan Update' },
  { name: 'Tyler Brooks', pron: 'he/him', g: 'men', p: 59, title: 'Aviation Engineer I', div: 'aviation', yrs: 3, loc: 'Denver', school: 'Colorado School of Mines', skills: ['CAD', 'Pavement Management', 'Drainage', 'Airport Planning'], bio: 'Tyler supports airport pavement design and FAA grant projects statewide.', fav: 'Getting to work on something that literally helps people take flight.', adv: 'Be the person who follows through — reliability gets you noticed.', fun: 'Building a flight simulator in his garage.', favProj: 'Mountain Airport Weather & NAVAID Modernization' },
]

/* ------------------------------------------------------------------ */
/* Projects (engineers assembled below)                                */
/* ------------------------------------------------------------------ */

const PROJECTS = [
  { title: 'Floyd Hill to Veterans Memorial Tunnels Improvements', summary: 'A multi-year I-70 mountain corridor rebuild adding capacity, new bridges, and safety upgrades.', leadDivision: 'construction', divisions: ['construction', 'bridge-asset-management', 'hydraulics', 'environmental', 'traffic-safety'], status: 'Active', phase: 'Construction', tags: ['Interstate', 'Mountain Corridor', 'Bridges'], software: ['AASHTOWare Project', 'MicroStation', 'HEC-RAS', 'ProjectWise'], relatedDepartments: ['materials', 'planning'], duration: '2022 – 2028', location: 'I-70, Clear Creek County', startYear: 2022 },
  { title: 'I-70 Glenwood Canyon Resiliency & Rockfall Mitigation', summary: 'Hardening one of the most scenic and vulnerable interstates against rockfall, fire, and flood.', leadDivision: 'maintenance', divisions: ['maintenance', 'materials', 'hydraulics', 'environmental'], status: 'Active', phase: 'Maintenance', tags: ['Resiliency', 'Rockfall', 'Drainage'], software: ['AssetWise', 'gINT', 'HEC-RAS', 'ArcGIS'], relatedDepartments: ['construction'], duration: '2021 – Ongoing', location: 'I-70, Glenwood Canyon', startYear: 2021 },
  { title: 'I-25 South Gap Widening (Monument to Castle Rock)', summary: 'An 18-mile widening and express-lane project closing the gap on Colorado’s busiest interstate.', leadDivision: 'construction', divisions: ['construction', 'planning', 'traffic-safety', 'bridge-asset-management'], status: 'Completed', phase: 'Completed', tags: ['Interstate', 'Widening', 'Express Lanes'], software: ['AASHTOWare Project', 'Primavera P6', 'Synchro', 'MicroStation'], relatedDepartments: ['materials', 'environmental'], duration: '2018 – 2022', location: 'I-25, Douglas County', startYear: 2018 },
  { title: 'US 550/US 160 Connection (Durango)', summary: 'A new interchange and realignment connecting two key southwest Colorado highways.', leadDivision: 'construction', divisions: ['construction', 'bridge-asset-management', 'environmental', 'materials'], status: 'Active', phase: 'Construction', tags: ['Interchange', 'Bridges', 'Rural'], software: ['AASHTOWare Project', 'MicroStation', 'gINT', 'ProjectWise'], relatedDepartments: ['hydraulics'], duration: '2020 – 2027', location: 'US 550/160, La Plata County', startYear: 2020 },
  { title: 'Central 70 Project (Denver)', summary: 'A landmark urban interstate rebuild that lowered the highway and capped it with a park.', leadDivision: 'construction', divisions: ['construction', 'bridge-asset-management', 'environmental', 'traffic-safety'], status: 'Completed', phase: 'Completed', tags: ['Interstate', 'Urban', 'Lowered Highway'], software: ['AASHTOWare Project', 'Primavera P6', 'MicroStation', 'AERMOD'], relatedDepartments: ['planning', 'materials'], duration: '2018 – 2022', location: 'I-70, Denver', startYear: 2018 },
  { title: 'North I-25 Express Lanes (Berthoud to Fort Collins)', summary: 'New express lanes, bridges, and transit slip-ramps for the growing northern Front Range.', leadDivision: 'planning', divisions: ['planning', 'construction', 'traffic-safety', 'bridge-asset-management'], status: 'Active', phase: 'Construction', tags: ['Express Lanes', 'Multimodal', 'Interstate'], software: ['TransCAD', 'AASHTOWare Project', 'Synchro', 'MicroStation'], relatedDepartments: ['environmental'], duration: '2019 – 2026', location: 'I-25, Larimer & Weld', startYear: 2019 },
  { title: 'Vail Pass Auxiliary Lanes & Wildlife Crossings', summary: 'Safety lanes and wildlife crossings on a treacherous, ecologically sensitive mountain pass.', leadDivision: 'environmental', divisions: ['environmental', 'construction', 'bridge-asset-management', 'planning'], status: 'Active', phase: 'Design', tags: ['Wildlife Crossings', 'Safety', 'Mountain'], software: ['ArcGIS', 'MicroStation', 'AERMOD', 'AASHTOWare Project'], relatedDepartments: ['maintenance'], duration: '2021 – 2027', location: 'I-70, Vail Pass', startYear: 2021 },
  { title: 'Wolf Creek Pass Geohazard & Avalanche Mitigation', summary: 'Stabilizing slopes and reducing avalanche risk on a steep, remote mountain highway.', leadDivision: 'materials', divisions: ['materials', 'maintenance', 'hydraulics'], status: 'Active', phase: 'Design', tags: ['Geohazard', 'Rockfall', 'Avalanche'], software: ['gINT', 'AssetWise', 'HEC-RAS'], relatedDepartments: ['environmental'], duration: '2023 – 2027', location: 'US 160, Wolf Creek Pass', startYear: 2023 },
  { title: 'Eisenhower–Johnson Memorial Tunnels Systems Upgrade', summary: 'Modernizing ventilation, ITS, and life-safety systems in North America’s highest vehicular tunnels.', leadDivision: 'traffic-safety', divisions: ['traffic-safety', 'maintenance', 'applied-research'], status: 'Active', phase: 'Design', tags: ['Tunnels', 'ITS', 'Life Safety'], software: ['VISSIM', 'AssetWise', 'Python'], relatedDepartments: ['construction'], duration: '2022 – 2026', location: 'I-70, EJMT', startYear: 2022 },
  { title: 'Statewide Bridge Asset Management Program', summary: 'A data-driven program prioritizing bridge investments across the entire state network.', leadDivision: 'bridge-asset-management', divisions: ['bridge-asset-management', 'applied-research', 'materials'], status: 'Active', phase: 'Maintenance', tags: ['Asset Management', 'Data', 'Bridges'], software: ['AASHTOWare BrDR', 'Power BI', 'gINT'], relatedDepartments: ['maintenance'], duration: '2019 – Ongoing', location: 'Statewide', startYear: 2019 },
  { title: 'Colorado Bridge Inspection & Load Rating Initiative', summary: 'Systematic inspection and load rating to keep every state bridge safe and open.', leadDivision: 'bridge-asset-management', divisions: ['bridge-asset-management', 'materials'], status: 'Active', phase: 'Maintenance', tags: ['Inspection', 'Load Rating', 'Safety'], software: ['AASHTOWare BrDR', 'MicroStation', 'LIMS'], relatedDepartments: ['applied-research'], duration: '2020 – Ongoing', location: 'Statewide', startYear: 2020 },
  { title: 'South Platte River Bridge Scour Countermeasures', summary: 'Protecting Denver-area river bridges from scour with hydraulic analysis and countermeasures.', leadDivision: 'hydraulics', divisions: ['hydraulics', 'bridge-asset-management', 'environmental'], status: 'Active', phase: 'Design', tags: ['Scour', 'Bridges', 'Rivers'], software: ['HEC-RAS', 'HY-8', 'MicroStation'], relatedDepartments: ['materials'], duration: '2023 – 2026', location: 'South Platte River, Denver', startYear: 2023 },
  { title: 'US 50 Corridor Resurfacing & Safety (Pueblo)', summary: 'Resurfacing and safety improvements on a vital southern Colorado freight corridor.', leadDivision: 'materials', divisions: ['materials', 'construction', 'traffic-safety'], status: 'Active', phase: 'Construction', tags: ['Resurfacing', 'Pavement', 'Safety'], software: ['PaveDAT', 'AASHTOWare Project', 'Numetric'], relatedDepartments: ['maintenance'], duration: '2024 – 2026', location: 'US 50, Pueblo County', startYear: 2024 },
  { title: 'SH 9 Frisco to Breckenridge Multimodal', summary: 'A mountain corridor reimagined for cars, buses, bikes, and pedestrians alike.', leadDivision: 'planning', divisions: ['planning', 'construction', 'environmental'], status: 'Completed', phase: 'Completed', tags: ['Multimodal', 'Bike/Ped', 'Mountain'], software: ['Remix', 'TransCAD', 'ArcGIS'], relatedDepartments: ['traffic-safety'], duration: '2017 – 2021', location: 'SH 9, Summit County', startYear: 2017 },
  { title: 'Berthoud Pass Snow Shed & Drainage Study', summary: 'Studying snow sheds and drainage to keep a high mountain pass safer in winter.', leadDivision: 'hydraulics', divisions: ['hydraulics', 'maintenance', 'materials'], status: 'Planned', phase: 'Planning', tags: ['Drainage', 'Snow Shed', 'Study'], software: ['HEC-RAS', 'AssetWise', 'gINT'], relatedDepartments: ['environmental'], duration: '2025 – 2027', location: 'US 40, Berthoud Pass', startYear: 2025 },
  { title: 'Statewide Culvert & Drainage Inventory (GIS)', summary: 'A statewide GIS inventory of culverts and drainage to guide resilient investment.', leadDivision: 'hydraulics', divisions: ['hydraulics', 'maintenance', 'applied-research', 'environmental'], status: 'Active', phase: 'Research', tags: ['GIS', 'Drainage', 'Inventory'], software: ['ArcGIS', 'HEC-RAS', 'Power BI'], relatedDepartments: ['materials'], duration: '2022 – 2026', location: 'Statewide', startYear: 2022 },
  { title: 'Connected & Automated Vehicle Pilot (RoadX)', summary: 'Piloting connected-vehicle technology to preview the future of Colorado’s highways.', leadDivision: 'applied-research', divisions: ['applied-research', 'traffic-safety', 'planning'], status: 'Active', phase: 'Research', tags: ['Connected Vehicles', 'Innovation', 'ITS'], software: ['Python', 'VISSIM', 'Power BI'], relatedDepartments: ['maintenance'], duration: '2021 – 2026', location: 'I-70 & US 285', startYear: 2021 },
  { title: 'Statewide Traffic Signal Retiming Program', summary: 'Retiming signals across the Front Range to cut delay, emissions, and fuel use.', leadDivision: 'traffic-safety', divisions: ['traffic-safety', 'applied-research', 'maintenance'], status: 'Active', phase: 'Construction', tags: ['Signals', 'Operations', 'Efficiency'], software: ['Synchro/SimTraffic', 'HCS', 'Numetric'], relatedDepartments: ['planning'], duration: '2020 – Ongoing', location: 'Front Range', startYear: 2020 },
  { title: 'Rural Highway Safety & Rumble Strip Deployment', summary: 'Low-cost, high-impact safety treatments targeting rural roadway-departure crashes.', leadDivision: 'traffic-safety', divisions: ['traffic-safety', 'maintenance', 'materials'], status: 'Active', phase: 'Construction', tags: ['Safety', 'Rural', 'Roadway Departure'], software: ['Numetric', 'AssetWise', 'PaveDAT'], relatedDepartments: ['applied-research'], duration: '2023 – 2026', location: 'Statewide Rural Highways', startYear: 2023 },
  { title: 'I-70 Mountain Corridor Variable Speed Limits', summary: 'Variable speed limits that adapt to weather and traffic on the mountain corridor.', leadDivision: 'traffic-safety', divisions: ['traffic-safety', 'applied-research', 'maintenance'], status: 'Active', phase: 'Maintenance', tags: ['Variable Speed', 'ITS', 'Mountain'], software: ['VISSIM', 'Python', 'AssetWise'], relatedDepartments: ['planning'], duration: '2021 – Ongoing', location: 'I-70 Mountain Corridor', startYear: 2021 },
  { title: 'Pavement Management & Recycled Materials Study', summary: 'Researching recycled and sustainable materials to extend pavement life and cut cost.', leadDivision: 'materials', divisions: ['materials', 'applied-research', 'construction'], status: 'Active', phase: 'Research', tags: ['Pavement', 'Sustainability', 'Materials'], software: ['PaveDAT', 'MATLAB', 'AASHTOWare Project'], relatedDepartments: ['maintenance'], duration: '2022 – 2026', location: 'Statewide', startYear: 2022 },
  { title: 'Statewide ADA Curb Ramp Compliance', summary: 'Bringing thousands of curb ramps into ADA compliance for an accessible system.', leadDivision: 'construction', divisions: ['construction', 'planning', 'maintenance'], status: 'Active', phase: 'Construction', tags: ['ADA', 'Accessibility', 'Compliance'], software: ['AASHTOWare Project', 'ArcGIS', 'Bluebeam Revu'], relatedDepartments: ['traffic-safety'], duration: '2020 – Ongoing', location: 'Statewide', startYear: 2020 },
  { title: 'Front Range Passenger Rail Planning Study', summary: 'Planning passenger rail to connect Front Range communities from Fort Collins to Pueblo.', leadDivision: 'planning', divisions: ['planning', 'environmental', 'applied-research'], status: 'Planned', phase: 'Planning', tags: ['Rail', 'Multimodal', 'Long-Range'], software: ['TransCAD', 'ArcGIS', 'Power BI'], relatedDepartments: ['construction'], duration: '2023 – 2030', location: 'Front Range Corridor', startYear: 2023 },
  { title: 'Wildlife Connectivity & Fencing Program (US 285)', summary: 'Wildlife fencing and crossings that cut animal-vehicle collisions and reconnect habitat.', leadDivision: 'environmental', divisions: ['environmental', 'maintenance', 'planning'], status: 'Active', phase: 'Design', tags: ['Wildlife', 'Fencing', 'Connectivity'], software: ['ArcGIS', 'AERMOD', 'Remix'], relatedDepartments: ['construction'], duration: '2022 – 2026', location: 'US 285, Park County', startYear: 2022 },
  { title: 'Statewide Stormwater MS4 Compliance', summary: 'Meeting clean-water permit requirements to protect rivers from highway runoff.', leadDivision: 'environmental', divisions: ['environmental', 'hydraulics', 'maintenance'], status: 'Active', phase: 'Maintenance', tags: ['Stormwater', 'Compliance', 'Water Quality'], software: ['ArcGIS', 'HEC-RAS', 'AssetWise'], relatedDepartments: ['materials'], duration: '2019 – Ongoing', location: 'Statewide MS4 Areas', startYear: 2019 },
  { title: 'Colorado Airport Pavement & Drainage Program', summary: 'Runway, taxiway, and drainage improvements keeping public-use airports operational.', leadDivision: 'aviation', divisions: ['aviation', 'materials', 'hydraulics'], status: 'Active', phase: 'Construction', tags: ['Aviation', 'Pavement', 'Drainage'], software: ['PAVEAIR', 'gINT', 'HEC-RAS'], relatedDepartments: ['environmental'], duration: '2021 – Ongoing', location: 'Statewide Airports', startYear: 2021 },
  { title: 'Mountain Airport Weather & NAVAID Modernization', summary: 'Upgrading weather systems and navigation aids at challenging mountain airports.', leadDivision: 'aviation', divisions: ['aviation', 'applied-research', 'traffic-safety'], status: 'Active', phase: 'Design', tags: ['Aviation', 'Weather', 'NAVAID'], software: ['ArcGIS', 'Python', 'AutoCAD'], relatedDepartments: ['maintenance'], duration: '2023 – 2027', location: 'Mountain Airports', startYear: 2023 },
  { title: 'Statewide Aviation System Plan Update', summary: 'A refreshed strategy for Colorado’s entire system of public-use airports.', leadDivision: 'aviation', divisions: ['aviation', 'planning', 'environmental'], status: 'Planned', phase: 'Planning', tags: ['Aviation', 'System Plan', 'Statewide'], software: ['ArcGIS', 'TransCAD', 'PAVEAIR'], relatedDepartments: ['applied-research'], duration: '2024 – 2027', location: 'Statewide', startYear: 2024 },
  { title: 'Avalanche Forecasting & Mitigation (CAIC partnership)', summary: 'Forecasting and triggering avalanches safely to protect mountain travelers.', leadDivision: 'maintenance', divisions: ['maintenance', 'materials', 'applied-research'], status: 'Active', phase: 'Maintenance', tags: ['Avalanche', 'Forecasting', 'Safety'], software: ['AssetWise', 'Python', 'gINT'], relatedDepartments: ['environmental'], duration: '2019 – Ongoing', location: 'Mountain Passes', startYear: 2019 },
  { title: 'Fleet & Maintenance Facility Modernization', summary: 'Modernizing maintenance facilities and fleet for efficiency and sustainability.', leadDivision: 'maintenance', divisions: ['maintenance', 'construction', 'environmental'], status: 'Active', phase: 'Design', tags: ['Facilities', 'Fleet', 'Sustainability'], software: ['AssetWise', 'AASHTOWare Project', 'ArcGIS'], relatedDepartments: ['materials'], duration: '2024 – 2027', location: 'Statewide Facilities', startYear: 2024 },
]

/* ------------------------------------------------------------------ */
/* Resources, Events, Spotlights                                       */
/* ------------------------------------------------------------------ */

const RESOURCES = [
  { title: 'Mentorship Matching Program', category: 'Professional Development', icon: 'Users', description: 'Get paired with an experienced CDOT mentor who shares your interests and career goals.' },
  { title: 'CDOT Toastmasters', category: 'Professional Development', icon: 'MessageSquare', description: 'Build public speaking and leadership confidence in a supportive peer setting.' },
  { title: 'Colorado LTAP Training', category: 'Training', icon: 'GraduationCap', description: 'Local Technical Assistance Program courses on roads, safety, and workforce skills.' },
  { title: 'NHI Technical Courses', category: 'Training', icon: 'BookOpen', description: 'National Highway Institute training across every transportation discipline.' },
  { title: 'Work Zone Safety Certification', category: 'Training', icon: 'ShieldCheck', description: 'Required certification for working safely in and around active work zones.' },
  { title: 'AASHTOWare Project Training', category: 'Training', icon: 'Laptop', description: 'Hands-on training for CDOT’s core construction and materials management software.' },
  { title: 'On-the-Job Training (OJT)', category: 'Training', icon: 'Wrench', description: 'Structured, hands-on learning embedded directly in real project work.' },
  { title: 'WTS – Women in Transportation', category: 'Employee Resource Groups', icon: 'Users', description: 'A community advancing women in the transportation industry through networking and mentorship.' },
  { title: 'Veterans Employee Resource Group', category: 'Employee Resource Groups', icon: 'Award', description: 'Connection and support for veterans and military families across CDOT.' },
  { title: 'Young Professionals Network', category: 'Employee Resource Groups', icon: 'Sparkles', description: 'Events and mentorship connecting early-career employees statewide.' },
  { title: 'Latinos in Transportation', category: 'Employee Resource Groups', icon: 'Users', description: 'A network celebrating and supporting Latino professionals at CDOT.' },
  { title: 'Individual Development Plan (IDP)', category: 'Career Planning', icon: 'Target', description: 'A guided template to set goals and map your growth with your supervisor.' },
  { title: 'Career Pathways Guide', category: 'Career Planning', icon: 'Map', description: 'Explore how roles connect and what it takes to move between them at CDOT.' },
  { title: 'Tuition Reimbursement Program', category: 'Career Planning', icon: 'GraduationCap', description: 'Financial support for continuing education and advanced degrees.' },
  { title: 'PE Licensure Support', category: 'Career Planning', icon: 'BadgeCheck', description: 'Resources, study groups, and exam support on the path to your PE license.' },
  { title: 'Emerging Leaders Program', category: 'Leadership', icon: 'TrendingUp', description: 'A cohort program developing the next generation of CDOT leaders.' },
  { title: 'Supervisor Academy', category: 'Leadership', icon: 'Users', description: 'Foundational training for new and aspiring people leaders.' },
  { title: 'LinkedIn Learning Access', category: 'Learning', icon: 'PlayCircle', description: 'Free access to thousands of professional and technical online courses.' },
  { title: 'CDOT Technical Library', category: 'Learning', icon: 'Library', description: 'Standards, specs, research reports, and design guidance in one place.' },
  { title: 'CDOT Organizational Chart', category: 'Organization', icon: 'Network', description: 'See how divisions, regions, and teams fit together across the department.' },
]

const EVENTS = [
  { title: 'Intern Welcome & Networking Mixer', date: '2026-07-09', time: '4:00 – 6:00 PM', location: 'HQ Atrium, Denver', category: 'Networking', host: 'Talent Development', description: 'Kick off the summer by meeting fellow interns, mentors, and division leaders.' },
  { title: 'Lunch & Learn: Inside the Floyd Hill Project', date: '2026-07-16', time: '12:00 – 1:00 PM', location: 'Hybrid · Room 3B', category: 'Tech Talk', host: 'Construction Division', description: 'Project engineers walk through one of CDOT’s most complex active builds.' },
  { title: 'Coffee Chat Speed Networking', date: '2026-07-23', time: '9:00 – 10:30 AM', location: 'HQ Cafe, Denver', category: 'Networking', host: 'Young Professionals Network', description: 'Rotate through quick, friendly chats with engineers from every division.' },
  { title: 'Workshop: Resume & LinkedIn for Engineers', date: '2026-07-30', time: '1:00 – 3:00 PM', location: 'Hybrid · Training Lab', category: 'Workshop', host: 'HR', description: 'Hands-on help making your resume and profile stand out for technical roles.' },
  { title: 'Tech Talk: HEC-RAS & Bridge Scour', date: '2026-08-06', time: '12:00 – 1:00 PM', location: 'Virtual', category: 'Tech Talk', host: 'Hydraulics Division', description: 'A practical intro to river modeling and how scour threatens bridges.' },
  { title: 'Field Tour: I-25 South Gap Construction', date: '2026-08-13', time: '8:00 AM – 12:00 PM', location: 'Meet at Monument P&R', category: 'Career', host: 'Construction Division', description: 'See a major interstate project up close with the field engineering team.' },
  { title: 'WTS Panel: Women Leaders in Transportation', date: '2026-08-20', time: '11:30 AM – 1:00 PM', location: 'HQ Auditorium, Denver', category: 'Networking', host: 'WTS – Women in Transportation', description: 'Senior women leaders share career journeys, lessons, and advice.' },
  { title: 'Info Session: PE Licensure Pathway', date: '2026-08-27', time: '12:00 – 1:00 PM', location: 'Virtual', category: 'Info Session', host: 'Professional Development', description: 'Everything you need to know about the path to your PE license at CDOT.' },
  { title: 'Hackathon: Traffic Data Challenge', date: '2026-09-10', time: '9:00 AM – 5:00 PM', location: 'Innovation Lab, Denver', category: 'Workshop', host: 'Applied Research & Innovation', description: 'Team up to find insights in real traffic and safety datasets.' },
  { title: 'Tech Talk: Connected & Automated Vehicles', date: '2026-09-17', time: '12:00 – 1:00 PM', location: 'Hybrid · Room 2A', category: 'Tech Talk', host: 'Applied Research & Innovation', description: 'A look at CDOT’s connected-vehicle pilots and what comes next.' },
  { title: 'Career Fair: Explore CDOT Divisions', date: '2026-09-24', time: '10:00 AM – 2:00 PM', location: 'HQ Atrium, Denver', category: 'Career', host: 'Talent Development', description: 'Visit booths from every division and discover where you fit.' },
  { title: 'Intern Capstone Showcase', date: '2026-10-08', time: '3:00 – 5:00 PM', location: 'HQ Auditorium, Denver', category: 'Social', host: 'Talent Development', description: 'Interns present their summer projects to leadership and peers.' },
]

// Spotlights reference employees by their 1-based number (matches emp-0X id).
const SPOTLIGHTS = [
  { empIndex: 3, headline: 'From rope access to running the inspection program', quote: 'You learn more under a bridge than in any classroom.' },
  { empIndex: 5, headline: 'The engineer who reads rivers', quote: 'Respect water — it always finds the weakness in your design.' },
  { empIndex: 10, headline: 'Keeping billion-dollar projects on track', quote: 'Document everything — your notes are your best memory and defense.' },
  { empIndex: 17, headline: 'Building roads without leaving nature behind', quote: 'Environmental issues are cheapest to solve at the very start.' },
  { empIndex: 30, headline: 'Turning CDOT’s data into decisions', quote: 'Models mean nothing if no one acts on them.' },
]

/* ------------------------------------------------------------------ */
/* Assembly                                                            */
/* ------------------------------------------------------------------ */

const pad2 = (n) => String(n).padStart(2, '0')
const empId = (i) => `emp-${pad2(i + 1)}`
const projId = (i) => `prj-${pad2(i + 1)}`

function buildJourney(emp) {
  const field = DEGREE_FIELD[emp.div]
  const start = 2026 - emp.yrs
  const steps = [
    { title: `B.S. ${field}`, subtitle: emp.school, period: `${start - 4} – ${start}`, type: 'education' },
    { title: 'Engineering Intern', subtitle: 'Colorado DOT', period: `Summer ${start - 1}`, type: 'internship' },
  ]
  if (emp.yrs >= 2) steps.push({ title: 'Engineer I', subtitle: 'Colorado DOT', period: `${start} – ${start + 3}`, type: 'role' })
  if (emp.yrs >= 5) steps.push({ title: 'Engineer II', subtitle: 'Colorado DOT', period: `${start + 3} – ${start + 7}`, type: 'role' })
  if (emp.yrs >= 9) steps.push({ title: 'Project Engineer', subtitle: 'Colorado DOT', period: `${start + 7} – ${2026 - 2}`, type: 'role' })
  const currentStart = 2026 - Math.max(1, Math.min(3, emp.yrs - 1))
  steps.push({ title: emp.title, subtitle: 'Colorado DOT', period: `${currentStart} – Present`, type: 'role', current: true })
  return steps
}

function computeFlags(emp, idx) {
  const t = emp.title.toLowerCase()
  const leadership = /manager|lead|superintendent|supervisor|director|principal|chief|resident engineer/.test(t)
  const fieldDivs = ['construction', 'maintenance', 'bridge-asset-management', 'materials', 'hydraulics', 'aviation']
  const fieldWork = fieldDivs.includes(emp.div) || /inspector|technician|specialist|field/.test(t)
  const mentor = emp.yrs >= 4 || idx % 3 === 0
  const coffeeChat = idx % 9 !== 0
  const jobShadow = fieldWork || idx % 2 === 0
  const careerAdvice = mentor || idx % 2 === 1
  const remote = ['planning', 'applied-research', 'traffic-safety', 'aviation'].includes(emp.div) && idx % 3 === 0
  return { mentor, coffeeChat, jobShadow, careerAdvice, leadership, fieldWork, remote }
}

// Base employee records (projects filled after rosters are built).
const employees = EMP.map((e, idx) => ({
  id: empId(idx),
  name: e.name,
  title: e.title,
  division: e.div,
  bio: e.bio,
  yearsExperience: e.yrs,
  location: e.loc,
  pronouns: e.pron,
  skills: e.skills,
  projects: [],
  careerJourney: buildJourney(e),
  favoriteProject: e.favProj,
  favoritePart: e.fav,
  advice: e.adv,
  funFact: e.fun,
  image: `https://randomuser.me/api/portraits/${e.g}/${e.p}.jpg`,
  ...computeFlags(e, idx),
}))

const employeesByDivision = {}
employees.forEach((e) => {
  ;(employeesByDivision[e.division] ||= []).push(e.id)
})

// Base project records, then assign engineer rosters from participating divisions.
const projects = PROJECTS.map((p, idx) => ({
  id: projId(idx),
  title: p.title,
  summary: p.summary,
  description: `${p.summary} ${p.leadDivision === p.divisions[0] ? '' : ''}This effort is led by the ${labelFor(p.leadDivision)} division and brings together ${p.divisions.map(labelFor).join(', ')} to deliver it. Work spans ${p.tags.join(', ').toLowerCase()} and relies on tools such as ${p.software.slice(0, 3).join(', ')}.`,
  leadDivision: p.leadDivision,
  divisions: p.divisions,
  engineers: [],
  status: p.status,
  phase: p.phase,
  tags: p.tags,
  software: p.software,
  relatedDepartments: p.relatedDepartments,
  duration: p.duration,
  location: p.location,
  startYear: p.startYear,
  image: themeImage(p.leadDivision, idx),
}))

function labelFor(slug) {
  const d = DEPARTMENTS.find((x) => x.slug === slug)
  return d ? d.name : slug
}

// Deterministic rotating pick from a pool.
function pickRotating(pool, count, offset) {
  const unique = [...new Set(pool)]
  if (unique.length === 0) return []
  const out = []
  for (let k = 0; out.length < Math.min(count, unique.length); k++) {
    out.push(unique[(offset + k) % unique.length])
  }
  return [...new Set(out)]
}

projects.forEach((p, i) => {
  const pool = p.divisions.flatMap((slug) => employeesByDivision[slug] || [])
  const count = 3 + (i % 3) // 3, 4, or 5 engineers
  p.engineers = pickRotating(pool, count, i)
})

// Coverage pass: ensure every employee appears on at least one project.
const assigned = new Set(projects.flatMap((p) => p.engineers))
employees.forEach((e) => {
  if (assigned.has(e.id)) return
  const proj =
    projects.find((p) => p.divisions.includes(e.division)) || projects[0]
  proj.engineers.push(e.id)
  assigned.add(e.id)
})

// ──────────────────────────────────────────────────────────────────
// Easter egg: the prototype's creator and the CDOT Compass project.
// Appended AFTER auto-assignment so they keep their explicit rosters and
// don't get pulled onto unrelated projects. This is a real, self-aware
// entry — clearly a prototype, not an officially adopted CDOT system.
// ──────────────────────────────────────────────────────────────────
const COMPASS_PROJECT = {
  id: 'prj-31',
  title: 'CDOT Compass',
  summary: 'An intern-built career discovery platform created for the CDOT Innovation Challenge.',
  description:
    'CDOT Compass is a front-end prototype built during a summer internship for the CDOT Innovation Challenge. It helps interns explore divisions, projects, mentors, resources, and career paths in one place — making existing opportunities easier to discover. It is a prototype, not an officially adopted CDOT system.',
  leadDivision: 'applied-research',
  divisions: ['applied-research', 'bridge-asset-management'],
  engineers: ['emp-41'],
  status: 'Active',
  phase: 'Research',
  tags: ['Innovation', 'Career Discovery', 'Prototype'],
  software: ['React', 'TypeScript', 'Tailwind CSS', 'Figma'],
  relatedDepartments: ['planning', 'aviation'],
  duration: '2026 – Present',
  location: 'Denver, CO',
  startYear: 2026,
  image: themeImage('applied-research', 2),
}

const SONIA = {
  id: 'emp-41',
  name: 'Sonia Irakoze',
  title: 'Summer Engineering Intern',
  division: 'bridge-asset-management',
  bio: 'Sonia is a summer engineering intern who designed and built CDOT Compass for the Innovation Challenge — a prototype that helps interns discover the opportunities that already exist across the department.',
  yearsExperience: 0,
  location: 'Denver',
  pronouns: 'she/her',
  skills: ['Product Design', 'Front-End Development', 'UX Research', 'Bridge Asset Management'],
  projects: ['prj-31'],
  careerJourney: [
    { title: 'B.S. Mechanical Engineering', subtitle: 'University of Rochester', period: 'Undergraduate', type: 'education' },
    { title: 'Summer Engineering Intern', subtitle: 'Colorado DOT · Bridge Asset Management', period: '2026', type: 'internship' },
    { title: 'Innovation Challenge Participant', subtitle: 'Colorado DOT', period: '2026', type: 'role' },
    { title: 'Creator, CDOT Compass', subtitle: 'Innovation Challenge prototype', period: '2026 – Present', type: 'role', current: true },
  ],
  favoriteProject: 'CDOT Compass',
  favoritePart: 'Turning a real intern frustration into something that could actually help the next group of interns.',
  advice: 'Be curious. Reach out to people outside your own team — you’ll be surprised how much you can learn.',
  funFact: 'This spotlight was created inside the app it describes.',
  // Clean professional monogram avatar on CDOT blue (not a real photo).
  image: 'https://api.dicebear.com/9.x/initials/svg?seed=Sonia%20Irakoze&backgroundColor=0057b8&fontWeight=600',
  mentor: false,
  coffeeChat: true,
  jobShadow: false,
  careerAdvice: true,
  leadership: false,
  fieldWork: false,
  remote: true,
}

employees.push(SONIA)
projects.push(COMPASS_PROJECT)

// Derive employee.projects from the rosters (single source of truth).
employees.forEach((e) => {
  e.projects = projects.filter((p) => p.engineers.includes(e.id)).map((p) => p.id)
})

// Finalize departments with derived membership.
const departments = DEPARTMENTS.map((d, i) => ({
  ...d,
  image: themeImage(d.slug, i),
  employees: employees.filter((e) => e.division === d.slug).map((e) => e.id),
  projects: projects.filter((p) => p.divisions.includes(d.slug)).map((p) => p.id),
}))

const resources = RESOURCES.map((r, idx) => ({
  id: `res-${pad2(idx + 1)}`,
  title: r.title,
  category: r.category,
  description: r.description,
  link: '#',
  icon: r.icon,
}))

const events = EVENTS.map((ev, idx) => ({
  id: `evt-${pad2(idx + 1)}`,
  title: ev.title,
  date: ev.date,
  time: ev.time,
  location: ev.location,
  description: ev.description,
  category: ev.category,
  host: ev.host,
}))

const spotlights = SPOTLIGHTS.map((s, idx) => {
  const emp = employees[s.empIndex - 1]
  return {
    id: `spot-${pad2(idx + 1)}`,
    employeeId: emp.id,
    headline: s.headline,
    story: `${emp.name} began as an intern and grew into a ${emp.title.toLowerCase()} in CDOT’s ${labelFor(emp.division)} division. ${emp.bio} Over ${emp.yearsExperience} years, ${emp.name.split(' ')[0]} has become a go-to mentor for interns curious about ${emp.skills.slice(0, 2).join(' and ').toLowerCase()}.`,
    favoriteProject: `${emp.name.split(' ')[0]} points to "${emp.favoriteProject}" as a career highlight — a project where ${emp.favoritePart.charAt(0).toLowerCase()}${emp.favoritePart.slice(1)}`,
    careerJourney: `From a degree at ${emp.careerJourney[0].subtitle} to a CDOT internship and a steady climb to ${emp.title}, ${emp.name.split(' ')[0]}’s path shows what’s possible when curiosity meets persistence.`,
    quote: s.quote,
  }
})

// Easter-egg spotlight: the prototype's creator, written in the first person
// to match the other spotlights' voice. Clearly an Innovation Challenge
// prototype — it does not claim a win or official adoption.
// unshift() makes it the Featured Story (spotlights[0]) across the app.
spotlights.unshift({
  id: 'spot-06',
  employeeId: 'emp-41',
  headline: "Building CDOT Compass from an intern's perspective",
  story:
    'During my internship with CDOT’s Bridge Asset Management team, I noticed that many internship opportunities already existed across the organization, but they were often difficult to discover unless you knew where to look or who to ask. As part of the Innovation Challenge, I began designing and developing CDOT Compass — a career discovery platform that helps interns explore divisions, projects, mentors, resources, and career pathways in one place. The goal isn’t to create new programs, but to make existing opportunities easier to find, encourage cross-divisional learning, and help interns build meaningful connections earlier in their internships.',
  favoriteProject:
    'CDOT Compass — the very platform you’re using now. I built it during my internship as an Innovation Challenge prototype (not an officially adopted CDOT system).',
  careerJourney:
    'University of Rochester (Mechanical Engineering) → Summer Engineering Intern on CDOT’s Bridge Asset Management team → Innovation Challenge participant → creator of the CDOT Compass prototype.',
  quote: 'The best opportunities at CDOT already exist — we just need to make them easier to discover.',
})

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const issues = []
const deptSlugs = new Set(departments.map((d) => d.slug))
const empIds = new Set(employees.map((e) => e.id))
const projIds = new Set(projects.map((p) => p.id))

employees.forEach((e) => {
  if (!deptSlugs.has(e.division)) issues.push(`Employee ${e.id} has unknown division "${e.division}"`)
  e.projects.forEach((pid) => {
    if (!projIds.has(pid)) issues.push(`Employee ${e.id} references unknown project "${pid}"`)
  })
})
projects.forEach((p) => {
  if (!deptSlugs.has(p.leadDivision)) issues.push(`Project ${p.id} has unknown leadDivision "${p.leadDivision}"`)
  if (!p.divisions.includes(p.leadDivision)) issues.push(`Project ${p.id} leadDivision not in divisions`)
  if (p.divisions.length < 2) issues.push(`Project ${p.id} has fewer than 2 divisions (collaboration expected)`)
  p.divisions.forEach((s) => { if (!deptSlugs.has(s)) issues.push(`Project ${p.id} unknown division "${s}"`) })
  p.relatedDepartments.forEach((s) => { if (!deptSlugs.has(s)) issues.push(`Project ${p.id} unknown relatedDepartment "${s}"`) })
  p.engineers.forEach((id) => { if (!empIds.has(id)) issues.push(`Project ${p.id} unknown engineer "${id}"`) })
  if (p.engineers.length === 0) issues.push(`Project ${p.id} has no engineers`)
})
departments.forEach((d) => {
  d.relatedDepartments.forEach((s) => { if (!deptSlugs.has(s)) issues.push(`Department ${d.slug} unknown relatedDepartment "${s}"`) })
})
spotlights.forEach((s) => {
  if (!empIds.has(s.employeeId)) issues.push(`Spotlight ${s.id} references unknown employee "${s.employeeId}"`)
})
employees.forEach((e) => {
  if (e.projects.length === 0) issues.push(`Employee ${e.id} is not on any project`)
})

const expected = { departments: 10, employees: 41, projects: 31, resources: 20, events: 12, spotlights: 6 }
const actual = {
  departments: departments.length,
  employees: employees.length,
  projects: projects.length,
  resources: resources.length,
  events: events.length,
  spotlights: spotlights.length,
}
for (const key of Object.keys(expected)) {
  if (expected[key] !== actual[key]) issues.push(`Count mismatch for ${key}: expected ${expected[key]}, got ${actual[key]}`)
}

if (issues.length > 0) {
  console.error('\n❌ Data validation failed:\n' + issues.map((i) => `  - ${i}`).join('\n'))
  process.exit(1)
}

/* ------------------------------------------------------------------ */
/* Write                                                               */
/* ------------------------------------------------------------------ */

const write = (name, data) => {
  writeFileSync(resolve(DATA_DIR, name), JSON.stringify(data, null, 2) + '\n', 'utf8')
}

write('departments.json', departments)
write('employees.json', employees)
write('projects.json', projects)
write('resources.json', resources)
write('events.json', events)
write('spotlights.json', spotlights)

console.log('✅ Data generated and validated:')
console.table(actual)
const engineerCounts = projects.map((p) => p.engineers.length)
console.log(
  `Engineer rosters: ${Math.min(...engineerCounts)}–${Math.max(...engineerCounts)} per project · ` +
    `${employees.filter((e) => e.projects.length > 0).length}/${employees.length} employees on ≥1 project`,
)
