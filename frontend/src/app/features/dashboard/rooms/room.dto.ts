export interface RoomDto {
  code: string;
  name: string;
  floor: number;
  building: number;
  capacity: number;
  area: number;
  type: RoomType;
}

export enum RoomType {
  CLASSROOM = 'Terem',
  LAB = 'Laboratórium',
  OFFICE = 'Iroda',
  STORAGE = 'Raktár',
  OTHER = 'Egyéb'
}
