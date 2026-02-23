/* eslint-disable prettier/prettier */

export class CreatePrescriptionDto {
  appointmentId: number;
  caseId: number;
  medicines: any[];
  advice: string;
  nextFollowUpDate?: string;
}
