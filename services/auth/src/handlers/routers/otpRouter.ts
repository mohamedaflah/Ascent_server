import { Router } from 'express'
import { OtpController } from '../controllers/otpController'
import { OtpRepository } from '../../repositories/otpRepository'
import { OtpInteractor } from '../../interactors/otpInteractor'

const otpRouter=Router()
const repository=new OtpRepository()
const interactor=new OtpInteractor(repository)
const otpController=new OtpController(interactor)
otpRouter.route('/check_otp').post(otpController.checkOtp.bind(otpController))

export default otpRouter