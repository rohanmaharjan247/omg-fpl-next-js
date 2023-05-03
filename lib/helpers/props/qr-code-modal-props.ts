import { Entry } from 'fpl-api';

export type QRCodeModalProps = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  managerName: string;
  playerName: string;
  qrCodeUrl: string;
};
