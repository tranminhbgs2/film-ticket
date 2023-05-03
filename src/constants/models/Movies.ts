export type Movie = {
  id: number;
  name: string;
  img?: string;
  language: string;
  runtimes?: string;
  ticketCost?: number;
  description?: string;
  synopsis?: string;
  type?: string;
  rows?: number;
  cols?: number;
  seats?: Seats;
};

export type Seats = {
  [key: string]: number[];
};
