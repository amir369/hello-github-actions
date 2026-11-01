// SAMPLE DATA. Every organisation, approval reference and course below is invented so the page
// can be seen at full density. Replace this whole list with verified organisations before launch.
//
// kind:  p147 = Part-147 maintenance training · camo = CAMO / Part-M / ARC courses
//        lease = lease transition, records and OIL · ato = pilot and cabin crew training
// The country name must match the map exactly (see js/map-data.js), e.g. "United States of America".
window.ORGS = [
  // Austria
  { country: "Austria", city: "Vienna", name: "Danube Aero Technical School", kind: "p147", ref: "AT.147.0031",
    courses: ["B1.1 basic modules", "A320 family B1/B2 type", "Human factors"], lang: "German, English", mode: "Classroom" },
  { country: "Austria", city: "Vienna", name: "Hofburg Airworthiness Academy", kind: "camo", ref: "AT.CAMO.0118",
    courses: ["Part-CAMO for nominated persons", "Airworthiness review staff", "AMP development"], lang: "English", mode: "Classroom and online" },
  { country: "Austria", city: "Salzburg", name: "Alpine Records Institute", kind: "lease", ref: "Training provider",
    courses: ["Back-to-birth traceability", "Redelivery records audit", "Open Item List practice"], lang: "English, German", mode: "Online" },
  { country: "Austria", city: "Graz", name: "Styria Flight Academy", kind: "ato", ref: "AT.ATO.0007",
    courses: ["ATPL(A) integrated", "MCC/JOC", "A320 type rating"], lang: "German, English", mode: "Classroom and simulator" },

  // Malta
  { country: "Malta", city: "Luqa", name: "Grand Harbour Aviation Training", kind: "p147", ref: "MT.147.0012",
    courses: ["B1.1 and B2 basic", "ATR 72 type", "EWIS and fuel tank safety"], lang: "English", mode: "Classroom" },
  { country: "Malta", city: "Valletta", name: "Mediterranean Continuing Airworthiness College", kind: "camo", ref: "MT.CAMO.0044",
    courses: ["ARC issue and extension", "Part-ML for owners", "Reliability programmes"], lang: "English", mode: "Online" },
  { country: "Malta", city: "Hal Far", name: "Island Lease Transition School", kind: "lease", ref: "Training provider",
    courses: ["Delivery and redelivery on-site", "Mid-lease inspections", "Return condition clauses"], lang: "English", mode: "Classroom and on-site" },

  // Switzerland
  { country: "Switzerland", city: "Zurich", name: "Limmat Technical Training", kind: "p147", ref: "CH.147.0009",
    courses: ["A330 B1/B2 type", "Engine run-up", "Borescope inspection"], lang: "German, English", mode: "Classroom" },
  { country: "Switzerland", city: "Geneva", name: "Lac Léman Business Aviation School", kind: "ato", ref: "CH.ATO.0021",
    courses: ["Challenger 350 type rating", "CRM for business aviation", "Cabin crew attestation"], lang: "French, English", mode: "Simulator" },
  { country: "Switzerland", city: "Basel", name: "Rhine Airworthiness Seminars", kind: "camo", ref: "Training provider",
    courses: ["FOCA ARC staff preparation", "Part-CAMO auditing"], lang: "English, German", mode: "Classroom" },

  // Slovakia
  { country: "Slovakia", city: "Bratislava", name: "Tatra Aero Engineering School", kind: "p147", ref: "SK.147.0004",
    courses: ["B1.1 basic modules", "ERJ-190 type", "Human factors"], lang: "Slovak, English", mode: "Classroom" },
  { country: "Slovakia", city: "Bratislava", name: "Petržalka CAMO Training", kind: "camo", ref: "SK.CAMO.0015",
    courses: ["Multi-fleet airworthiness management", "AD and SB compliance tracking"], lang: "English", mode: "Online" },

  // Germany
  { country: "Germany", city: "Hamburg", name: "Elbe Wing Maintenance Academy", kind: "p147", ref: "DE.147.0102",
    courses: ["A320neo B1/B2 type", "Composite repair", "NDT level 1"], lang: "German, English", mode: "Classroom" },
  { country: "Germany", city: "Frankfurt", name: "Main Records & Leasing Institute", kind: "lease", ref: "Training provider",
    courses: ["Lessor technical representative", "Engine records and LLP back-to-birth", "Open Item List practice"], lang: "English", mode: "Classroom and online" },
  { country: "Germany", city: "Bremen", name: "Weser Flight Training", kind: "ato", ref: "DE.ATO.0063",
    courses: ["ATPL(A) modular", "Type rating instructor", "UPRT"], lang: "German, English", mode: "Simulator" },

  // Ireland
  { country: "Ireland", city: "Shannon", name: "Atlantic Lease Transition Academy", kind: "lease", ref: "Training provider",
    courses: ["Lease return conditions", "Aircraft redelivery project management", "Records digitisation"], lang: "English", mode: "Classroom and online" },
  { country: "Ireland", city: "Dublin", name: "Liffey Aircraft Engineering School", kind: "p147", ref: "IE.147.0011",
    courses: ["B737 MAX B1/B2 type", "Basic module 7A practical", "Human factors"], lang: "English", mode: "Classroom" },
  { country: "Ireland", city: "Cork", name: "Munster Airworthiness College", kind: "camo", ref: "IE.CAMO.0027",
    courses: ["Part-CAMO compliance monitoring", "Airworthiness review staff"], lang: "English", mode: "Online" },

  // United Kingdom
  { country: "United Kingdom", city: "Cardiff", name: "Severn Engineering Training", kind: "p147", ref: "UK.147.0058",
    courses: ["B1.1 full basic", "A350 type", "Fuel tank safety"], lang: "English", mode: "Classroom" },
  { country: "United Kingdom", city: "London", name: "Thames Asset Management School", kind: "lease", ref: "Training provider",
    courses: ["Aircraft valuation basics", "Technical due diligence", "Pre-purchase inspection"], lang: "English", mode: "Online" },

  // France
  { country: "France", city: "Toulouse", name: "Garonne Aéro Formation", kind: "p147", ref: "FR.147.0033",
    courses: ["A320 family B1/B2 type", "A330neo type differences", "Human factors"], lang: "French, English", mode: "Classroom" },
  { country: "France", city: "Lyon", name: "Rhône Cabin Crew Institute", kind: "ato", ref: "FR.ATO.0090",
    courses: ["Cabin crew attestation", "Recurrent safety training"], lang: "French", mode: "Classroom" },

  // Spain
  { country: "Spain", city: "Madrid", name: "Meseta Aircraft Maintenance School", kind: "p147", ref: "ES.147.0026",
    courses: ["B1.1 and B2 basic", "ATR 42/72 type"], lang: "Spanish, English", mode: "Classroom" },
  { country: "Spain", city: "Seville", name: "Guadalquivir Flight Academy", kind: "ato", ref: "ES.ATO.0141",
    courses: ["ATPL(A) integrated", "Multi-engine instrument rating"], lang: "Spanish, English", mode: "Classroom and simulator" },

  // Türkiye
  { country: "Turkey", city: "Istanbul", name: "Bosphorus Technical Academy", kind: "p147", ref: "TR.147.0019",
    courses: ["A321neo B1/B2 type", "B777 type", "Human factors"], lang: "Turkish, English", mode: "Classroom" },
  { country: "Turkey", city: "Antalya", name: "Riviera Airworthiness Courses", kind: "camo", ref: "Training provider",
    courses: ["Part-M to Part-CAMO transition", "Technical records for importation"], lang: "English, Turkish", mode: "Online" },

  // United Arab Emirates
  { country: "United Arab Emirates", city: "Dubai", name: "Creek Aviation Engineering College", kind: "p147", ref: "AE.147.0006",
    courses: ["A380 type", "B787 type", "Basic modules"], lang: "English, Arabic", mode: "Classroom" },
  { country: "United Arab Emirates", city: "Abu Dhabi", name: "Corniche Lease & Records School", kind: "lease", ref: "Training provider",
    courses: ["Redelivery planning", "Open Item List practice", "Lessor inspections"], lang: "English", mode: "Classroom and on-site" },
  { country: "United Arab Emirates", city: "Al Ain", name: "Oasis Flight Training", kind: "ato", ref: "AE.ATO.0012",
    courses: ["CPL/IR", "A320 type rating"], lang: "English", mode: "Simulator" },

  // Singapore
  { country: "Singapore", city: "Seletar", name: "Straits Aerospace Training", kind: "p147", ref: "SG.147.0008",
    courses: ["A350 B1/B2 type", "Trent XWB engine run", "Human factors"], lang: "English", mode: "Classroom" },
  { country: "Singapore", city: "Changi", name: "Lion City Leasing Academy", kind: "lease", ref: "Training provider",
    courses: ["Asia-Pacific lease transitions", "Records for re-registration"], lang: "English", mode: "Online" },

  // United States
  { country: "United States of America", city: "Miami", name: "Biscayne Aircraft Technical School", kind: "p147", ref: "Part 147 school",
    courses: ["Airframe and powerplant", "B737 type familiarisation"], lang: "English, Spanish", mode: "Classroom" },
  { country: "United States of America", city: "Dallas", name: "Trinity Lease Return Institute", kind: "lease", ref: "Training provider",
    courses: ["FAA to EASA transfer records", "Lease return inspections"], lang: "English", mode: "Online" },
];
