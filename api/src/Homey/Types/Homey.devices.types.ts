interface IconObj {
  id: string;
  url: string;
}

interface SettingsObj {
  zb_product_id: string;
  zb_manufacturer_name: string;
  zone_activity_disabled: boolean;
  reverse_contact_alarm: boolean;
}

interface EnergyObj {
  W: null;
  batteries: string[];
  cumulative: null;
  generator: null;
}

export interface CapabilitiesObj {
  [key: string]: {
    value: number | boolean;
    lastUpdated: string;
  };
}

interface Component {
  id: string;
  capabilities: string[];
}

interface UI {
  components: Component[];
  componentsStartAt: number;
}

interface Insight {
  uri: string;
  id: string;
  type: string;
  title: string;
  titleTrue: string;
  titleFalse: string;
  units: null;
  decimals: null;
}

export interface HomeyApiDeviceResponse {
  id: string;
  name: string;
  driverUri: string;
  driverId: string;
  zone: string;
  zoneName: string;
  icon: null;
  iconObj: IconObj;
  iconOverride: null;
  settings: SettingsObj;
  settingsObj: boolean;
  class: string;
  energy: null;
  energyObj: EnergyObj;
  virtualClass: null;
  capabilities: string[];
  capabilitiesObj: CapabilitiesObj;
  flags: string[];
  ui: UI;
  uiIndicator: null;
  ready: boolean;
  available: boolean;
  repair: boolean;
  unpair: boolean;
  unavailableMessage: null;
  images: any[];
  insights: Insight[];
  color: string;
  note: null;
  data: {
    token: string;
  };
}

export interface HomeyCapabilities {
  capabilities: string[];
  values: number[] | boolean[];
  lastUpdated?: string;
  icon: string;
  class: string;
  isOn?: boolean;
}
