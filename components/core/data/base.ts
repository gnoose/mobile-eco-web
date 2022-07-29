export enum MobileMoel {
  iphone = 'iphone',
  samsumg = 'samsung',
  mac = 'mac',
  huwai = 'huwai'
}

export enum RepairType {
  line = 'line',
  liquid = 'liquid',
  speaker = 'speaker',
  camera = 'camera'
}

export enum OrderStatus {
  initial,
  estimated,
  agreed,
  repaired,
  ended,
  canceled,
}

export const OrderStatusColor = [
  'text-danger',
  'text-warning',
  'text-secondary',
  'text-primary',
  'text-light-300',
  'text-light-400'
]

export const mobileModel = {
  iphone: "IPhone",
  samsung: "SamSung Galaxy",
  mac: "Mac Phone",
  huwai: "Huwai"
}

export const repairType = {
  line: "Charge Line",
  liquid: "Liquid Screen",
  speaker: "Speaker",
  camera: "Camera"
}