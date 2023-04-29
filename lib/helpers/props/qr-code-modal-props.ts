import { Entry } from 'fpl-api';

export type QRCodeModalProps = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  manager: Entry;
  qrCodeUrl: string;
};
