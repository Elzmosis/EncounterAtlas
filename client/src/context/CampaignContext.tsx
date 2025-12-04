import React, { createContext, useContext, useState, ReactNode } from "react";

interface CampaignData {
  title: string;
  subtitle: string;
  charactersTitle: string;
  charactersSubtitle: string;
  journalFooter: string;
}

interface CampaignContextType {
  data: CampaignData;
  updateData: (data: Partial<CampaignData>) => void;
}

const defaultData: CampaignData = {
  title: "Sword Coast Chronicles",
  subtitle: "A record of our adventures",
  charactersTitle: "Dramatis Personae",
  charactersSubtitle: "The heroes of our tale...",
  journalFooter: "From the Journals of the Sword Coast",
};

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CampaignData>(defaultData);

  const updateData = (newData: Partial<CampaignData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <CampaignContext.Provider value={{ data, updateData }}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaign() {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error("useCampaign must be used within a CampaignProvider");
  }
  return context;
}
