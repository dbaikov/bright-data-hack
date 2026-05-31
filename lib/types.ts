export type SignalType =
  | "facility_expansion"
  | "clinical_trial"
  | "hiring"
  | "partnership"
  | "equipment_investment"
  | "regulatory"
  | "funding";

export interface Evidence {
  signal: SignalType;
  excerpt: string;
  sourceUrl: string;
  sourceName: string;
  date?: string;
}

export interface Organization {
  id: string;
  name: string;
  type: "hospital" | "health_system" | "academic_medical_center";
  location?: string;
  readinessScore: number;
  signalTypes: SignalType[];
  evidence: Evidence[];
  whyNow: string;
  recommendedAction: string;
  outreachAngle: string;
}

export interface OpportunityResponse {
  query: string;
  meta: {
    source: "live" | "demo";
    aiEnabled: boolean;
    fetchedAt: string;
    resultCount: number;
  };
  organizations: Organization[];
}
