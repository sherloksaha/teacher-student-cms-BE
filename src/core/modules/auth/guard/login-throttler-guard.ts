import { ExecutionContext, Injectable } from "@nestjs/common";
import { ThrottlerException, ThrottlerGuard } from "@nestjs/throttler";


@Injectable()
export class LoginThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(
    req: Record<string, any>,
  ): Promise<string> {
    const email = req.body?.email ?? 'anonymous';

    console.log('tracker:', email);

    return `login-${email}`;
  }
}