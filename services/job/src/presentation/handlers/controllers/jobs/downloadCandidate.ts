import { NextFunction, Request, Response } from "express";
import { IUseCase } from "../../../../application/interfaces/userCase_interface/IuseCase";

import { generatePDF } from "../../../../util/generatePDF";
export class DownloadCandidateReport {
  private jobUseCase: IUseCase;
  constructor(useCase: IUseCase) {
    this.jobUseCase = useCase;
  }
  async downloadCandidateReport(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const applicant: any =
        await this.jobUseCase.getSelectedAndRejectedCandidates(
          String(req.query.companyId)
        );
      generatePDF(applicant);
      res.download("Report.pdf", "Report.pdf", (err:any) => {
        if (err) {
          res.status(500).send({
            message: "Could not download the file. " + err,
          });
        }
      });
    } catch (error) {
      next(error);
    }
  }
}
