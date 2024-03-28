import { Request, Response, NextFunction } from 'express';
import { Auth } from './Homey/Auth/Auth';
import { CONFIG } from './config';

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (
      CONFIG.HOMEY_TOKEN == null ||
      CONFIG.HOMEY_TOKEN_EXPIRED_AT < Date.now()
    ) {
      const auth = new Auth(
        process.env.HOMEY_CLIENT_ID as string,
        process.env.HOMEY_CLIENT_SECRET as string,
        process.env.HOMEY_USER_EMAIL as string,
        process.env.HOMEY_USER_PASSWORD as string,
        process.env.HOMEY_CLOUD_ID as string
      );
      CONFIG.HOMEY_TOKEN = await auth.authenticate();
      CONFIG.HOMEY_TOKEN_EXPIRED_AT =
        Date.now() + 1000 * 60 * 60 * 20;
    } else {
      console.log(
        'Token is still valid for ' +
          (CONFIG.HOMEY_TOKEN_EXPIRED_AT - Date.now()) / 1000 +
          ' seconds'
      );
    }
    next();
  } catch (err) {
    next(err);
  }
};
