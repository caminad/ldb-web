export default interface Service {
  serviceID: string;
  origin: { locationName: string };
  destination:
    | { locationName: string; via?: string }
    | { locationName: string }[];
  operator: string;
  sta?: string;
  eta?: string;
  std?: string;
  etd?: string;
  platform?: string;
  isCancelled?: boolean;
  delayReason?: string;
  cancelReason?: string;
}
