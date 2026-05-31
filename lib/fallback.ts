import type { Organization } from "./types";

export const FALLBACK_ORGS: Organization[] = [
  {
    id: "msk-1",
    name: "Memorial Sloan Kettering Cancer Center",
    type: "academic_medical_center",
    location: "New York, NY",
    readinessScore: 94,
    signalTypes: ["clinical_trial", "facility_expansion", "hiring", "partnership"],
    evidence: [
      {
        signal: "clinical_trial",
        excerpt:
          "MSK opened enrollment for Phase III VISION-2 trial of Lu-177 PSMA therapy, targeting 400 patients across 12 sites.",
        sourceUrl: "https://clinicaltrials.gov/study/NCT05160376",
        sourceName: "ClinicalTrials.gov",
        date: "2024-11-12",
      },
      {
        signal: "facility_expansion",
        excerpt:
          "MSK announced a $180M investment in its Nuclear Medicine and Molecular Imaging department, adding 3 dedicated theranostics suites.",
        sourceUrl: "https://www.mskcc.org/news/msk-expands-nuclear-medicine",
        sourceName: "MSK News",
        date: "2024-10-05",
      },
      {
        signal: "hiring",
        excerpt:
          "14 open positions for nuclear medicine technologists, radiopharmacists, and theranostics coordinators posted in the last 60 days.",
        sourceUrl: "https://careers.mskcc.org/search?q=theranostics",
        sourceName: "MSK Careers",
        date: "2024-12-01",
      },
      {
        signal: "partnership",
        excerpt:
          "Strategic partnership with Novartis announced for exclusive Lu-177 supply agreement, ensuring priority allocation through 2027.",
        sourceUrl: "https://www.fiercepharma.com/pharma/novartis-msk-lutetium-deal",
        sourceName: "Fierce Pharma",
        date: "2024-09-18",
      },
    ],
    whyNow:
      "Active Phase III enrollment + $180M facility investment creates a 6–12 month window before infrastructure is fully locked in. Decision-makers are currently selecting long-term vendors.",
    recommendedAction:
      "Request meeting with Nuclear Medicine Department Chair and Radiopharmacy Director. Bring clinical outcomes data for Lu-177 programs.",
    outreachAngle:
      "Lead with supply chain reliability — MSK's Novartis deal shows they prioritize guaranteed access. Position your solution as a supply security layer.",
  },
  {
    id: "mayo-2",
    name: "Mayo Clinic",
    type: "academic_medical_center",
    location: "Rochester, MN",
    readinessScore: 88,
    signalTypes: ["equipment_investment", "clinical_trial", "regulatory", "hiring"],
    evidence: [
      {
        signal: "equipment_investment",
        excerpt:
          "Mayo Clinic installed 4 new SPECT/CT systems and 2 dedicated hot labs for radiopharmaceutical preparation across Minnesota and Arizona campuses.",
        sourceUrl: "https://www.mayoclinic.org/departments-centers/nuclear-medicine",
        sourceName: "Mayo Clinic",
        date: "2024-10-22",
      },
      {
        signal: "clinical_trial",
        excerpt:
          "Principal investigator for SPOTLIGHT trial (177Lu-DOTA-TATE in NET): enrollment ongoing, 68 patients treated to date.",
        sourceUrl: "https://clinicaltrials.gov/study/NCT04678414",
        sourceName: "ClinicalTrials.gov",
        date: "2024-11-30",
      },
      {
        signal: "regulatory",
        excerpt:
          "Mayo received FDA IND approval for investigational actinium-225 PSMA program — first Midwest center to hold this designation.",
        sourceUrl: "https://www.fda.gov/media/172340/download",
        sourceName: "FDA.gov",
        date: "2024-08-14",
      },
      {
        signal: "hiring",
        excerpt:
          "Job postings for Radiopharmaceutical Sciences Director and 3 nuclear pharmacists suggest rapid program scaling.",
        sourceUrl: "https://jobs.mayoclinic.org/search?q=radiopharmaceutical",
        sourceName: "Mayo Careers",
        date: "2024-12-03",
      },
    ],
    whyNow:
      "IND approval for Ac-225 program is a rare, time-sensitive signal — they need alpha emitter supply partners now, before the trial ramps.",
    recommendedAction:
      "Engage the Radiopharmaceutical Sciences Director directly with an alpha emitter supply proposal. Reference their Ac-225 IND timing.",
    outreachAngle:
      "Position around next-gen alpha therapy readiness — Mayo is deliberately moving past Lu-177. Be the partner who helps them get there faster.",
  },
  {
    id: "ucsf-3",
    name: "UCSF Medical Center",
    type: "academic_medical_center",
    location: "San Francisco, CA",
    readinessScore: 82,
    signalTypes: ["funding", "clinical_trial", "facility_expansion", "partnership"],
    evidence: [
      {
        signal: "funding",
        excerpt:
          "UCSF received $42M NIH grant for Theranostics Research Center, dedicated to translational RPT development through 2029.",
        sourceUrl: "https://www.nih.gov/grants-funding/news/ucsf-theranostics-center",
        sourceName: "NIH",
        date: "2024-07-11",
      },
      {
        signal: "clinical_trial",
        excerpt:
          "UCSF is lead site for multi-center PSMA-SELECT trial comparing Ga-68 PSMA PET-guided Lu-177 dosing vs. standard protocol.",
        sourceUrl: "https://clinicaltrials.gov/study/NCT05421416",
        sourceName: "ClinicalTrials.gov",
        date: "2024-11-08",
      },
      {
        signal: "facility_expansion",
        excerpt:
          "Groundbreaking announced for dedicated 8,000 sq ft Radiopharmaceutical Therapy Center at UCSF Mission Bay campus.",
        sourceUrl: "https://www.ucsf.edu/news/radiopharmaceutical-center-mission-bay",
        sourceName: "UCSF News",
        date: "2024-09-30",
      },
      {
        signal: "partnership",
        excerpt:
          "UCSF signed MOU with RayzeBio (Bristol-Myers Squibb) for clinical development of Ac-225 targeted therapy platform.",
        sourceUrl: "https://www.biospace.com/bms-rayzebio-ucsf-partnership",
        sourceName: "BioSpace",
        date: "2024-10-17",
      },
    ],
    whyNow:
      "NIH grant creates a 5-year spending mandate — procurement decisions for the Theranostics Center are being made in Q1 2025.",
    recommendedAction:
      "Submit an RFI response to the UCSF Theranostics Center procurement committee. Attend the UCSF Nuclear Medicine symposium in February.",
    outreachAngle:
      "Lead with research partnership angle — UCSF values co-publication opportunities and translational data. Offer registry access or outcomes data.",
  },
  {
    id: "mdacc-4",
    name: "MD Anderson Cancer Center",
    type: "academic_medical_center",
    location: "Houston, TX",
    readinessScore: 79,
    signalTypes: ["clinical_trial", "hiring", "equipment_investment", "regulatory"],
    evidence: [
      {
        signal: "clinical_trial",
        excerpt:
          "MD Anderson is running 7 active theranostics trials including novel FAP-targeting and HER2-directed radiopharmaceuticals.",
        sourceUrl: "https://clinicaltrials.gov/search?term=MD+Anderson+theranostics",
        sourceName: "ClinicalTrials.gov",
        date: "2024-12-01",
      },
      {
        signal: "hiring",
        excerpt:
          "Recruited Dr. Johannes Czernin from UCLA to lead new RPT division — signals intent to build a top-5 program nationally.",
        sourceUrl: "https://www.mdanderson.org/newsroom/nuclear-medicine-leadership",
        sourceName: "MD Anderson Newsroom",
        date: "2024-08-22",
      },
      {
        signal: "equipment_investment",
        excerpt:
          "Purchase order issued for 2 Siemens Biograph Vision Quadra PET/CT systems — best-in-class for theranostics dosimetry.",
        sourceUrl: "https://www.siemens-healthineers.com/press/mdacc-biograph-vision",
        sourceName: "Siemens Healthineers",
        date: "2024-11-14",
      },
      {
        signal: "regulatory",
        excerpt:
          "MD Anderson's on-site cyclotron received FDA approval for commercial F-18 production, enabling theranostics-adjacent imaging at scale.",
        sourceUrl: "https://www.fda.gov/drugs/fdas-drug-shortages-staff-report/cyclotron-approvals",
        sourceName: "FDA",
        date: "2024-06-30",
      },
    ],
    whyNow:
      "New division leadership hire is the clearest buying signal — Dr. Czernin will make vendor decisions in his first 6 months.",
    recommendedAction:
      "Reach out directly to the new RPT Division Director. Reference their 7-trial portfolio and offer comparative outcomes benchmarking.",
    outreachAngle:
      "Frame around program prestige — MD Anderson competes with MSK. Show how your solution helps them build a top-ranked RPT program faster.",
  },
  {
    id: "jhm-5",
    name: "Johns Hopkins Medicine",
    type: "academic_medical_center",
    location: "Baltimore, MD",
    readinessScore: 74,
    signalTypes: ["partnership", "funding", "clinical_trial"],
    evidence: [
      {
        signal: "partnership",
        excerpt:
          "Johns Hopkins partnered with Lantheus Holdings for PYLARIFY-guided therapy protocols, with distribution rights for the Mid-Atlantic region.",
        sourceUrl: "https://www.lantheus.com/news/lantheus-johns-hopkins-partnership",
        sourceName: "Lantheus Holdings",
        date: "2024-09-05",
      },
      {
        signal: "funding",
        excerpt:
          "DOE awarded $8.5M to JHU for isotope production research, specifically targeting Ac-225 and Tb-149 supply chain development.",
        sourceUrl: "https://www.energy.gov/ne/articles/doe-invests-isotope-research",
        sourceName: "U.S. Department of Energy",
        date: "2024-10-28",
      },
      {
        signal: "clinical_trial",
        excerpt:
          "Phase II trial of 68Ga-PSMA-11 PET/CT for therapy selection in high-risk prostate cancer with 200-patient enrollment at JHM.",
        sourceUrl: "https://clinicaltrials.gov/study/NCT04261855",
        sourceName: "ClinicalTrials.gov",
        date: "2024-11-20",
      },
    ],
    whyNow:
      "DOE isotope grant creates a narrow window to be first-mover on Ac-225/Tb-149 supply partnerships before competitors engage.",
    recommendedAction:
      "Engage the Russell H. Morgan Department of Radiology with a proposal tied to DOE isotope research commercialization.",
    outreachAngle:
      "Lead with government grant alignment — JHU researchers want partners who understand and can co-leverage federal funding structures.",
  },
  {
    id: "ucsd-6",
    name: "UC San Diego Health",
    type: "academic_medical_center",
    location: "San Diego, CA",
    readinessScore: 68,
    signalTypes: ["facility_expansion", "hiring", "equipment_investment"],
    evidence: [
      {
        signal: "facility_expansion",
        excerpt:
          "UCSD Health broke ground on a 12,000 sq ft Nuclear Medicine expansion at Moores Cancer Center, set to open Q3 2025.",
        sourceUrl: "https://health.ucsd.edu/news/moores-nuclear-medicine-expansion",
        sourceName: "UC San Diego Health",
        date: "2024-10-10",
      },
      {
        signal: "hiring",
        excerpt:
          "8 open roles across nuclear medicine technology, radiopharmacy, and RPT nursing — largest hiring push in department history.",
        sourceUrl: "https://jobs.ucsd.edu/search?q=nuclear+medicine",
        sourceName: "UCSD Careers",
        date: "2024-11-25",
      },
      {
        signal: "equipment_investment",
        excerpt:
          "Capital equipment budget approved for 1 digital PET/CT and cyclotron feasibility study, indicating long-term self-sufficiency plan.",
        sourceUrl: "https://health.ucsd.edu/providers/radiology/nuclear-medicine",
        sourceName: "UC San Diego Health",
        date: "2024-09-12",
      },
    ],
    whyNow:
      "Q3 2025 facility opening means procurement decisions for equipment and supply contracts must close by Q1 2025.",
    recommendedAction:
      "Submit a capabilities briefing to the Moores Cancer Center Radiology Director ahead of facility opening.",
    outreachAngle:
      "Position around move-in readiness — they are building a new program and need a supplier who can grow with them from day one.",
  },
  {
    id: "mgh-7",
    name: "Massachusetts General Hospital",
    type: "academic_medical_center",
    location: "Boston, MA",
    readinessScore: 61,
    signalTypes: ["clinical_trial", "regulatory", "partnership"],
    evidence: [
      {
        signal: "clinical_trial",
        excerpt:
          "MGH enrolled first patient in investigator-initiated trial of 177Lu-DOTA-IP2 for metastatic breast cancer — first-in-human study.",
        sourceUrl: "https://clinicaltrials.gov/study/NCT05870566",
        sourceName: "ClinicalTrials.gov",
        date: "2024-11-01",
      },
      {
        signal: "regulatory",
        excerpt:
          "MGH Pharmacy received Massachusetts DPH license upgrade enabling on-site compounding of radiopharmaceuticals for clinical trials.",
        sourceUrl: "https://www.mass.gov/doc/pharmacies-2024-approvals",
        sourceName: "Mass.gov",
        date: "2024-07-30",
      },
      {
        signal: "partnership",
        excerpt:
          "Academic collaboration with Harvard Cyclotron Laboratory for F-18 and Cu-64 production, reducing external supply dependency.",
        sourceUrl: "https://hcl.harvard.edu/collaborations/mgh",
        sourceName: "Harvard Cyclotron Lab",
        date: "2024-08-15",
      },
    ],
    whyNow:
      "First-in-human trial approval is a milestone that triggers 12–18 months of intensive procurement activity for novel isotopes.",
    recommendedAction:
      "Connect with MGH's Division of Nuclear Medicine and Molecular Imaging to discuss novel isotope supply for their FIH program.",
    outreachAngle:
      "Lead with scientific collaboration — MGH's FIH trial positions them as innovators. Offer data access or co-authorship on supply-chain outcomes papers.",
  },
  {
    id: "ccf-8",
    name: "Cleveland Clinic",
    type: "health_system",
    location: "Cleveland, OH",
    readinessScore: 55,
    signalTypes: ["hiring", "equipment_investment", "funding"],
    evidence: [
      {
        signal: "hiring",
        excerpt:
          "Cleveland Clinic posted 5 roles for theranostics-focused nuclear medicine physicians and technologists in Q4 2024.",
        sourceUrl: "https://jobs.clevelandclinic.org/search?q=theranostics",
        sourceName: "Cleveland Clinic Careers",
        date: "2024-10-15",
      },
      {
        signal: "equipment_investment",
        excerpt:
          "Board approved $22M capital expenditure for modernization of Nuclear Medicine at main campus, including PET/CT replacement cycle.",
        sourceUrl: "https://my.clevelandclinic.org/departments/nuclear-medicine",
        sourceName: "Cleveland Clinic",
        date: "2024-09-01",
      },
      {
        signal: "funding",
        excerpt:
          "Cleveland Clinic Foundation received $5M gift for theranostics fellowship program endowment — signals 10-year program commitment.",
        sourceUrl: "https://giving.clevelandclinic.org/news/theranostics-fellowship",
        sourceName: "Cleveland Clinic Foundation",
        date: "2024-11-08",
      },
    ],
    whyNow:
      "Fellowship endowment + capital investment shows a 10-year institutional commitment — now is the time to establish as a founding vendor.",
    recommendedAction:
      "Engage through the Taussig Cancer Institute with a proposal aligned to their theranostics fellowship curriculum.",
    outreachAngle:
      "Lead with education and workforce development — the fellowship endowment signals they want vendor partners who invest in training, not just supply.",
  },
];
