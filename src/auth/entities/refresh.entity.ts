import { sign } from 'jsonwebtoken';

class RefreshToken {
  constructor(init?: Partial<RefreshToken>) {
    Object.assign(this, init);
  }

  id: string;
  userId: string;

  sign(): string {
    return sign({ ...this }, process.env.JWT_SECRET);
  }
}

export default RefreshToken;
