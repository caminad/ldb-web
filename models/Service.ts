export default interface Service {
  serviceID: string;
  origin: {
    crs: string;
    locationName: string;
  }[];
  destination: {
    crs: string;
    locationName: string;
    via?: string;
  }[];
  operator: string;
  sta?: string;
  eta?: string;
  std?: string;
  etd?: string;
  platform?: string;
  isCancelled: boolean;
  delayReason?: string;
  cancelReason?: string;
}
